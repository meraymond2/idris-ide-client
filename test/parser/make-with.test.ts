import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :make-with reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs\n") 2)`
    const payload: S_Exp.MakeWith = [
      ":ok",
      "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs\n",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.MakeWith = {
      id: 2,
      ok: true,
      type: ":return",
      withClause: "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs\n",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-with")
    assert.deepEqual(parsed, expected)
  })
})
