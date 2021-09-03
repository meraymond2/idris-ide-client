import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :proof-search reply", () => {
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

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":proof-search")
    assert.deepEqual(parsed, expected)
  })

  // Idris 2 only.
  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "Not a searchable hole") 2)`
    const payload: S_Exp.ProofSearch = [":error", "Not a searchable hole"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.ProofSearch = {
      err: "Not a searchable hole",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":proof-search")
    assert.deepEqual(parsed, expected)
  })
})
