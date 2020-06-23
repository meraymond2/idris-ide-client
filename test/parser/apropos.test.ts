import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :apropos reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "\nPrelude.Bits.b8ToBinString : Bits8 -> String\nEncode Bits8 as an 8-character binary string.\n" ((1 26 ((:name "Prelude.Bits.b8ToBinString") (:implicit :False) (:key "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==") (:decor :function) (:doc-overview "Encode Bits8 as an 8-character binary string.") (:type "Bits8 -> String") (:namespace "Prelude.Bits"))) (30 5 ((:decor :type) (:type "Type") (:doc-overview "Eight bits (unsigned)") (:name "Bits8"))) (39 6 ((:decor :type) (:type "Type") (:doc-overview "Strings in some unspecified encoding") (:name "String"))))) 2)`
    const payload: S_Exp.AproposOk = [
      ":ok",
      "\nPrelude.Bits.b8ToBinString : Bits8 -> String\nEncode Bits8 as an 8-character binary string.\n",
      [
        [
          1,
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
          30,
          5,
          [
            [":decor", ":type"],
            [":type", "Type"],
            [":doc-overview", "Eight bits (unsigned)"],
            [":name", "Bits8"],
          ],
        ],
        [
          39,
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
    const expected: FinalReply.Apropos = {
      docs:
        "\nPrelude.Bits.b8ToBinString : Bits8 -> String\nEncode Bits8 as an 8-character binary string.\n",
      metadata: [
        {
          length: 26,
          metadata: {
            decor: ":function",
            docOverview: "Encode Bits8 as an 8-character binary string.",
            implicit: ":False",
            key:
              "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Bits.b8ToBinString",
            namespace: "Prelude.Bits",
            type: "Bits8 -> String",
          },
          start: 1,
        },
        {
          length: 5,
          metadata: {
            decor: ":type",
            docOverview: "Eight bits (unsigned)",
            name: "Bits8",
            type: "Type",
          },
          start: 30,
        },
        {
          length: 6,
          metadata: {
            decor: ":type",
            docOverview: "Strings in some unspecified encoding",
            name: "String",
            type: "Type",
          },
          start: 39,
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":apropos")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp.", () => {
    const sexp = `(:return (:error "No results found" ()) 2)`
    const payload: S_Exp.AproposErr = [":error", "No results found", []]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.Apropos = {
      err: "No results found",
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":apropos")
    assert.deepEqual(parsed, expected)
  })
})
