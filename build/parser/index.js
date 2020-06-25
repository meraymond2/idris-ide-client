"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reply_parser_1 = require("./reply-parser");
exports.parseReply = reply_parser_1.parseReply;
const lexer_1 = require("./lexer");
const expr_parser_1 = require("./expr-parser");
const s_exps_1 = require("../s-exps");
const parseRootExpr = (plString) => {
    const tokenArray = lexer_1.lex(plString);
    const expr = expr_parser_1.deserialise(tokenArray)[0]; // deserialise wraps everything in an extra []
    if (!s_exps_1.isRootExpr(expr))
        throw "Reply not handled: " + JSON.stringify(plString);
    return expr;
};
exports.parseRootExpr = parseRootExpr;
//# sourceMappingURL=index.js.map