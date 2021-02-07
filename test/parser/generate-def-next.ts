import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { S_Exp, RootExpr } from "../../src/s-exps"

describe("Parsing :generate-def reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "append [] ys = ys\nappend (x :: xs) [] = x :: append xs []\nappend (x :: xs) (y :: ys) = x :: append xs (y :: ys)") 3)`
    const payload: S_Exp.GenerateDef = [
      ":ok",
      "append [] ys = ys\nappend (x :: xs) [] = x :: append xs []\nappend (x :: xs) (y :: ys) = x :: append xs (y :: ys)",
    ]
    const rootExpr: RootExpr = [":return", payload, 3]
    const expected: FinalReply.GenerateDef = {
      def:
        "append [] ys = ys\nappend (x :: xs) [] = x :: append xs []\nappend (x :: xs) (y :: ys) = x :: append xs (y :: ys)",
      id: 3,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":generate-def-next")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "No more results") 16)`
    const payload: S_Exp.GenerateDefErr = [":error", "No more results"]
    const rootExpr: RootExpr = [":return", payload, 16]
    const expected: FinalReply.GenerateDef = {
      err: "No more results",
      id: 16,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":generate-def-next")
    assert.deepEqual(parsed, expected)
  })
})
