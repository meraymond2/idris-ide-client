import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { S_Exp, RootExpr } from "../../src/s-exps"

describe("Parsing :add-missing reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "getName Sherlock = ?getName_rhs_1") 2)`
    const payload: S_Exp.AddMissing = [
      ":ok",
      "getName Sherlock = ?getName_rhs_1",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.AddMissing = {
      id: 2,
      missingClauses: "getName Sherlock = ?getName_rhs_1",
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":add-missing")
    assert.deepEqual(parsed, expected)
  })
})
