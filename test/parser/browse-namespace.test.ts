import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :browse-namespace reply", () => {
  it("can parse a success sexp with submodules.", () => {
    // Abbreviated result from ":browseNamespace "Language.Reflection"
    const sexp = `(:return (:ok (("Language.Reflection.Errors" "Language.Reflection.Elab" "Language.Reflection.Elab.Tactics" "Language.Reflection.Elab.ConstructorDefn" "Language.Reflection.Elab.TyDecl" "Language.Reflection.Elab.FunDefn" "Language.Reflection.Elab.DataDefn" "Language.Reflection.Elab.Datatype" "Language.Reflection.SourceLocation" "Language.Reflection.Elab.FunArg") (("ATDouble : ArithTy" ((0 8 ((:name "Language.Reflection.ATDouble") (:implicit :False) (:key "AQAAAAAAAAAACEFURG91YmxlAAAAAAAAAAIAAAAAAAAAClJlZmxlY3Rpb24AAAAAAAAACExhbmd1YWdl") (:decor :data) (:doc-overview "") (:type "ArithTy") (:namespace "Language.Reflection"))) (11 7 ((:name "Language.Reflection.ArithTy") (:implicit :False) (:key "AQAAAAAAAAAAB0FyaXRoVHkAAAAAAAAAAgAAAAAAAAAKUmVmbGVjdGlvbgAAAAAAAAAITGFuZ3VhZ2U=") (:decor :type) (:doc-overview "") (:type "Type") (:namespace "Language.Reflection"))) (11 7 ((:tt-term "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAHQXJpdGhUeQAAAAAAAAACAAAAAAAAAApSZWZsZWN0aW9uAAAAAAAAAAhMYW5ndWFnZQ==")))))))) 2)`
    const payload: S_Exp.BrowseNamespaceOk = [
      ":ok",
      [
        [
          "Language.Reflection.Errors",
          "Language.Reflection.Elab",
          "Language.Reflection.Elab.Tactics",
          "Language.Reflection.Elab.ConstructorDefn",
          "Language.Reflection.Elab.TyDecl",
          "Language.Reflection.Elab.FunDefn",
          "Language.Reflection.Elab.DataDefn",
          "Language.Reflection.Elab.Datatype",
          "Language.Reflection.SourceLocation",
          "Language.Reflection.Elab.FunArg",
        ],
        [
          [
            "ATDouble : ArithTy",
            [
              [
                0,
                8,
                [
                  [":name", "Language.Reflection.ATDouble"],
                  [":implicit", ":False"],
                  [
                    ":key",
                    "AQAAAAAAAAAACEFURG91YmxlAAAAAAAAAAIAAAAAAAAAClJlZmxlY3Rpb24AAAAAAAAACExhbmd1YWdl",
                  ],
                  [":decor", ":data"],
                  [":doc-overview", ""],
                  [":type", "ArithTy"],
                  [":namespace", "Language.Reflection"],
                ],
              ],
              [
                11,
                7,
                [
                  [":name", "Language.Reflection.ArithTy"],
                  [":implicit", ":False"],
                  [
                    ":key",
                    "AQAAAAAAAAAAB0FyaXRoVHkAAAAAAAAAAgAAAAAAAAAKUmVmbGVjdGlvbgAAAAAAAAAITGFuZ3VhZ2U=",
                  ],
                  [":decor", ":type"],
                  [":doc-overview", ""],
                  [":type", "Type"],
                  [":namespace", "Language.Reflection"],
                ],
              ],
              [
                11,
                7,
                [
                  [
                    ":tt-term",
                    "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAHQXJpdGhUeQAAAAAAAAACAAAAAAAAAApSZWZsZWN0aW9uAAAAAAAAAAhMYW5ndWFnZQ==",
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ]

    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.BrowseNamespace = {
      subModules: [
        "Language.Reflection.Errors",
        "Language.Reflection.Elab",
        "Language.Reflection.Elab.Tactics",
        "Language.Reflection.Elab.ConstructorDefn",
        "Language.Reflection.Elab.TyDecl",
        "Language.Reflection.Elab.FunDefn",
        "Language.Reflection.Elab.DataDefn",
        "Language.Reflection.Elab.Datatype",
        "Language.Reflection.SourceLocation",
        "Language.Reflection.Elab.FunArg",
      ],
      declarations: [
        {
          name: "ATDouble : ArithTy",
          metadata: [
            {
              start: 0,
              length: 8,
              metadata: {
                name: "Language.Reflection.ATDouble",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAACEFURG91YmxlAAAAAAAAAAIAAAAAAAAAClJlZmxlY3Rpb24AAAAAAAAACExhbmd1YWdl",
                decor: ":data",
                docOverview: "",
                type: "ArithTy",
                namespace: "Language.Reflection",
              },
            },
            {
              start: 11,
              length: 7,
              metadata: {
                name: "Language.Reflection.ArithTy",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAAB0FyaXRoVHkAAAAAAAAAAgAAAAAAAAAKUmVmbGVjdGlvbgAAAAAAAAAITGFuZ3VhZ2U=",
                decor: ":type",
                docOverview: "",
                type: "Type",
                namespace: "Language.Reflection",
                ttTerm: "TEST",
              },
            },
          ],
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":browse-namespace")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a success sexp with no submodules.", () => {
    // Abbreviated result from ":browseNamespace "Prelude.Bool"
    const sexp = `(:return (:ok (() (("Bool : Type" ((0 4 ((:name "Prelude.Bool.Bool") (:implicit :False) (:key "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==") (:decor :type) (:doc-overview "Boolean Data Type") (:type "Type") (:namespace "Prelude.Bool"))) (7 4 ((:decor :type) (:type "Type") (:doc-overview "The type of types") (:name "Type"))) (7 4 ((:tt-term "AAAAAAAAAAAHAAAAAAAAAAASLi9QcmVsdWRlL0Jvb2wuaWRyAAAAAAAAABQ=")))))))) 2)`
    const payload: S_Exp.BrowseNamespaceOk = [
      ":ok",
      [
        [],
        [
          [
            "Bool : Type",
            [
              [
                0,
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
                7,
                4,
                [
                  [":decor", ":type"],
                  [":type", "Type"],
                  [":doc-overview", "The type of types"],
                  [":name", "Type"],
                ],
              ],
              [
                7,
                4,
                [
                  [
                    ":tt-term",
                    "AAAAAAAAAAAHAAAAAAAAAAASLi9QcmVsdWRlL0Jvb2wuaWRyAAAAAAAAABQ=",
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ]

    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.BrowseNamespace = {
      subModules: [],
      declarations: [
        {
          name: "Bool : Type",
          metadata: [
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
              start: 0,
            },
            {
              length: 4,
              metadata: {
                decor: ":type",
                docOverview: "The type of types",
                name: "Type",
                ttTerm: "TEST",
                type: "Type",
              },
              start: 7,
            },
          ],
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":browse-namespace")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "Invalid or empty namespace") 2)`
    const payload: S_Exp.BrowseNamespaceErr = [
      ":error",
      "Invalid or empty namespace",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.BrowseNamespace = {
      err: "Invalid or empty namespace",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":browse-namespace")
    assert.deepEqual(parsed, expected)
  })
})
