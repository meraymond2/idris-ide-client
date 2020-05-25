import { ChildProcess, spawn } from "child_process"
import { parseReply, parseRootExpr } from "./parser"
import { FinalReply, Reply } from "./reply"
import { DocMode, Request, RequestType, serialiseRequest } from "./request"

const HEADER_LENGTH = 6

interface Resolver {
  requestType: RequestType
  resFn: (value: Reply) => void
}
type ReplyCallback = (reply: Reply) => void

interface Opts {
  debug?: boolean
  idrisPath?: string
  replyCallback?: ReplyCallback
}

const defaultOpts = {
  debug: false,
  idrisPath: "idris",
}

export class IdrisClient {
  private debug: boolean
  private idris: ChildProcess
  private messageBuffer: string
  private registry: Record<string, Resolver>
  private replyCallback?: ReplyCallback
  private reqCounter: number

  constructor(optArgs: Opts = {}) {
    const opts = { ...defaultOpts, ...optArgs }
    if (opts.replyCallback) this.replyCallback = opts.replyCallback

    this.messageBuffer = ""
    this.registry = {}
    this.reqCounter = 0
    this.idris = spawn(opts.idrisPath, ["--ide-mode"])
    this.idris.stdout?.setEncoding("utf8")
    this.idris.stdout?.on("data", (chunk: string) => {
      this.messageBuffer = this.messageBuffer + chunk
      this.consumeOutput()
    })
    this.debug = opts.debug
  }

  close() {
    this.idris.kill()
  }

  consumeOutput() {
    if (this.messageBuffer.length > HEADER_LENGTH) {
      const nextSexpLength = parseInt(
        this.messageBuffer.slice(0, HEADER_LENGTH),
        16
      )
      const nextMessageLength = HEADER_LENGTH + nextSexpLength
      if (this.messageBuffer.length >= nextMessageLength) {
        const nextSexp = this.messageBuffer
          .slice(HEADER_LENGTH, nextMessageLength)
          .trim()
        if (this.debug) console.debug(">> " + nextSexp)
        this.messageBuffer = this.messageBuffer.slice(
          nextMessageLength,
          this.messageBuffer.length
        )
        this.replyHandler(nextSexp)
        this.consumeOutput()
      }
      // else, wait for rest of message
    }
  }

  replyHandler(plString: string) {
    const rootExpr = parseRootExpr(plString)
    const id = rootExpr[2]
    if (this.registry[id]) {
      const { requestType, resFn } = this.registry[id]
      const reply = parseReply(rootExpr, requestType)
      if (this.replyCallback) this.replyCallback(reply)
      if (resFn && FinalReply.isFinalReply(reply)) {
        delete this.registry[id]
        resFn(reply)
      }
    }
  }

  makeReq(req: Request): Promise<Reply> {
    const serialisedReq = serialiseRequest(req)
    if (this.debug) console.debug("<< " + serialisedReq)
    return new Promise((res) => {
      this.registry[req.id] = { requestType: req.type, resFn: res }
      this.idris.stdin?.write(serialisedReq, "utf8")
    })
  }

  /**
   * Returns a reply containing a string that represents an initial pattern-matching
   * clause for a function. Always successful — if no matching function could be found,
   * it will be an empty string.
   */
  public addClause(name: string, line: number): Promise<FinalReply.AddClause> {
    const id = ++this.reqCounter
    const req: Request.AddClause = { id, line, name, type: ":add-clause" }
    return this.makeReq(req).then((r) => r as FinalReply.AddClause)
  }

  /**
   * Returns a reply containing a string comprising any missing pattern-matching
   * cases for a function. Always successful — if no matching function could be
   * found, or if there are no missing cases, it will be an empty string.
   */
  public addMissing(
    name: string,
    line: number
  ): Promise<FinalReply.AddMissing> {
    const id = ++this.reqCounter
    const req: Request.AddMissing = { id, line, name, type: ":add-missing" }
    return this.makeReq(req).then((r) => r as FinalReply.AddMissing)
  }

