import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { S_Exp, RootExpr } from "../../src/s-exps"

// Idris 2 only.
describe("Parsing :generate-def reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "append [] ys = ys\nappend (x :: xs) ys = x :: append xs ys") 2)`
    const payload: S_Exp.GenerateDef = [
      ":ok",
      "append [] ys = ys\nappend (x :: xs) ys = x :: append xs ys",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.GenerateDef = {
      def: "append [] ys = ys\nappend (x :: xs) ys = x :: append xs ys",
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":generate-def")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a not-found failure sexp.", () => {
    const sexp = `(:return (:error "Can't find declaration for append on line 5") 2)`
    const payload: S_Exp.GenerateDefErr = [
      ":error",
      "Can't find declaration for append on line 5",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.GenerateDef = {
      err: "Can't find declaration for append on line 5",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":generate-def")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a already-defined failure sexp.", () => {
    const sexp = `(:return (:error "Already defined") 2)`
    const payload: S_Exp.GenerateDefErr = [":error", "Already defined"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.GenerateDef = {
      err: "Already defined",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":generate-def")
    assert.deepEqual(parsed, expected)
  })
})
