"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const s_exps_1 = require("../s-exps");
exports.parseReply = (expr, requestType) => {
    const [replyType, payload, id] = expr;
    switch (replyType) {
        case ":output":
            return intoOutputReply(payload, id);
        case ":protocol-version":
            return intoInfoReplyVersion(payload, id);
        case ":return":
            switch (requestType) {
                case ":add-clause":
                    return intoFinalReplyAddClause(payload, id);
                case ":add-missing":
                    return intoFinalReplyAddMissing(payload, id);
                case ":apropos":
                    return intoFinalReplyApropos(payload, id);
                case ":browse-namespace":
                    return intoFinalReplyBrowseNamespace(payload, id);
                case ":calls-who":
                    return intoFinalReplyCallsWho(payload, id);
                case ":case-split":
                    return intoFinalReplyCaseSplit(payload, id);
                case ":docs-for":
                    return intoFinalReplyDocsFor(payload, id);
                case ":interpret":
                    return intoFinalReplyInterpret(payload, id);
                case ":load-file":
                    return intoFinalReplyLoadFile(payload, id);
                case ":make-case":
                    return intoFinalReplyMakeCase(payload, id);
                case ":make-lemma":
                    return intoFinalReplyMakeLemma(payload, id);
                case ":make-with":
                    return intoFinalReplyMakeWith(payload, id);
                case ":metavariables":
                    return intoFinalReplyMetavariables(payload, id);
                case ":print-definition":
                    return intoFinalReplyPrintDefinition(payload, id);
                case ":proof-search":
                    return intoFinalReplyProofSearch(payload, id);
                case ":repl-completions":
                    return intoFinalReplyReplCompletions(payload, id);
                case ":type-of":
                    return intoFinalReplyTypeOf(payload, id);
                case ":version":
                    return intoFinalReplyVersion(payload, id);
                case ":who-calls":
                    return intoFinalReplyWhoCalls(payload, id);
                default:
                    throw "Unreachable.";
            }
        case ":set-prompt":
            return intoInfoReplySetPrompt(payload, id);
        case ":warning":
            return intoInfoReplyWarning(payload, id);
        case ":write-string":
            return intoInfoReplyWriteString(payload, id);
        default:
            throw "Unexpected replyType: " + replyType;
    }
};
/* Helpers */
const camelCaseKey = (lispKey) => lispKey
    .slice(1, lispKey.length)
    .split("-")
    .reduce((acc, chunk, idx) => idx === 0
    ? chunk
    : acc + chunk[0].toUpperCase() + chunk.slice(1, chunk.length), "");