  /**
   * Returns a reply containing a string containing any mentions of the argument
   * from the Idris documentation. It is _not_ a list of strings, but a single
   * string, with new-line separated entries. Includes metadata.
   *
   * Returns an error object if nothing can be found for the argument.
   */
  public apropos(string: string): Promise<FinalReply.Apropos> {
    const id = ++this.reqCounter
    const req: Request.Apropos = { id, string, type: ":apropos" }
    return this.makeReq(req).then((r) => r as FinalReply.Apropos)
  }

  /**
   * Returns a reply comprising `declarations`, which is a list of top-level
   * declarations in the namespace, each with its own metadata, and `subModules`,
   * which is a list of the names of any nested modules.
   *
   * Returns an error object if no matching namespace is found.
   */
  public browseNamespace(
    namespace: string
  ): Promise<FinalReply.BrowseNamespace> {
    const id = ++this.reqCounter
    const req: Request.BrowseNamespace = {
      id,
      namespace,
      type: ":browse-namespace",
    }
    return this.makeReq(req).then((r) => r as FinalReply.BrowseNamespace)
  }

  /**
   * Returns a reply comprising `caller`, which is the full name of the argument
   * with metadata, and `references`, a list of callees, each including the
   * callee’s full name with metadata.
   *
   * Always successful, but if the argument is not found, `caller` will be `null`,
   * and the references will be empty.
   */
  public callsWho(name: string): Promise<FinalReply.CallsWho> {
    const id = ++this.reqCounter
    const req: Request.CallsWho = { id, name, type: ":calls-who" }
    return this.makeReq(req).then((r) => r as FinalReply.CallsWho)
  }

  /**
   * Returns a reply containing a string with the possible case-patterns
   * for the given variable.
   *
   * Returns an error object if the argument is not a variable that can be split.
   */
  public caseSplit(name: string, line: number): Promise<FinalReply.CaseSplit> {
    const id = ++this.reqCounter
    const req: Request.CaseSplit = { id, line, name, type: ":case-split" }
    return this.makeReq(req).then((r) => r as FinalReply.CaseSplit)
  }

  /**
   * Returns a reply containing a string with the documentation for the argument,
   * with metadata.  If `mode` is ":overview", only the first paragraph of
   * documentation is returned.
   *
   * Returns an error if the argument is not found.
   */
  public docsFor(name: string, mode: DocMode): Promise<FinalReply.DocsFor> {
    const id = ++this.reqCounter
    const req: Request.DocsFor = { id, name, mode, type: ":docs-for" }
    return this.makeReq(req).then((r) => r as FinalReply.DocsFor)
  }

  /**
   * Returns a reply containing the a string representing the result of
   * interpreting the input, with metadata. Also emits `OutputReply`s with
   * source highlighting for the input.
   *
   * Returns an error if the input cannot be fully interpreted. If it can be
   * partially interpreted, some metadata is returned.
   */
  public interpret(expression: string): Promise<FinalReply.Interpret> {
    const id = ++this.reqCounter
    const req: Request.Interpret = { id, expression, type: ":interpret" }
    return this.makeReq(req).then((r) => r as FinalReply.Interpret)
  }

  /**
   * Returns an empty reply confirming that the file has been successfully
   * loaded. Also emits `OutputReply`s and `InfoReply`s, but only emits complete
   * source highlighting if the file has not been previously compiled/type-checked,
   * i.e. there is no .idc file.
   *
   * Returns an error if the file does not exist, or if it does not compile. If
   * it fails to compile/type-check, it emits `InfoReply.Warning`s describing
   * the errors.
   */
  public loadFile(path: string): Promise<FinalReply.LoadFile> {
    const id = ++this.reqCounter
    const req: Request.LoadFile = { id, path, type: ":load-file" }
    return this.makeReq(req).then((r) => r as FinalReply.LoadFile)
  }

  /**
   * Returns a reply containing a string a new case pattern match template.
   * Always successful — if the arguments are not found, returns a whitespace-only
   * string.
   */
  public makeCase(name: string, line: number): Promise<FinalReply.MakeCase> {
    const id = ++this.reqCounter
    const req: Request.MakeCase = { id, line, name, type: ":make-case" }
    return this.makeReq(req).then((r) => r as FinalReply.MakeCase)
  }

