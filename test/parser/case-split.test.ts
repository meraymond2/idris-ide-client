import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :case-split reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "plusTwo Z = plus 2 n\nplusTwo (S k) = plus 2 n\n") 2)`
    const payload: S_Exp.CaseSplitOk = [
      ":ok",
      "plusTwo Z = plus 2 n\nplusTwo (S k) = plus 2 n\n",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.CaseSplit = {
      caseClause: "plusTwo Z = plus 2 n\nplusTwo (S k) = plus 2 n\n",
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":case-split")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "Elaborating {__infer_0} arg {ival_0}: Internal error: \\"Unelaboratable syntactic form (Example.plusTwo : (n : Nat) ->\nNat)\\"") 2)`
    const payload: S_Exp.CaseSplitErr = [
      ":error",
      `Elaborating {__infer_0} arg {ival_0}: Internal error: "Unelaboratable syntactic form (Example.plusTwo : (n : Nat) ->\nNat)"`,
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.CaseSplit = {
      err: `Elaborating {__infer_0} arg {ival_0}: Internal error: "Unelaboratable syntactic form (Example.plusTwo : (n : Nat) ->\nNat)"`,
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":case-split")
    assert.deepEqual(parsed, expected)
  })
})
