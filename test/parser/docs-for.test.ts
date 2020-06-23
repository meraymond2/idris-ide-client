import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"
import { FinalReply } from "../../src/reply"

describe("Parsing :case-split reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "Prelude.Bits.b8ToBinString : Bits8 -> String\n    Encode Bits8 as an 8-character binary string.\n    \n    The function is: Total & public export" ((0 26 ((:name "Prelude.Bits.b8ToBinString") (:implicit :False) (:key "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==") (:decor :function) (:doc-overview "Encode Bits8 as an 8-character binary string.") (:type "Bits8 -> String") (:namespace "Prelude.Bits"))) (29 5 ((:decor :type) (:type "Type") (:doc-overview "Eight bits (unsigned)") (:name "Bits8"))) (38 6 ((:decor :type) (:type "Type") (:doc-overview "Strings in some unspecified encoding") (:name "String"))))) 2)`
    const payload: S_Exp.DocsForOk = [
      ":ok",
      "Prelude.Bits.b8ToBinString : Bits8 -> String\n    Encode Bits8 as an 8-character binary string.\n    \n    The function is: Total & public export",
      [
        [
          0,
          26,
          [
            [":name", "Prelude.Bits.b8ToBinString"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==",
            ],
            [":decor", ":function"],
            [":doc-overview", "Encode Bits8 as an 8-character binary string."],
            [":type", "Bits8 -> String"],
            [":namespace", "Prelude.Bits"],
          ],
        ],
        [
          29,
          5,
          [
            [":decor", ":type"],
            [":type", "Type"],
            [":doc-overview", "Eight bits (unsigned)"],
            [":name", "Bits8"],
          ],
        ],
        [
          38,
          6,
          [
            [":decor", ":type"],
            [":type", "Type"],
            [":doc-overview", "Strings in some unspecified encoding"],
            [":name", "String"],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.DocsFor = {
      docs:
        "Prelude.Bits.b8ToBinString : Bits8 -> String\n    Encode Bits8 as an 8-character binary string.\n    \n    The function is: Total & public export",
      metadata: [
        {
          start: 0,
          length: 26,
          metadata: {
            name: "Prelude.Bits.b8ToBinString",
            implicit: ":False",
            key:
              "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==",
            decor: ":function",
            docOverview: "Encode Bits8 as an 8-character binary string.",
            type: "Bits8 -> String",
            namespace: "Prelude.Bits",
          },
        },
        {
          start: 29,
          length: 5,
          metadata: {
            decor: ":type",
            type: "Type",
            docOverview: "Eight bits (unsigned)",
            name: "Bits8",
          },
        },
        {
          start: 38,
          length: 6,
          metadata: {
            decor: ":type",
            type: "Type",
            docOverview: "Strings in some unspecified encoding",
            name: "String",
          },
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":docs-for")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "No documentation for Blue Notebook #10") 2)`
    const payload: S_Exp.DocsForErr = [
      ":error",
      "No documentation for Blue Notebook #10",
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.DocsFor = {
      err: "No documentation for Blue Notebook #10",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":docs-for")
    assert.deepEqual(parsed, expected)
  })
})
