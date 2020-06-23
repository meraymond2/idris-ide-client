import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"
import { FinalReply } from "../../src/reply"

describe("Parsing :type-of reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "Cat : Type" ((0 3 ((:name "Example.Cat") (:implicit :False) (:key "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl") (:decor :type) (:doc-overview "") (:type "Type") (:namespace "Example"))) (6 4 ((:decor :type) (:type "Type") (:doc-overview "The type of types") (:name "Type"))) (6 4 ((:tt-term "AAAAAAAAAAAHAAAAAAAAAAAbLi8uL3Rlc3QvcmVzb3VyY2VzL3Rlc3QuaWRyAAAAAAAAABQ="))))) 2)`
    const payload: S_Exp.TypeOfOk = [
      ":ok",
      "Cat : Type",
      [
        [
          0,
          3,
          [
            [":name", "Example.Cat"],
            [":implicit", ":False"],
            [":key", "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl"],
            [":decor", ":type"],
            [":doc-overview", ""],
            [":type", "Type"],
            [":namespace", "Example"],
          ],
        ],
        [
          6,
          4,
          [
            [":decor", ":type"],
            [":type", "Type"],
            [":doc-overview", "The type of types"],
            [":name", "Type"],
          ],
        ],
        [
          6,
          4,
          [
            [
              ":tt-term",
              "AAAAAAAAAAAHAAAAAAAAAAAbLi8uL3Rlc3QvcmVzb3VyY2VzL3Rlc3QuaWRyAAAAAAAAABQ=",
            ],
          ],
        ],
      ],
    ]

    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.TypeOf = {
      typeOf: "Cat : Type",
      metadata: [
        {
          length: 3,
          metadata: {
            decor: ":type",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
            name: "Example.Cat",
            namespace: "Example",
            type: "Type",
          },
          start: 0,
        },
        {
          length: 4,
          metadata: {
            decor: ":type",
            docOverview: "The type of types",
            name: "Type",
            ttTerm:
              "AAAAAAAAAAAHAAAAAAAAAAAbLi8uL3Rlc3QvcmVzb3VyY2VzL3Rlc3QuaWRyAAAAAAAAABQ=",
            type: "Type",
          },
          start: 6,
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":type-of")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp", () => {
    const sexp = `(:return (:error "No such variable luna") 2)`
    const payload: S_Exp.TypeOfErr = [":error", "No such variable luna"]

    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.TypeOf = {
      err: "No such variable luna",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":type-of")
    assert.deepEqual(parsed, expected)
  })
})
