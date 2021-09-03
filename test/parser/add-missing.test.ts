import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
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

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":add-missing")
    assert.deepEqual(parsed, expected)
  })
})
