import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :version reply", () => {
  it("can parse a success sexp.", () => {
    // current version on Nixos 2020-05-23
    const sexp = `(:return (:ok ((1 3 2) ())) 2)`
    const payload: S_Exp.Version = [":ok", [[1, 3, 2], []]]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.Version = {
      id: 2,
      major: 1,
      minor: 3,
      ok: true,
      patch: 2,
      tags: [],
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":version")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a success sexp with tags.", () => {
    // current version on Arch Linux 2020-05-23
    const sexp = `(:return (:ok ((1 3 2) ("git:PRE"))) 2)`
    const payload: S_Exp.Version = [":ok", [[1, 3, 2], ["git:PRE"]]]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.Version = {
      id: 2,
      major: 1,
      minor: 3,
      ok: true,
      patch: 2,
      tags: ["git:PRE"],
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":version")
    assert.deepEqual(parsed, expected)
  })
})
