import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

// Idris 2 only.
describe("Parsing :proof-search-next reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "0") 2)`
    const payload: S_Exp.ProofSearch = [":ok", "0"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.ProofSearch = {
      id: 2,
      ok: true,
      solution: "0",
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":proof-search")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "No more results") 4)`
    const payload: S_Exp.ProofSearch = [":error", "No more results"]
    const rootExpr: RootExpr = [":return", payload, 4]
    const expected: FinalReply.ProofSearch = {
      err: "No more results",
      id: 4,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":proof-search-next")
    assert.deepEqual(parsed, expected)
  })
})
