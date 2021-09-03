import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :make-case reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "g n b = case _ of\n             case_val => ?g_rhs\n") 2)`
    const payload: S_Exp.MakeCase = [
      ":ok",
      "g n b = case _ of\n             case_val => ?g_rhs\n",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.MakeCase = {
      caseClause: "g n b = case _ of\n             case_val => ?g_rhs\n",
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-case")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    // When it can’t add a case, it still returns a new line.
    const sexp = `(:return (:ok "\n") 2)`
    const payload: S_Exp.MakeCase = [":ok", "\n"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.MakeCase = {
      caseClause: "\n",
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-case")
    assert.deepEqual(parsed, expected)
  })
})
