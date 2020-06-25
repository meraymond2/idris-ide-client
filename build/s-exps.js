"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReplyType = (s) => s === ":protocol-version" ||
    s === ":output" ||
    s === ":return" ||
    s === ":set-prompt" ||
    s === ":warning" ||
    s === ":write-string";
exports.isRootExpr = (expr) => Array.isArray(expr) &&
    typeof expr[0] === "string" &&
    exports.isReplyType(expr[0]) &&
    typeof expr[2] === "number";
var S_Exp;
(function (S_Exp) {
    S_Exp.isOkApropos = (payload) => payload[0] === ":ok";
    S_Exp.isOkBrowseNamespace = (payload) => payload[0] === ":ok";
    S_Exp.isOkCaseSplit = (payload) => payload[0] === ":ok";
    S_Exp.isOkDocsFor = (payload) => payload[0] === ":ok";
    S_Exp.isOkInterpret = (payload) => payload[0] === ":ok";
    S_Exp.isOkLoadFile = (payload) => payload[0] === ":ok";
    S_Exp.isOkMakeLemma = (payload) => payload[0] === ":ok";
    S_Exp.isOkPrintDefinition = (payload) => payload[0] === ":ok";
    S_Exp.isOkTypeOf = (payload) => payload[0] === ":ok";
})(S_Exp = exports.S_Exp || (exports.S_Exp = {}));
//# sourceMappingURL=s-exps.js.map