import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :print-definition reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "data Bool : Type where\n  False : Bool\n  True : Bool" ((0 4 ((:decor :keyword))) (5 4 ((:name "Prelude.Bool.Bool") (:implicit :False) (:key "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==") (:decor :type) (:doc-overview "Boolean Data Type") (:type "Type") (:namespace "Prelude.Bool"))) (12 4 ((:decor :type) (:type "Type") (:doc-overview "The type of types") (:name "Type"))) (12 4 ((:tt-term "AAAAAAAAAAAHAAAAAAAAAAASLi9QcmVsdWRlL0Jvb2wuaWRyAAAAAAAAABQ="))) (17 5 ((:decor :keyword))) (25 5 ((:name "Prelude.Bool.False") (:implicit :False) (:key "AQAAAAAAAAAABUZhbHNlAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=") (:decor :data) (:doc-overview "") (:type "Bool") (:namespace "Prelude.Bool"))) (33 4 ((:name "Prelude.Bool.Bool") (:implicit :False) (:key "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==") (:decor :type) (:doc-overview "Boolean Data Type") (:type "Type") (:namespace "Prelude.Bool"))) (33 4 ((:tt-term "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl"))) (40 4 ((:name "Prelude.Bool.True") (:implicit :False) (:key "AQAAAAAAAAAABFRydWUAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==") (:decor :data) (:doc-overview "") (:type "Bool") (:namespace "Prelude.Bool"))) (47 4 ((:name "Prelude.Bool.Bool") (:implicit :False) (:key "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==") (:decor :type) (:doc-overview "Boolean Data Type") (:type "Type") (:namespace "Prelude.Bool"))) (47 4 ((:tt-term "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl"))))) 2)`
    const payload: S_Exp.PrintDefinitionOk = [
      ":ok",
      "data Bool : Type where\n  False : Bool\n  True : Bool",
      [
        [0, 4, [[":decor", ":keyword"]]],
        [
          5,
          4,
          [
            [":name", "Prelude.Bool.Bool"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            ],
            [":decor", ":type"],
            [":doc-overview", "Boolean Data Type"],
            [":type", "Type"],
            [":namespace", "Prelude.Bool"],
          ],
        ],
        [
          12,
          4,
          [
            [":decor", ":type"],
            [":type", "Type"],
            [":doc-overview", "The type of types"],
            [":name", "Type"],
          ],
        ],
        [
          12,
          4,
          [
            [
              ":tt-term",
              "AAAAAAAAAAAHAAAAAAAAAAASLi9QcmVsdWRlL0Jvb2wuaWRyAAAAAAAAABQ=",
            ],
          ],
        ],
        [17, 5, [[":decor", ":keyword"]]],
        [
          25,
          5,
          [
            [":name", "Prelude.Bool.False"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAABUZhbHNlAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=",
            ],
            [":decor", ":data"],
            [":doc-overview", ""],
            [":type", "Bool"],
            [":namespace", "Prelude.Bool"],
          ],
        ],
        [
          33,
          4,
          [
            [":name", "Prelude.Bool.Bool"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            ],
            [":decor", ":type"],
            [":doc-overview", "Boolean Data Type"],
            [":type", "Type"],
            [":namespace", "Prelude.Bool"],
          ],
        ],
        [
          33,
          4,
          [
            [
              ":tt-term",
              "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl",
            ],
          ],
        ],
        [
          40,
          4,
          [
            [":name", "Prelude.Bool.True"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAABFRydWUAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            ],
            [":decor", ":data"],
            [":doc-overview", ""],
            [":type", "Bool"],
            [":namespace", "Prelude.Bool"],
          ],
        ],
        [
          47,
          4,
          [
            [":name", "Prelude.Bool.Bool"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            ],
            [":decor", ":type"],
            [":doc-overview", "Boolean Data Type"],
            [":type", "Type"],
            [":namespace", "Prelude.Bool"],
          ],
        ],
        [
          47,
          4,
          [
            [
              ":tt-term",
              "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl",
            ],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.PrintDefinition = {
      definition: "data Bool : Type where\n  False : Bool\n  True : Bool",
      metadata: [
        {
          length: 4,
          metadata: {
            decor: ":keyword",
          },
          start: 0,
        },
        {
          length: 4,
          metadata: {
            decor: ":type",
            docOverview: "Boolean Data Type",
            implicit: ":False",
            key:
              "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Bool.Bool",
            namespace: "Prelude.Bool",
            type: "Type",
          },
          start: 5,
        },
        {
          length: 4,
          metadata: {
            decor: ":type",
            docOverview: "The type of types",
            name: "Type",
            ttTerm:
              "AAAAAAAAAAAHAAAAAAAAAAASLi9QcmVsdWRlL0Jvb2wuaWRyAAAAAAAAABQ=",
            type: "Type",
          },
          start: 12,
        },
        {
          length: 5,
          metadata: {
            decor: ":keyword",
          },
          start: 17,
        },
        {
          length: 5,
          metadata: {
            decor: ":data",
            docOverview: "",
            implicit: ":False",
            key:
              "AQAAAAAAAAAABUZhbHNlAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=",
            name: "Prelude.Bool.False",
            namespace: "Prelude.Bool",
            type: "Bool",
          },
          start: 25,
        },
        {
          length: 4,
          metadata: {
            decor: ":type",
            docOverview: "Boolean Data Type",
            implicit: ":False",
            key:
              "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Bool.Bool",
            namespace: "Prelude.Bool",
            ttTerm:
              "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl",
            type: "Type",
          },
          start: 33,
        },
        {
          length: 4,
          metadata: {
            decor: ":data",
            docOverview: "",
            implicit: ":False",
            key:
              "AQAAAAAAAAAABFRydWUAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Bool.True",
            namespace: "Prelude.Bool",
            type: "Bool",
          },
          start: 40,
        },
        {
          length: 4,
          metadata: {
            decor: ":type",
            docOverview: "Boolean Data Type",
            implicit: ":False",
            key:
              "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Bool.Bool",
            namespace: "Prelude.Bool",
            ttTerm:
              "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl",
            type: "Type",
          },
          start: 47,
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":print-definition")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "Not found") 2)`
    const payload: S_Exp.PrintDefinitionErr = [":error", "Not found"]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.PrintDefinition = {
      err: "Not found",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":print-definition")
    assert.deepEqual(parsed, expected)
  })
})
