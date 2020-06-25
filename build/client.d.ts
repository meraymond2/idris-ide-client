/// <reference types="node" />
import { FinalReply, Reply } from "./reply";
import { DocMode, Request } from "./request";
import { Readable, Writable } from "stream";
declare type ReplyCallback = (reply: Reply) => void;
interface Opts {
    debug?: boolean;
    replyCallback?: ReplyCallback;
}
export declare class IdrisClient {
    private debug;
    private input;
    private messageBuffer;
    private output;
    private registry;
    private replyCallback?;
    private reqCounter;
    constructor(input: Writable, output: Readable, options?: Opts);
    consumeOutput(): void;
    replyHandler(plString: string): void;
    makeReq(req: Request): Promise<Reply>;
    /**
     * Returns a reply containing a string that represents an initial pattern-matching
     * clause for a function. Always successful — if no matching function could be found,
     * it will be an empty string.
     */
    addClause(name: string, line: number): Promise<FinalReply.AddClause>;
    /**
     * Returns a reply containing a string comprising any missing pattern-matching
     * cases for a function. Always successful — if no matching function could be
     * found, or if there are no missing cases, it will be an empty string.
     */
    addMissing(name: string, line: number): Promise<FinalReply.AddMissing>;
    /**
     * Returns a reply containing a string containing any mentions of the argument
     * from the Idris documentation. It is _not_ a list of strings, but a single
     * string, with new-line separated entries. Includes metadata.
     *
     * Returns an error object if nothing can be found for the argument.
     */
    apropos(string: string): Promise<FinalReply.Apropos>;
    /**
     * Returns a reply comprising `declarations`, which is a list of top-level
     * declarations in the namespace, each with its own metadata, and `subModules`,
     * which is a list of the names of any nested modules.
     *
     * Returns an error object if no matching namespace is found.
     */
    browseNamespace(namespace: string): Promise<FinalReply.BrowseNamespace>;
    /**
     * Returns a reply comprising `caller`, which is the full name of the argument
     * with metadata, and `references`, a list of callees, each including the
     * callee’s full name with metadata.
     *
     * Always successful, but if the argument is not found, `caller` will be `null`,
     * and the references will be empty.
     */
    callsWho(name: string): Promise<FinalReply.CallsWho>;
    /**
     * Returns a reply containing a string with the possible case-patterns
     * for the given variable.
     *
     * Returns an error object if the argument is not a variable that can be split.
     */
    caseSplit(name: string, line: number): Promise<FinalReply.CaseSplit>;
    /**
     * Returns a reply containing a string with the documentation for the argument,
     * with metadata.  If `mode` is ":overview", only the first paragraph of
     * documentation is returned.
     *
     * Returns an error if the argument is not found.
     */
    docsFor(name: string, mode: DocMode): Promise<FinalReply.DocsFor>;
    /**
     * Returns a reply containing the a string representing the result of
     * interpreting the input, with metadata. Also emits `OutputReply`s with
     * source highlighting for the input.
     *
     * Returns an error if the input cannot be fully interpreted. If it can be
     * partially interpreted, some metadata is returned.
     */
    interpret(expression: string): Promise<FinalReply.Interpret>;
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
    loadFile(path: string): Promise<FinalReply.LoadFile>;
    /**
     * Returns a reply containing a string a new case pattern match template.
     * Always successful — if the arguments are not found, returns a whitespace-only
     * string.
     */
    makeCase(name: string, line: number): Promise<FinalReply.MakeCase>;
    /**
     * Returns a reply containing two strings, `declaration` represents a new top-level
     * declaration, and `metavariable` represents a new metavariable-expression
     * using the new declaration.
     *
     * Returns an error object if a metavariable can’t be found for the `name` argument.
     * In Idris 1.3.2, it seems to ignore the line argument entirely, so if there
     * are multiple metavars with the same name, it just takes the first.
     */
    makeLemma(name: string, line: number): Promise<FinalReply.MakeLemma>;
    /**
     * Returns a reply containing a string representing a new with-rule pattern match template.
     * Always successful — simply returns the result of wrapping the `name` argument
     * in a with-clause.
     */
    makeWith(name: string, line: number): Promise<FinalReply.MakeWith>;
    /**
     * Returns a reply containing a list of metavariable descriptions. Each has the name
     * and type of the metavariable, with metadata for the type, as well as a list of descriptions
     * for other variables in the metavariable’s scope.
     * Always successful — it is an empty list if no metavariables are found.
     */
    metavariables(width: number): Promise<FinalReply.Metavariables>;
    /**
     * Returns a reply containing a string representing the argument’s declaration
     * with metadata.
     *
     * Returns an error object if the argument can’t be found.
     */
    printDefinition(name: string): Promise<FinalReply.PrintDefinition>;
    /**
     * Returns a reply containing an attempt to solve a metavariable given its
     * current scope.
     *
     * It is unclear how the hints argument works. The protocol documentation describes
     * it as ‘possibly-empty list of additional things to try while searching’.
     *
     * Always successful — is an empty string if no solution is found.
     */
    proofSearch(name: string, line: number, hints: string[]): Promise<FinalReply.ProofSearch>;
    /**
     * Returns a reply containing a list of strings, representing the possible
     * completions the REPL would provide.
     *
     * Always successful — empty list if no completions are possible.
     */
    replCompletions(name: string): Promise<FinalReply.ReplCompletions>;
    /**
     * Returns a reply containing the type of the argument, with metadata.
     *
     * Returns an error object if the argument cannot be found.
     */
    typeOf(name: string): Promise<FinalReply.TypeOf>;
    /**
     * Returns a reply describing the version of the Idris binary being used.
     *
     * Always successful.
     */
    version(): Promise<FinalReply.Version>;
    /**
     * Returns a reply with a list of references to the argument, each with name
     * and metadata. Also includes the full name with metadata of the argument/callee.
     *
     * Always successful — if the argument is not found, `callee` will be `null` though.
     */
    whoCalls(name: string): Promise<FinalReply.WhoCalls>;
}
export {};
