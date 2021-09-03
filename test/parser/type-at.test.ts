import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"
import { FinalReply } from "../../src/reply"

describe("Parsing :type-of reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "b : Bool") 23)`
    const payload: S_Exp.TypeAtOk = [":ok", "b : Bool"]

    const rootExpr: RootExpr = [":return", payload, 23]
    const expected: FinalReply.TypeAt = {
      id: 23,
      ok: true,
      type: ":return",
      typeAt: "b : Bool",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":type-at")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp", () => {
    const sexp = `(:return (:error "Undefined name luna. \n\n(interactive):1:1--1:1\n   |\n 1 | 2 * 2\n   | \n") 23)`
    const payload: S_Exp.TypeAtErr = [
      ":error",
      "Undefined name luna. \n\n(interactive):1:1--1:1\n   |\n 1 | 2 * 2\n   | \n",
    ]

    const rootExpr: RootExpr = [":return", payload, 23]
    const expected: FinalReply.TypeAt = {
      err:
        "Undefined name luna. \n\n(interactive):1:1--1:1\n   |\n 1 | 2 * 2\n   | \n",
      id: 23,
      ok: false,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":type-at")
    assert.deepEqual(parsed, expected)
  })
})
