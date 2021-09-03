import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :metavariables reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok (("Example.f" () ("Cat -> String" ((0 3 ((:name "Example.Cat") (:implicit :False) (:key "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl") (:decor :type) (:doc-overview "") (:type "Type") (:namespace "Example"))) (7 6 ((:decor :type) (:type "Type") (:doc-overview "Strings in some unspecified encoding") (:name "String"))) (0 13 ((:tt-term "AAAAAAAAAAACAAAAAAAAAAADY2F0AQIAAAMAAAAAAAAACAAAAAAAAAAAAQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxlBwAAAAAAAAAAGy4vLi90ZXN0L3Jlc291cmNlcy90ZXN0LmlkcgAAAAAAAAAXBA0=")))))) ("Example.g_rhs" (("n" "Nat" ((0 3 ((:name "Prelude.Nat.Nat") (:implicit :False) (:key "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=") (:decor :type) (:doc-overview "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.") (:type "Type") (:namespace "Prelude.Nat"))) (0 3 ((:tt-term "AAAAAAAAAAAAAwAAAAAAAAAIAAAAAAAAAAABAAAAAAAAAAADTmF0AAAAAAAAAAIAAAAAAAAAA05hdAAAAAAAAAAHUHJlbHVkZQ=="))))) ("b" "Bool" ((0 4 ((:name "Prelude.Bool.Bool") (:implicit :False) (:key "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==") (:decor :type) (:doc-overview "Boolean Data Type") (:type "Type") (:namespace "Prelude.Bool"))) (0 4 ((:tt-term "AAAAAAAAAAEAAAAAAAAAAAFuAAADAAAAAAAAAAgAAAAAAAAAAAEAAAAAAAAAAARCb29sAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=")))))) ("String" ((0 6 ((:decor :type) (:type "Type") (:doc-overview "Strings in some unspecified encoding") (:name "String"))) (0 6 ((:tt-term "AAAAAAAAAAIAAAAAAAAAAAFuAAAAAAAAAAAAAWIABA0=")))))))) 2)`
    const payload: S_Exp.Metavariables = [
      ":ok",
      [
        [
          "Example.f",
          [],
          [
            "Cat -> String",
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
                7,
                6,
                [
                  [":decor", ":type"],
                  [":type", "Type"],
                  [":doc-overview", "Strings in some unspecified encoding"],
                  [":name", "String"],
                ],
              ],
              [
                0,
                13,
                [
                  [
                    ":tt-term",
                    "AAAAAAAAAAACAAAAAAAAAAADY2F0AQIAAAMAAAAAAAAACAAAAAAAAAAAAQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxlBwAAAAAAAAAAGy4vLi90ZXN0L3Jlc291cmNlcy90ZXN0LmlkcgAAAAAAAAAXBA0=",
                  ],
                ],
              ],
            ],
          ],
        ],
        [
          "Example.g_rhs",
          [
            [
              "n",
              "Nat",
              [
                [
                  0,
                  3,
                  [
                    [":name", "Prelude.Nat.Nat"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
                    ],
                    [":decor", ":type"],
                    [
                      ":doc-overview",
                      "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.",
                    ],
                    [":type", "Type"],
                    [":namespace", "Prelude.Nat"],
                  ],
                ],
                [
                  0,
                  3,
                  [
                    [
                      ":tt-term",
                      "AAAAAAAAAAAAAwAAAAAAAAAIAAAAAAAAAAABAAAAAAAAAAADTmF0AAAAAAAAAAIAAAAAAAAAA05hdAAAAAAAAAAHUHJlbHVkZQ==",
                    ],
                  ],
                ],
              ],
            ],
            [
              "b",
              "Bool",
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
                  0,
                  4,
                  [
                    [
                      ":tt-term",
                      "AAAAAAAAAAEAAAAAAAAAAAFuAAADAAAAAAAAAAgAAAAAAAAAAAEAAAAAAAAAAARCb29sAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=",
                    ],
                  ],
                ],
              ],
            ],
          ],
          [
            "String",
            [
              [
                0,
                6,
                [
                  [":decor", ":type"],
                  [":type", "Type"],
                  [":doc-overview", "Strings in some unspecified encoding"],
                  [":name", "String"],
                ],
              ],
              [
                0,
                6,
                [[":tt-term", "AAAAAAAAAAIAAAAAAAAAAAFuAAAAAAAAAAAAAWIABA0="]],
              ],
            ],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.Metavariables = {
      metavariables: [
        {
          metavariable: {
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
                length: 6,
                metadata: {
                  decor: ":type",
                  docOverview: "Strings in some unspecified encoding",
                  name: "String",
                  type: "Type",
                },
                start: 7,
              },
              {
                length: 13,
                metadata: {
                  ttTerm:
                    "AAAAAAAAAAACAAAAAAAAAAADY2F0AQIAAAMAAAAAAAAACAAAAAAAAAAAAQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxlBwAAAAAAAAAAGy4vLi90ZXN0L3Jlc291cmNlcy90ZXN0LmlkcgAAAAAAAAAXBA0=",
                },
                start: 0,
              },
            ],
            name: "Example.f",
            type: "Cat -> String",
          },
          premises: [],
        },
        {
          metavariable: {
            metadata: [
              {
                length: 6,
                metadata: {
                  decor: ":type",
                  docOverview: "Strings in some unspecified encoding",
                  name: "String",
                  ttTerm: "AAAAAAAAAAIAAAAAAAAAAAFuAAAAAAAAAAAAAWIABA0=",
                  type: "Type",
                },
                start: 0,
              },
            ],
            name: "Example.g_rhs",
            type: "String",
          },
          premises: [
            {
              metadata: [
                {
                  length: 3,
                  metadata: {
                    decor: ":type",
                    docOverview:
                      "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.",
                    implicit: ":False",
                    key: "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
                    name: "Prelude.Nat.Nat",
                    namespace: "Prelude.Nat",
                    ttTerm:
                      "AAAAAAAAAAAAAwAAAAAAAAAIAAAAAAAAAAABAAAAAAAAAAADTmF0AAAAAAAAAAIAAAAAAAAAA05hdAAAAAAAAAAHUHJlbHVkZQ==",
                    type: "Type",
                  },
                  start: 0,
                },
              ],
              name: "n",
              type: "Nat",
            },
            {
              metadata: [
                {
                  length: 4,
                  metadata: {
                    decor: ":type",
                    docOverview: "Boolean Data Type",
                    implicit: ":False",
                    key: "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
                    name: "Prelude.Bool.Bool",
                    namespace: "Prelude.Bool",
                    ttTerm:
                      "AAAAAAAAAAEAAAAAAAAAAAFuAAADAAAAAAAAAAgAAAAAAAAAAAEAAAAAAAAAAARCb29sAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=",
                    type: "Type",
                  },
                  start: 0,
                },
              ],
              name: "b",
              type: "Bool",
            },
          ],
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":metavariables")
    assert.deepEqual(parsed, expected)
  })
})
