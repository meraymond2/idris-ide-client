"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const reply_1 = require("./reply");
const request_1 = require("./request");
const HEADER_LENGTH = 6;
class IdrisClient {
    constructor(input, output, options = {}) {
        if (options.replyCallback)
            this.replyCallback = options.replyCallback;
        this.debug = Boolean(options.debug);
        this.messageBuffer = "";
        this.registry = {};
        this.reqCounter = 0;
        this.input = input;
        this.output = output;
        this.output.on("data", (chunk) => {
            this.messageBuffer = this.messageBuffer + chunk.toString("utf8");
            this.consumeOutput();
        });
    }
    consumeOutput() {
        if (this.messageBuffer.length > HEADER_LENGTH) {
            const nextSexpLength = parseInt(this.messageBuffer.slice(0, HEADER_LENGTH), 16);
            const nextMessageLength = HEADER_LENGTH + nextSexpLength;
            if (this.messageBuffer.length >= nextMessageLength) {
                const nextSexp = this.messageBuffer
                    .slice(HEADER_LENGTH, nextMessageLength)
                    .trim();
                if (this.debug)
                    console.debug(">> " + nextSexp);
                this.messageBuffer = this.messageBuffer.slice(nextMessageLength, this.messageBuffer.length);
                this.replyHandler(nextSexp);
                this.consumeOutput();
            }
            // else, wait for rest of message
        }
    }
    replyHandler(plString) {
        const rootExpr = parser_1.parseRootExpr(plString);
        const id = rootExpr[2];
        if (this.registry[id]) {
            const { requestType, resFn } = this.registry[id];
            const reply = parser_1.parseReply(rootExpr, requestType);
            if (this.replyCallback)
                this.replyCallback(reply);
            if (resFn && reply_1.FinalReply.isFinalReply(reply)) {
                delete this.registry[id];
                resFn(reply);
            }
        }
    }
    makeReq(req) {
        const serialisedReq = request_1.serialiseRequest(req);
        if (this.debug)
            console.debug("<< " + serialisedReq);
        return new Promise((res) => {
            this.registry[req.id] = { requestType: req.type, resFn: res };
            this.input.write(serialisedReq, "utf8");
        });
    }
    /**
     * Returns a reply containing a string that represents an initial pattern-matching
     * clause for a function. Always successful — if no matching function could be found,
     * it will be an empty string.
     */
    addClause(name, line) {
        const id = ++this.reqCounter;
        const req = { id, line, name, type: ":add-clause" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string comprising any missing pattern-matching
     * cases for a function. Always successful — if no matching function could be
     * found, or if there are no missing cases, it will be an empty string.
     */
    addMissing(name, line) {
        const id = ++this.reqCounter;
        const req = { id, line, name, type: ":add-missing" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string containing any mentions of the argument
     * from the Idris documentation. It is _not_ a list of strings, but a single
     * string, with new-line separated entries. Includes metadata.
     *
     * Returns an error object if nothing can be found for the argument.
     */
    apropos(string) {
        const id = ++this.reqCounter;
        const req = { id, string, type: ":apropos" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply comprising `declarations`, which is a list of top-level
     * declarations in the namespace, each with its own metadata, and `subModules`,
     * which is a list of the names of any nested modules.
     *
     * Returns an error object if no matching namespace is found.
     */
    browseNamespace(namespace) {
        const id = ++this.reqCounter;
        const req = {
            id,
            namespace,
            type: ":browse-namespace",
        };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply comprising `caller`, which is the full name of the argument
     * with metadata, and `references`, a list of callees, each including the
     * callee’s full name with metadata.
     *
     * Always successful, but if the argument is not found, `caller` will be `null`,
     * and the references will be empty.
     */
    callsWho(name) {
        const id = ++this.reqCounter;
        const req = { id, name, type: ":calls-who" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string with the possible case-patterns
     * for the given variable.
     *
     * Returns an error object if the argument is not a variable that can be split.
     */
    caseSplit(name, line) {
        const id = ++this.reqCounter;
        const req = { id, line, name, type: ":case-split" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string with the documentation for the argument,
     * with metadata.  If `mode` is ":overview", only the first paragraph of
     * documentation is returned.
     *
     * Returns an error if the argument is not found.
     */
    docsFor(name, mode) {
        const id = ++this.reqCounter;
        const req = { id, name, mode, type: ":docs-for" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing the a string representing the result of
     * interpreting the input, with metadata. Also emits `OutputReply`s with
     * source highlighting for the input.
     *
     * Returns an error if the input cannot be fully interpreted. If it can be
     * partially interpreted, some metadata is returned.
     */
    interpret(expression) {
        const id = ++this.reqCounter;
        const req = { id, expression, type: ":interpret" };
        return this.makeReq(req).then((r) => r);
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
    loadFile(path) {
        const id = ++this.reqCounter;
        const req = { id, path, type: ":load-file" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string a new case pattern match template.
     * Always successful — if the arguments are not found, returns a whitespace-only
     * string.
     */
    makeCase(name, line) {
        const id = ++this.reqCounter;
        const req = { id, line, name, type: ":make-case" };
        return this.makeReq(req).then((r) => r);
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
    makeLemma(name, line) {
        const id = ++this.reqCounter;
        const req = { id, line, name, type: ":make-lemma" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string representing a new with-rule pattern match template.
     * Always successful — simply returns the result of wrapping the `name` argument
     * in a with-clause.
     */
    makeWith(name, line) {
        const id = ++this.reqCounter;
        const req = { id, line, name, type: ":make-with" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a list of metavariable descriptions. Each has the name
     * and type of the metavariable, with metadata for the type, as well as a list of descriptions
     * for other variables in the metavariable’s scope.
     * Always successful — it is an empty list if no metavariables are found.
     */
    metavariables(width) {
        const id = ++this.reqCounter;
        const req = { id, type: ":metavariables", width };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a string representing the argument’s declaration
     * with metadata.
     *
     * Returns an error object if the argument can’t be found.
     */
    printDefinition(name) {
        const id = ++this.reqCounter;
        const req = { id, name, type: ":print-definition" };
        return this.makeReq(req).then((r) => r);
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
    proofSearch(name, line, hints) {
        const id = ++this.reqCounter;
        const req = {
            id,
            line,
            name,
            hints,
            type: ":proof-search",
        };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing a list of strings, representing the possible
     * completions the REPL would provide.
     *
     * Always successful — empty list if no completions are possible.
     */
    replCompletions(name) {
        const id = ++this.reqCounter;
        const req = { id, name, type: ":repl-completions" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply containing the type of the argument, with metadata.
     *
     * Returns an error object if the argument cannot be found.
     */
    typeOf(name) {
        const id = ++this.reqCounter;
        const req = { id, name, type: ":type-of" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply describing the version of the Idris binary being used.
     *
     * Always successful.
     */
    version() {
        const id = ++this.reqCounter;
        const req = { id, type: ":version" };
        return this.makeReq(req).then((r) => r);
    }
    /**
     * Returns a reply with a list of references to the argument, each with name
     * and metadata. Also includes the full name with metadata of the argument/callee.
     *
     * Always successful — if the argument is not found, `callee` will be `null` though.
     */
    whoCalls(name) {
        const id = ++this.reqCounter;
        const req = { id, name, type: ":who-calls" };
        return this.makeReq(req).then((r) => r);
    }
}
exports.IdrisClient = IdrisClient;
//# sourceMappingURL=client.js.map