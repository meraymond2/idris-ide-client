import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
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
      ok: "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs\n",
      id: 2,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-with")
    assert.deepEqual(parsed, expected)
  })
})
