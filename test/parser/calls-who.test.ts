import { assert } from "chai"
import { parse, parseReply } from "../../src/parser"
import { FinalReply } from "../../src/reply"
import { TokenIter } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"

describe("Parsing :calls-who reply", () => {
  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok ((("Example.plusTwo" ((0 15 ((:name "Example.plusTwo") (:implicit :False) (:key "AQAAAAAAAAAAB3BsdXNUd28AAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==") (:decor :function) (:doc-overview "") (:type "Nat -> Nat") (:namespace "Example"))))) (("Prelude.Nat.Nat" ((0 15 ((:name "Prelude.Nat.Nat") (:implicit :False) (:key "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=") (:decor :type) (:doc-overview "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.") (:type "Type") (:namespace "Prelude.Nat"))))) ("Prelude.Nat.plus" ((0 16 ((:name "Prelude.Nat.plus") (:implicit :False) (:key "AQAAAAAAAAAABHBsdXMAAAAAAAAAAgAAAAAAAAADTmF0AAAAAAAAAAdQcmVsdWRl") (:decor :function) (:doc-overview "Add two natural numbers.") (:type "Nat -> Nat -> Nat") (:namespace "Prelude.Nat"))))) ("Prelude.Interfaces.fromInteger" ((0 30 ((:name "Prelude.Interfaces.fromInteger") (:implicit :False) (:key "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=") (:decor :function) (:doc-overview "Conversion from Integer.") (:type "Num ty => Integer -> ty") (:namespace "Prelude.Interfaces"))))) ("Prelude.Nat.Nat implementation of Prelude.Interfaces.Num" ((0 56 ((:name "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num") (:implicit :False) (:key "AQMCAQAAAAAAAAAAA051bQAAAAAAAAACAAAAAAAAAApJbnRlcmZhY2VzAAAAAAAAAAdQcmVsdWRlAAAAAAAAAAEAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=") (:decor :function) (:doc-overview "") (:type "Num Nat") (:namespace "Prelude.Nat"))))))))) 2)`
    const payload: S_Exp.CallsWho = [
      ":ok",
      [
        [
          [
            "Example.plusTwo",
            [
              [
                0,
                15,
                [
                  [":name", "Example.plusTwo"],
                  [":implicit", ":False"],
                  [
                    ":key",
                    "AQAAAAAAAAAAB3BsdXNUd28AAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
                  ],
                  [":decor", ":function"],
                  [":doc-overview", ""],
                  [":type", "Nat -> Nat"],
                  [":namespace", "Example"],
                ],
              ],
            ],
          ],
          [
            [
              "Prelude.Nat.Nat",
              [
                [
                  0,
                  15,
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
              ],
            ],
            [
              "Prelude.Nat.plus",
              [
                [
                  0,
                  16,
                  [
                    [":name", "Prelude.Nat.plus"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAABHBsdXMAAAAAAAAAAgAAAAAAAAADTmF0AAAAAAAAAAdQcmVsdWRl",
                    ],
                    [":decor", ":function"],
                    [":doc-overview", "Add two natural numbers."],
                    [":type", "Nat -> Nat -> Nat"],
                    [":namespace", "Prelude.Nat"],
                  ],
                ],
              ],
            ],
            [
              "Prelude.Interfaces.fromInteger",
              [
                [
                  0,
                  30,
                  [
                    [":name", "Prelude.Interfaces.fromInteger"],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=",
                    ],
                    [":decor", ":function"],
                    [":doc-overview", "Conversion from Integer."],
                    [":type", "Num ty => Integer -> ty"],
                    [":namespace", "Prelude.Interfaces"],
                  ],
                ],
              ],
            ],
            [
              "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num",
              [
                [
                  0,
                  56,
                  [
                    [
                      ":name",
                      "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num",
                    ],
                    [":implicit", ":False"],
                    [
                      ":key",
                      "AQMCAQAAAAAAAAAAA051bQAAAAAAAAACAAAAAAAAAApJbnRlcmZhY2VzAAAAAAAAAAdQcmVsdWRlAAAAAAAAAAEAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
                    ],
                    [":decor", ":function"],
                    [":doc-overview", ""],
                    [":type", "Num Nat"],
                    [":namespace", "Prelude.Nat"],
                  ],
                ],
              ],
            ],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.CallsWho = {
      caller: {
        name: "Example.plusTwo",
        metadata: [
          {
            start: 0,
            length: 15,
            metadata: {
              name: "Example.plusTwo",
              implicit: ":False",
              key: "AQAAAAAAAAAAB3BsdXNUd28AAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
              decor: ":function",
              docOverview: "",
              type: "Nat -> Nat",
              namespace: "Example",
            },
          },
        ],
      },
      references: [
        {
          name: "Prelude.Nat.Nat",
          metadata: [
            {
              start: 0,
              length: 15,
              metadata: {
                name: "Prelude.Nat.Nat",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
                decor: ":type",
                docOverview:
                  "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.",
                type: "Type",
                namespace: "Prelude.Nat",
              },
            },
          ],
        },
        {
          name: "Prelude.Nat.plus",
          metadata: [
            {
              start: 0,
              length: 16,
              metadata: {
                name: "Prelude.Nat.plus",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAABHBsdXMAAAAAAAAAAgAAAAAAAAADTmF0AAAAAAAAAAdQcmVsdWRl",
                decor: ":function",
                docOverview: "Add two natural numbers.",
                type: "Nat -> Nat -> Nat",
                namespace: "Prelude.Nat",
              },
            },
          ],
        },
        {
          name: "Prelude.Interfaces.fromInteger",
          metadata: [
            {
              start: 0,
              length: 30,
              metadata: {
                name: "Prelude.Interfaces.fromInteger",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=",
                decor: ":function",
                docOverview: "Conversion from Integer.",
                type: "Num ty => Integer -> ty",
                namespace: "Prelude.Interfaces",
              },
            },
          ],
        },
        {
          name: "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num",
          metadata: [
            {
              start: 0,
              length: 56,
              metadata: {
                name:
                  "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num",
                implicit: ":False",
                key:
                  "AQMCAQAAAAAAAAAAA051bQAAAAAAAAACAAAAAAAAAApJbnRlcmZhY2VzAAAAAAAAAAdQcmVsdWRlAAAAAAAAAAEAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
                decor: ":function",
                docOverview: "",
                type: "Num Nat",
                namespace: "Prelude.Nat",
              },
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

    const parsed = parseReply(rootExpr, ":calls-who")
    assert.deepEqual(parsed, expected)
  })

  it("can parse an empty sexp.", () => {
    const sexp = `(:return (:ok ()) 2)`
    const payload: S_Exp.CallsWho = [":ok", []]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.CallsWho = {
      caller: null,
      references: [],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = new TokenIter(sexp)
    const exprs = parse(tokens) as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":calls-who")
    assert.deepEqual(parsed, expected)
  })
})