  /**
   * Returns a reply containing two strings, `declaration` represents a new top-level
   * declaration, and `metavariable` represents a new metavariable-expression
   * using the new declaration.
   *
   * Returns an error object if a metavariable can’t be found for the `name` argument.
   * In Idris 1.3.2, it seems to ignore the line argument entirely, so if there
   * are multiple metavars with the same name, it just takes the first.
   */
  public makeLemma(name: string, line: number): Promise<FinalReply.MakeLemma> {
    const id = ++this.reqCounter
    const req: Request.MakeLemma = { id, line, name, type: ":make-lemma" }
    return this.makeReq(req).then((r) => r as FinalReply.MakeLemma)
  }

  /**
   * Returns a reply containing a string represetning a new with-rule pattern match template.
   * Always successful — simply returns the result of wrapping the `name` argument
   * in a with-clause.
   */
  public makeWith(name: string, line: number): Promise<FinalReply.MakeWith> {
    const id = ++this.reqCounter
    const req: Request.MakeWith = { id, line, name, type: ":make-with" }
    return this.makeReq(req).then((r) => r as FinalReply.MakeWith)
  }

  /**
   * Returns a reply containing a list of metavariable descriptions. Each has the name
   * and type of the metavariable, with metadata, as well as a list of descriptions
   * for other variables in the metavariable’s scope.
   * Always successful — it is an empty list if no metavariables are found.
   */
  public metavariables(width: number): Promise<FinalReply.Metavariables> {
    const id = ++this.reqCounter
    const req: Request.Metavariables = { id, type: ":metavariables", width }
    return this.makeReq(req).then((r) => r as FinalReply.Metavariables)
  }

  /**
   * Returns a reply containing a string representing the argument’s declaration
   * with metadata.
   *
   * Returns an error object if the argument can’t be found.
   */
  public printDefinition(name: string): Promise<FinalReply.PrintDefinition> {
    const id = ++this.reqCounter
    const req: Request.PrintDefinition = { id, name, type: ":print-definition" }
    return this.makeReq(req).then((r) => r as FinalReply.PrintDefinition)
  }

  /**
   * Returns a reply containing an attempt to solve a metavariable given its
   * current scope.
   *
   * It is unclear how the hints argument works. The protocol documentation describes
   * it as ‘possibly-empty list of additional things to try while searching’.
   *
   * Always successful — is an empty string if no solution is found.
   */
  public proofSearch(
    name: string,
    line: number,
    hints: string[]
  ): Promise<FinalReply.ProofSearch> {
    const id = ++this.reqCounter
    const req: Request.ProofSearch = {
      id,
      line,
      name,
      hints,
      type: ":proof-search",
    }
    return this.makeReq(req).then((r) => r as FinalReply.ProofSearch)
  }

  /**
   * Returns a reply containing a list of strings, representing the possible
   * completions the REPL would provide.
   *
   * Always successful — empty list if no completions are possible.
   */
  public replCompletions(name: string): Promise<FinalReply.ReplCompletions> {
    const id = ++this.reqCounter
    const req: Request.ReplCompletions = { id, name, type: ":repl-completions" }
    return this.makeReq(req).then((r) => r as FinalReply.ReplCompletions)
  }

  /**
   * Returns a reply containing the type of the argument, with metadata.
   *
   * Returns an error object if the argument cannot be found.
   */
  public typeOf(name: string): Promise<FinalReply.TypeOf> {
    const id = ++this.reqCounter
    const req: Request.TypeOf = { id, name, type: ":type-of" }
    return this.makeReq(req).then((r) => r as FinalReply.TypeOf)
  }

  /**
   * Returns a reply describing the version of the Idris binary being used.
   *
   * Always successful.
   */
  public version(): Promise<FinalReply.Version> {
    const id = ++this.reqCounter
    const req: Request.Version = { id, type: ":version" }
    return this.makeReq(req).then((r) => r as FinalReply.Version)
  }

  /**
   * Returns a reply with a list of references to the argument, each with name
   * and metadata. Also includes the full name with metadata of the argument/callee.
   *
   * Always successful — if the argument is not found, `callee` will be `null` though.
   */
  public whoCalls(name: string): Promise<FinalReply.WhoCalls> {
    const id = ++this.reqCounter
    const req: Request.WhoCalls = { id, name, type: ":who-calls" }
    return this.makeReq(req).then((r) => r as FinalReply.WhoCalls)
  }
}
