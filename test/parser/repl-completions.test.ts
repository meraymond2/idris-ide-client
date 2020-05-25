import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :repl-completions reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok (("getArgs" "getChar" "getEnv" "getErrno" "getFileError" "getGoal" "getGuess" "getHoles" "getLine" "getLine'" "getMyVM" "getName" "getProof" "getSourceLocation" "getStringFromBuffer" "getWitness") "")) 2)`
    const payload: S_Exp.ReplCompletions = [
      ":ok",
      [
        [
          "getArgs",
          "getChar",
          "getEnv",
          "getErrno",
          "getFileError",
          "getGoal",
          "getGuess",
          "getHoles",
          "getLine",
          "getLine'",
          "getMyVM",
          "getName",
          "getProof",
          "getSourceLocation",
          "getStringFromBuffer",
          "getWitness",
        ],
        "",
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.ReplCompletions = {
      ok: [
        "getArgs",
        "getChar",
        "getEnv",
        "getErrno",
        "getFileError",
        "getGoal",
        "getGuess",
        "getHoles",
        "getLine",
        "getLine'",
        "getMyVM",
        "getName",
        "getProof",
        "getSourceLocation",
        "getStringFromBuffer",
        "getWitness",
      ],
      id: 2,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":repl-completions")
    assert.deepEqual(parsed, expected)
  })
})
