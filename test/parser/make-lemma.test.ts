import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :make-lemma reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok (:metavariable-lemma (:replace-metavariable "g_rhs n b") (:definition-type "g_rhs : (n : Nat) -> (b : Bool) -> String"))) 2)`
    const payload: S_Exp.MakeLemmaOk = [
      ":ok",
      [
        ":metavariable-lemma",
        [":replace-metavariable", "g_rhs n b"],
        [":definition-type", "g_rhs : (n : Nat) -> (b : Bool) -> String"],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.MakeLemma = {
      declaration: "g_rhs : (n : Nat) -> (b : Bool) -> String",
      id: 2,
      metavariable: "g_rhs n b",
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-lemma")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "NoSuchVariable nix") 2)`
    const payload: S_Exp.MakeLemmaErr = [":error", "NoSuchVariable nix"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.MakeLemma = {
      err: "NoSuchVariable nix",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-lemma")
    assert.deepEqual(parsed, expected)
  })
})
