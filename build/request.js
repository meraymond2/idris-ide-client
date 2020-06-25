"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pad = (hexNum) => "0".repeat(6 - hexNum.length) + hexNum;
const prependLen = (message) => pad(message.length.toString(16)) + message;
const serialiseArgs = (req) => {
    switch (req.type) {
        case ":add-clause":
        case ":add-missing":
        case ":case-split":
        case ":make-case":
        case ":make-lemma":
        case ":make-with":
            return `${req.type} ${req.line} "${req.name}"`;
        case ":apropos":
            return `${req.type} "${req.string}"`;
        case ":browse-namespace":
            return `${req.type} "${req.namespace}"`;
        case ":calls-who":
        case ":print-definition":
        case ":repl-completions":
        case ":type-of":
        case ":who-calls":
            return `${req.type} "${req.name}"`;
        case ":docs-for":
            return `${req.type} "${req.name}" ${req.mode}`;
        case ":interpret":
            return `${req.type} "${req.expression}"`;
        case ":load-file":
            return `${req.type} "${req.path}"`;
        case ":metavariables":
            return `${req.type} ${req.width}`;
        case ":proof-search":
            return `${req.type} ${req.line} "${req.name}" (${req.hints.join(" ")})`;
        case ":version":
            return req.type;
    }
};
exports.serialiseRequest = (req) => prependLen(`((${serialiseArgs(req)}) ${req.id})\n`);
//# sourceMappingURL=request.js.map