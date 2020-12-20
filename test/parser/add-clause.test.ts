import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { S_Exp, RootExpr } from "../../src/s-exps"

describe("Parsing :add-clause reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "f cat = ?f_rhs") 2)`
    const payload: S_Exp.AddClause = [":ok", "f cat = ?f_rhs"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.AddClause = {
      id: 2,
      initialClause: "f cat = ?f_rhs",
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":add-clause")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "f not defined here") 5)`
    const payload: S_Exp.AddClause = [":error", "f not defined here"]
    const rootExpr: RootExpr = [":return", payload, 5]
    const expected: FinalReply.AddClause = {
      err: "f not defined here",
      id: 5,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":add-clause")
    assert.deepEqual(parsed, expected)
  })
})
