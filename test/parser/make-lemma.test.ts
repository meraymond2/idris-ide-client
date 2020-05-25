import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
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
      ok: {
        declaration: "g_rhs : (n : Nat) -> (b : Bool) -> String",
        metavariable: "g_rhs n b",
      },
      id: 2,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
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
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":make-lemma")
    assert.deepEqual(parsed, expected)
  })
})