const formatDecl = ([name, metadata]) => ({
    name,
    metadata: intoMessageMetadata(metadata),
});
const intoSourceMetadata = (metadata) => {
    const terms = metadata.map(([[file, start, end], attrs]) => {
        const [_filename, filename] = file;
        const [_start, startLine, startCol] = start;
        const [_end, endLine, endCol] = end;
        const metadata = attrs.reduce((acc, [k, v]) => (Object.assign(Object.assign({}, acc), { [camelCaseKey(k)]: v })), {});
        return {
            end: { column: endCol, line: endLine },
            filename,
            metadata,
            start: { column: startCol, line: startLine },
        };
    });
    // I haven’t witnessed multiple entries for duplicate locations
    // in the source metadata, so I’m not bothering to merge them like
    // the message metadata.
    return terms;
};
const intoMessageMetadata = (metadata) => {
    const terms = metadata.map(([start, length, attrs]) => {
        return {
            start,
            length,
            metadata: attrs.reduce((acc, [k, v]) => (Object.assign(Object.assign({}, acc), { [camelCaseKey(k)]: v })), {}),
        };
    });
    const merged = terms.reduce((acc, term) => {
        var _a;
        const key = `${term.start},${term.length}`;
        const existing = ((_a = acc[key]) === null || _a === void 0 ? void 0 : _a.metadata) || {};
        const next = Object.assign(Object.assign({}, existing), term.metadata);
        return Object.assign(Object.assign({}, acc), { [key]: Object.assign(Object.assign({}, term), { metadata: next }) });
    }, {});
    return Object.values(merged);
};
// * Info Replies * //
const intoInfoReplySetPrompt = (payload, id) => ({
    path: payload,
    id,
    type: ":set-prompt",
});
const intoInfoReplyVersion = (payload, id) => ({
    version: payload,
    id,
    type: ":protocol-version",
});
const intoInfoReplyWarning = (payload, id) => {
    const [filename, [startLine, startCol], [endLine, endCol], warning, metadata,] = payload;
    return {
        err: {
            end: { line: endLine, column: endCol },
            filename,
            metadata: intoMessageMetadata(metadata),
            start: { line: startLine, column: startCol },
            warning,
        },
        id,
        type: ":warning",
    };
};
const intoInfoReplyWriteString = (payload, id) => ({
    message: payload,
    id,
    type: ":write-string",
});
// * Output Replies * //
const intoOutputReply = (payload, id) => {
    const [_ok, [_highlight, metadata]] = payload;
    return {
        ok: intoSourceMetadata(metadata),
        id,
        type: ":output",
    };
};
// * Final Replies * //
const intoFinalReplyAddClause = (payload, id) => {
    const [_ok, initialClause] = payload;
    return {
        initialClause,
        id,
        ok: true,
        type: ":return",
    };
};
const intoFinalReplyAddMissing = (payload, id) => {
    const [_ok, missingClauses] = payload;
    return {
        id,
        ok: true,
        missingClauses,
        type: ":return",
    };
};
const intoFinalReplyApropos = (payload, id) => {
    if (s_exps_1.S_Exp.isOkApropos(payload)) {
        const [_ok, apropos, metadata] = payload;
        return {
            docs: apropos,
            metadata: intoMessageMetadata(metadata),
            id,
            ok: true,
            type: ":return",
        };
    }
    else {
        const [_err, msg, _empty] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyBrowseNamespace = (payload, id) => {
    if (s_exps_1.S_Exp.isOkBrowseNamespace(payload)) {
        const [_ok, [subModules, decls]] = payload;
        return {
            declarations: decls.map(formatDecl),
            id,
            ok: true,
            subModules,
            type: ":return",
        };
    }
    else {
        const [_err, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyCallsWho = (payload, id) => {
    if (payload[1].length > 0) {
        const [_ok, [[decl, refs]]] = payload;
        return {
            caller: formatDecl(decl),
            id,
            ok: true,
            references: refs.map(formatDecl),
            type: ":return",
        };
    }
    else {
        return {
            caller: null,
            id,
            ok: true,
            references: [],
            type: ":return",
        };
    }
};
const intoFinalReplyCaseSplit = (payload, id) => {
    if (s_exps_1.S_Exp.isOkCaseSplit(payload)) {
        const [_ok, caseClause] = payload;
        return {
            caseClause,
            id,
            ok: true,
            type: ":return",
        };
    }
    else {
        const [_error, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyDocsFor = (payload, id) => {
    if (s_exps_1.S_Exp.isOkDocsFor(payload)) {
        const [_ok, docs, metadata] = payload;
        return {
            docs,
            id,
            metadata: intoMessageMetadata(metadata),
            ok: true,
            type: ":return",
        };
    }
    else {
        const [_error, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyInterpret = (payload, id) => {
    if (s_exps_1.S_Exp.isOkInterpret(payload)) {
        const [_ok, result, metadata] = payload;
        return {
            id,
            ok: true,
            metadata: intoMessageMetadata(metadata),
            result,
            type: ":return",
        };
    }
    else {
        const [_err, msg, metadata] = payload;
        return {
            err: msg,
            id,
            metadata: intoMessageMetadata(metadata || []),
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyLoadFile = (payload, id) => {
    if (s_exps_1.S_Exp.isOkLoadFile(payload)) {
        return {
            id,
            ok: true,
            type: ":return",
        };
    }
    else {
        const [_error, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyMakeCase = (payload, id) => {
    const [_ok, caseClause] = payload;
    return {
        caseClause,
        id,
        ok: true,
        type: ":return",
    };
};
const intoFinalReplyMakeLemma = (payload, id) => {
    if (s_exps_1.S_Exp.isOkMakeLemma(payload)) {
        const [_ok, [_metavariableLemma, [_replace, metavariable], [_def_type, declaration]],] = payload;
        return {
            declaration,
            id,
            ok: true,
            metavariable,
            type: ":return",
        };
    }
    else {
        const [_err, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyMakeWith = (payload, id) => {
    const [_ok, withClause] = payload;
    return {
        withClause,
        id,
        ok: true,
        type: ":return",
    };
};
const intoFinalReplyMetavariables = (payload, id) => {
    const [_ok, metavars] = payload;
    const metavariables = metavars.map(([name, holePremises, [type, metadata]]) => {
        const metavariable = {
            name,
            type,
            metadata: intoMessageMetadata(metadata),
        };
        const premises = holePremises.map(([name, type, metadata]) => ({
            name,
            type,
            metadata: intoMessageMetadata(metadata),
        }));
        return { metavariable, premises };
    });
    return { id, ok: true, metavariables, type: ":return" };
};
const intoFinalReplyPrintDefinition = (payload, id) => {
    if (s_exps_1.S_Exp.isOkPrintDefinition(payload)) {
        const [_ok, definition, metadata] = payload;
        return {
            definition,
            id,
            metadata: intoMessageMetadata(metadata),
            ok: true,
            type: ":return",
        };
    }
    else {
        const [_err, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyProofSearch = (payload, id) => {
    const [_ok, solution] = payload;
    return {
        id,
        ok: true,
        solution,
        type: ":return",
    };
};
const intoFinalReplyReplCompletions = (payload, id) => {
    const [_ok, [completions, _x]] = payload; // x is always ""?
    return {
        completions,
        id,
        ok: true,
        type: ":return",
    };
};
const intoFinalReplyTypeOf = (payload, id) => {
    if (s_exps_1.S_Exp.isOkTypeOf(payload)) {
        const [_ok, typeOf, metadata] = payload;
        return {
            id,
            ok: true,
            metadata: intoMessageMetadata(metadata),
            type: ":return",
            typeOf,
        };
    }
    else {
        const [_err, msg] = payload;
        return {
            err: msg,
            id,
            ok: false,
            type: ":return",
        };
    }
};
const intoFinalReplyVersion = (payload, id) => {
    const [_ok, [[major, minor, patch], tags]] = payload;
    return {
        id,
        major,
        minor,
        ok: true,
        patch,
        tags,
        type: ":return",
    };
};
const intoFinalReplyWhoCalls = (payload, id) => {
    if (payload[1].length > 0) {
        const [_ok, [[decl, refs]]] = payload;
        return {
            callee: formatDecl(decl),
            id,
            ok: true,
            references: refs.map(formatDecl),
            type: ":return",
        };
    }
    else {
        return {
            callee: null,
            id,
            ok: true,
            references: [],
            type: ":return",
        };
    }
};
//# sourceMappingURL=reply-parser.js.map