export type RequestType =
  | ":add-clause"
  | ":add-missing"
  // | ":add-proof-clause" // TODO: deprecated?
  | ":apropos"
  | ":browse-namespace"
  | ":calls-who"
  | ":case-split"
  | ":docs-for"
  // | ":elaborate-term"
  | ":generate-def"
  | ":generate-def-next"
  // | ":hide-term-implicits"
  | ":interpret"
  | ":load-file"
  | ":make-case"
  | ":make-lemma"
  | ":make-with"
  | ":metavariables"
  // | ":normalise-term"
  | ":print-definition"
  | ":proof-search"
  | ":proof-search-next"
  | ":repl-completions"
  // | ":show-term-implicits"
  | ":type-at"
  | ":type-of"
  | ":version"
  | ":who-calls"

export type DocMode = ":overview" | ":full"

export namespace Request {
  interface RequestBase {
    id: number
    type: RequestType
  }

  export interface AddClause extends RequestBase {
    id: number
    line: number
    name: string
    type: ":add-clause"
  }

  export interface AddMissing extends RequestBase {
    id: number
    line: number
    name: string
    type: ":add-missing"
  }

  export interface Apropos extends RequestBase {
    id: number
    string: string
    type: ":apropos"
  }

  export interface BrowseNamespace extends RequestBase {
    id: number
    namespace: string
    type: ":browse-namespace"
  }

  export interface CallsWho extends RequestBase {
    id: number
    name: string
    type: ":calls-who"
  }

  export interface CaseSplit extends RequestBase {
    id: number
    line: number
    name: string
    type: ":case-split"
  }

  export interface DocsFor extends RequestBase {
    id: number
    mode: DocMode
    name: string
    type: ":docs-for"
  }

  export interface GenerateDef extends RequestBase {
    id: number
    line: number
    name: string
    type: ":generate-def"
  }

  export interface GenerateDefNext extends RequestBase {
    id: number
    type: ":generate-def-next"
  }

  export interface Interpret extends RequestBase {
    expression: string
    id: number
    type: ":interpret"
  }

  export interface LoadFile extends RequestBase {
    id: number
    path: string
    type: ":load-file"
  }

  export interface MakeCase extends RequestBase {
    id: number
    line: number
    name: string
    type: ":make-case"
  }

  export interface MakeLemma extends RequestBase {
    id: number
    line: number
    name: string
    type: ":make-lemma"
  }

  export interface MakeWith extends RequestBase {
    id: number
    line: number
    name: string
    type: ":make-with"
  }

  export interface Metavariables extends RequestBase {
    id: number
    type: ":metavariables"
    width: number
  }

  export interface PrintDefinition extends RequestBase {
    id: number
    name: string
    type: ":print-definition"
  }

  /// Not sure how to use the hints.
  export interface ProofSearch extends RequestBase {
    id: number
    line: number
    name: string
    hints: string[]
    type: ":proof-search"
  }

  export interface ProofSearchNext extends RequestBase {
    id: number
    type: ":proof-search-next"
  }

  export interface ReplCompletions extends RequestBase {
    id: number
    name: string
    type: ":repl-completions"
  }

  export interface TypeAt extends RequestBase {
    column: number
    id: number
    line: number
    name: string
    type: ":type-at"
  }

  export interface TypeOf extends RequestBase {
    id: number
    name: string
    type: ":type-of"
  }

  export interface Version extends RequestBase {
    id: number
    type: ":version"
  }

  export interface WhoCalls extends RequestBase {
    id: number
    name: string
    type: ":who-calls"
  }
}
export type Request =
  | Request.AddClause
  | Request.AddMissing
  | Request.Apropos
  | Request.BrowseNamespace
  | Request.CallsWho
  | Request.CaseSplit
  | Request.DocsFor
  | Request.GenerateDef
  | Request.GenerateDefNext
  | Request.Interpret
  | Request.LoadFile
  | Request.MakeCase
  | Request.MakeLemma
  | Request.MakeWith
  | Request.Metavariables
  | Request.PrintDefinition
  | Request.ProofSearch
  | Request.ProofSearchNext
  | Request.ReplCompletions
  | Request.TypeAt
  | Request.TypeOf
  | Request.Version
  | Request.WhoCalls

const pad = (hexNum: string): string => "0".repeat(6 - hexNum.length) + hexNum

const prependLen = (message: string): string =>
  pad(message.length.toString(16)) + message

const serialiseArgs = (req: Request): string => {
  switch (req.type) {
    case ":add-clause":
    case ":add-missing":
    case ":case-split":
    case ":generate-def":
    case ":make-case":
    case ":make-lemma":
    case ":make-with":
      return `${req.type} ${req.line} "${req.name}"`
    case ":apropos":
      return `${req.type} "${req.string}"`
    case ":browse-namespace":
      return `${req.type} "${req.namespace}"`
    case ":calls-who":
    case ":print-definition":
    case ":repl-completions":
    case ":type-of":
    case ":who-calls":
      return `${req.type} "${req.name}"`
    case ":docs-for":
      return `${req.type} "${req.name}" ${req.mode}`
    case ":interpret":
      return `${req.type} "${req.expression}"`
    case ":load-file":
      return `${req.type} "${req.path}"`
    case ":metavariables":
      return `${req.type} ${req.width}`
    case ":proof-search":
      return `${req.type} ${req.line} "${req.name}" (${req.hints.join(" ")})`
    case ":type-at":
      return `:type-of "${req.name}" ${req.line} ${req.column}`
    case ":generate-def-next":
    case ":proof-search-next":
    case ":version":
      return req.type
  }
}

/**
 * Serialise request according to the Idris 1 IDE protocol. Arguments, including
 * the request type are always an s-expression list.
 */
export const serialiseRequest = (req: Request): string =>
  prependLen(`((${serialiseArgs(req)}) ${req.id})\n`)

/**
 * The Idris 2 IDE protocol introduces some new commands, and at least one
 * breaking change to the serialised request format. Specifically commands
 * without arguments are now simply atoms, rather than single-element lists.
 */
export const serialiseRequestV2 = (req: Request): string => {
  if (
    req.type === ":generate-def-next" ||
    req.type === ":proof-search-next" ||
    req.type === ":version"
  ) {
    return prependLen(`(${serialiseArgs(req)} ${req.id})\n`)
  } else {
    return prependLen(`((${serialiseArgs(req)}) ${req.id})\n`)
  }
}
