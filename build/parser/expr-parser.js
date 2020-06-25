"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findClosingParen = (tokens) => {
    let nesting = 0;
    let pos = 0;
    while (!(tokens[pos].type === "RIGHT_PAREN" && nesting === 0)) {
        switch (tokens[pos].type) {
            case "LEFT_PAREN":
                nesting += 1;
                break;
            case "RIGHT_PAREN":
                nesting -= 1;
                break;
            default:
                break;
        }
        pos += 1;
    }
    return pos;
};
exports.deserialise = (tokens) => {
    let pos = 0;
    let exprs = [];
    while (pos < tokens.length) {
        const t = tokens[pos];
        switch (t.type) {
            case "NAT":
                exprs.push(t.nat);
                pos += 1;
                break;
            case "STRING":
                exprs.push(t.str);
                pos += 1;
                break;
            case "SYMBOL":
                exprs.push(t.sym);
                pos += 1;
                break;
            case "LEFT_PAREN": {
                pos += 1;
                const end = pos + findClosingParen(tokens.slice(pos, tokens.length));
                const sublist = tokens.slice(pos, end);
                exprs.push(exports.deserialise(sublist));
                pos = end + 1;
                break;
            }
            default:
                throw "Unexpected token: " + JSON.stringify(t);
        }
    }
    return exprs;
};
//# sourceMappingURL=expr-parser.js.map