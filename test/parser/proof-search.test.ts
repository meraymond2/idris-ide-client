import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :proof-search reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "0") 2)`
    const payload: S_Exp.ProofSearch = [":ok", "0"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.ProofSearch = {
      ok: "0",
      id: 2,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":proof-search")
    assert.deepEqual(parsed, expected)
  })
})
