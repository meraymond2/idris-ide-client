import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :who-calls reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok ((("Example.Cat" ((0 11 ((:name "Example.Cat") (:implicit :False) (:key "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl") (:decor :type) (:doc-overview "") (:type "Type") (:namespace "Example"))))) (("Example.Cas" ((0 11 ((:name "Example.Cas") (:implicit :False) (:key "AQAAAAAAAAAAA0NhcwAAAAAAAAABAAAAAAAAAAdFeGFtcGxl") (:decor :data) (:doc-overview "") (:type "Cat") (:namespace "Example"))))) ("Example.Luna" ((0 12 ((:name "Example.Luna") (:implicit :False) (:key "AQAAAAAAAAAABEx1bmEAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==") (:decor :data) (:doc-overview "") (:type "Cat") (:namespace "Example"))))) ("Example.Sherlock" ((0 16 ((:name "Example.Sherlock") (:implicit :False) (:key "AQAAAAAAAAAACFNoZXJsb2NrAAAAAAAAAAEAAAAAAAAAB0V4YW1wbGU=") (:decor :data) (:doc-overview "") (:type "Cat") (:namespace "Example"))))) ("Example.f" ((0 9 ((:name "Example.f") (:implicit :False) (:key "AQAAAAAAAAAAAWYAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==") (:decor :metavar) (:doc-overview "") (:type "Cat -> String") (:namespace "Example"))))) ("Example.getName" ((0 15 ((:name "Example.getName") (:implicit :False) (:key "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==") (:decor :function) (:doc-overview "") (:type "Cat -> String") (:namespace "Example"))))))))) 2)`
    const payload: S_Exp.WhoCalls = [
      ":ok",
      [
        [
          [
            "Example.Cat",
            [
              [
                0,
                11,
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
            ],
          ],
          [
            [
              "Example.Cas",
              [
                [
                  0,
                  11,
                  [
                    [":name", "Example.Cas"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAAA0NhcwAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
                    ],
                    [":decor", ":data"],
                    [":doc-overview", ""],
                    [":type", "Cat"],
                    [":namespace", "Example"],
                  ],
                ],
              ],
            ],
            [
              "Example.Luna",
              [
                [
                  0,
                  12,
                  [
                    [":name", "Example.Luna"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAABEx1bmEAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                    ],
                    [":decor", ":data"],
                    [":doc-overview", ""],
                    [":type", "Cat"],
                    [":namespace", "Example"],
                  ],
                ],
              ],
            ],
            [
              "Example.Sherlock",
              [
                [
                  0,
                  16,
                  [
                    [":name", "Example.Sherlock"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAACFNoZXJsb2NrAAAAAAAAAAEAAAAAAAAAB0V4YW1wbGU=",
                    ],
                    [":decor", ":data"],
                    [":doc-overview", ""],
                    [":type", "Cat"],
                    [":namespace", "Example"],
                  ],
                ],
              ],
            ],
            [
              "Example.f",
              [
                [
                  0,
                  9,
                  [
                    [":name", "Example.f"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAAAWYAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                    ],
                    [":decor", ":metavar"],
                    [":doc-overview", ""],
                    [":type", "Cat -> String"],
                    [":namespace", "Example"],
                  ],
                ],
              ],
            ],
            [
              "Example.getName",
              [
                [
                  0,
                  15,
                  [
                    [":name", "Example.getName"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                    ],
                    [":decor", ":function"],
                    [":doc-overview", ""],
                    [":type", "Cat -> String"],
                    [":namespace", "Example"],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.WhoCalls = {
      callee: {
        metadata: [
          {
            length: 11,
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
        ],
        name: "Example.Cat",
      },
      references: [
        {
          metadata: [
            {
              length: 11,
              metadata: {
                decor: ":data",
                docOverview: "",
                implicit: ":False",
                key: "AQAAAAAAAAAAA0NhcwAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
                name: "Example.Cas",
                namespace: "Example",
                type: "Cat",
              },
              start: 0,
            },
          ],
          name: "Example.Cas",
        },
        {
          metadata: [
            {
              length: 12,
              metadata: {
                decor: ":data",
                docOverview: "",
                implicit: ":False",
                key: "AQAAAAAAAAAABEx1bmEAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                name: "Example.Luna",
                namespace: "Example",
                type: "Cat",
              },
              start: 0,
            },
          ],
          name: "Example.Luna",
        },
        {
          metadata: [
            {
              length: 16,
              metadata: {
                decor: ":data",
                docOverview: "",
                implicit: ":False",
                key: "AQAAAAAAAAAACFNoZXJsb2NrAAAAAAAAAAEAAAAAAAAAB0V4YW1wbGU=",
                name: "Example.Sherlock",
                namespace: "Example",
                type: "Cat",
              },
              start: 0,
            },
          ],
          name: "Example.Sherlock",
        },
        {
          metadata: [
            {
              length: 9,
              metadata: {
                decor: ":metavar",
                docOverview: "",
                implicit: ":False",
                key: "AQAAAAAAAAAAAWYAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                name: "Example.f",
                namespace: "Example",
                type: "Cat -> String",
              },
              start: 0,
            },
          ],
          name: "Example.f",
        },
        {
          metadata: [
            {
              length: 15,
              metadata: {
                decor: ":function",
                docOverview: "",
                implicit: ":False",
                key: "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                name: "Example.getName",
                namespace: "Example",
                type: "Cat -> String",
              },
              start: 0,
            },
          ],
          name: "Example.getName",
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }
    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)
    const parsed = parseReply(rootExpr, ":who-calls")
    assert.deepEqual(parsed, expected)
  })

  it("can parse an empty sexp.", () => {
    const sexp = `(:return (:ok ()) 2)`
    const payload: S_Exp.WhoCalls = [":ok", []]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.WhoCalls = {
      callee: null,
      references: [],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":who-calls")
    assert.deepEqual(parsed, expected)
  })
})
