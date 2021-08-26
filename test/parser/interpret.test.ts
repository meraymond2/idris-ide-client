import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"
import { FinalReply, OutputReply } from "../../src/reply"

describe("Parsing :interpret reply", () => {
  it("can parse the interpret source output of `2 * 2`", () => {
    const sexp = `(:output (:ok (:highlight-source ((((:filename "(input)") (:start 1 1) (:end 1 1)) ((:name "Prelude.Interfaces.fromInteger") (:implicit :False) (:key "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=") (:decor :function) (:doc-overview "Conversion from Integer.") (:type "Num ty => Integer -> ty") (:namespace "Prelude.Interfaces"))) (((:filename "(input)") (:start 1 3) (:end 1 3)) ((:name "Prelude.Interfaces.*") (:implicit :False) (:key "AQAAAAAAAAAAASoAAAAAAAAAAgAAAAAAAAAKSW50ZXJmYWNlcwAAAAAAAAAHUHJlbHVkZQ==") (:decor :function) (:doc-overview "") (:type "Num ty => ty -> ty -> ty") (:namespace "Prelude.Interfaces"))) (((:filename "(input)") (:start 1 5) (:end 1 5)) ((:name "Prelude.Interfaces.fromInteger") (:implicit :False) (:key "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=") (:decor :function) (:doc-overview "Conversion from Integer.") (:type "Num ty => Integer -> ty") (:namespace "Prelude.Interfaces")))))) 2)`
    const payload: S_Exp.Output = [
      ":ok",
      [
        ":highlight-source",
        [
          [
            [
              [":filename", "(input)"],
              [":start", 1, 1],
              [":end", 1, 1],
            ],
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
          [
            [
              [":filename", "(input)"],
              [":start", 1, 3],
              [":end", 1, 3],
            ],
            [
              [":name", "Prelude.Interfaces.*"],
              [":implicit", ":False"],
              [
                ":key",
                "AQAAAAAAAAAAASoAAAAAAAAAAgAAAAAAAAAKSW50ZXJmYWNlcwAAAAAAAAAHUHJlbHVkZQ==",
              ],
              [":decor", ":function"],
              [":doc-overview", ""],
              [":type", "Num ty => ty -> ty -> ty"],
              [":namespace", "Prelude.Interfaces"],
            ],
          ],
          [
            [
              [":filename", "(input)"],
              [":start", 1, 5],
              [":end", 1, 5],
            ],
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
    ]
    const rootExpr: RootExpr = [":output", payload, 2]
    const expected: OutputReply = {
      ok: [
        {
          end: {
            column: 1,
            line: 1,
          },
          filename: "(input)",
          metadata: {
            decor: ":function",
            docOverview: "Conversion from Integer.",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=",
            name: "Prelude.Interfaces.fromInteger",
            namespace: "Prelude.Interfaces",
            type: "Num ty => Integer -> ty",
          },
          start: {
            column: 1,
            line: 1,
          },
        },
        {
          end: {
            column: 3,
            line: 1,
          },
          filename: "(input)",
          metadata: {
            decor: ":function",
            docOverview: "",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAASoAAAAAAAAAAgAAAAAAAAAKSW50ZXJmYWNlcwAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Interfaces.*",
            namespace: "Prelude.Interfaces",
            type: "Num ty => ty -> ty -> ty",
          },
          start: {
            column: 3,
            line: 1,
          },
        },
        {
          end: {
            column: 5,
            line: 1,
          },
          filename: "(input)",
          metadata: {
            decor: ":function",
            docOverview: "Conversion from Integer.",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=",
            name: "Prelude.Interfaces.fromInteger",
            namespace: "Prelude.Interfaces",
            type: "Num ty => Integer -> ty",
          },
          start: {
            column: 5,
            line: 1,
          },
        },
      ],
      id: 2,
      type: ":output",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":interpret")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a success sexp.", () => {
    const sexp = `(:return (:ok "4 : Integer" ((0 1 ((:decor :data) (:type "Integer") (:doc-overview "An arbitrary-precision integer") (:name "4"))) (0 1 ((:tt-term "AAAAAAAAAAAEAQAAAAAE"))) (4 7 ((:decor :type) (:type "Type") (:doc-overview "Arbitrary-precision integers") (:name "Integer"))) (4 7 ((:tt-term "AAAAAAAAAAAECg=="))))) 2)`
    const payload: S_Exp.InterpretOk = [
      ":ok",
      "4 : Integer",
      [
        [
          0,
          1,
          [
            [":decor", ":data"],
            [":type", "Integer"],
            [":doc-overview", "An arbitrary-precision integer"],
            [":name", "4"],
          ],
        ],
        [0, 1, [[":tt-term", "AAAAAAAAAAAEAQAAAAAE"]]],
        [
          4,
          7,
          [
            [":decor", ":type"],
            [":type", "Type"],
            [":doc-overview", "Arbitrary-precision integers"],
            [":name", "Integer"],
          ],
        ],
        [4, 7, [[":tt-term", "AAAAAAAAAAAECg=="]]],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.Interpret = {
      result: "4 : Integer",
      metadata: [
        {
          length: 1,
          metadata: {
            decor: ":data",
            docOverview: "An arbitrary-precision integer",
            name: "4",
            ttTerm: "AAAAAAAAAAAEAQAAAAAE",
            type: "Integer",
          },
          start: 0,
        },
        {
          length: 7,
          metadata: {
            decor: ":type",
            docOverview: "Arbitrary-precision integers",
            name: "Integer",
            ttTerm: "AAAAAAAAAAAECg==",
            type: "Type",
          },
          start: 4,
        },
      ],
      id: 2,
      ok: true,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":interpret")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp with metadata.", () => {
    const sexp = `(:return (:error "When checking an application of function Prelude.Interfaces.*:\n        No such variable cas" ((41 20 ((:name "Prelude.Interfaces.*") (:implicit :False) (:key "AQAAAAAAAAAAASoAAAAAAAAAAgAAAAAAAAAKSW50ZXJmYWNlcwAAAAAAAAAHUHJlbHVkZQ==") (:decor :function) (:doc-overview "") (:type "Num ty => ty -> ty -> ty") (:namespace "Prelude.Interfaces"))) (88 3 ((:name "cas") (:implicit :False) (:key "AAAAAAAAAAADY2Fz"))))) 2)`
    const payload: S_Exp.InterpretErr = [
      ":error",
      "When checking an application of function Prelude.Interfaces.*:\n        No such variable cas",
      [
        [
          41,
          20,
          [
            [":name", "Prelude.Interfaces.*"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAAASoAAAAAAAAAAgAAAAAAAAAKSW50ZXJmYWNlcwAAAAAAAAAHUHJlbHVkZQ==",
            ],
            [":decor", ":function"],
            [":doc-overview", ""],
            [":type", "Num ty => ty -> ty -> ty"],
            [":namespace", "Prelude.Interfaces"],
          ],
        ],
        [
          88,
          3,
          [
            [":name", "cas"],
            [":implicit", ":False"],
            [":key", "AAAAAAAAAAADY2Fz"],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":return", payload, 2]
    const expected: FinalReply.Interpret = {
      err:
        "When checking an application of function Prelude.Interfaces.*:\n        No such variable cas",
      metadata: [
        {
          length: 20,
          metadata: {
            decor: ":function",
            docOverview: "",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAASoAAAAAAAAAAgAAAAAAAAAKSW50ZXJmYWNlcwAAAAAAAAAHUHJlbHVkZQ==",
            name: "Prelude.Interfaces.*",
            namespace: "Prelude.Interfaces",
            type: "Num ty => ty -> ty -> ty",
          },
          start: 41,
        },
        {
          length: 3,
          metadata: {
            implicit: ":False",
            key: "AAAAAAAAAAADY2Fz",
            name: "cas",
          },
          start: 88,
        },
      ],
      id: 2,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":interpret")
    assert.deepEqual(parsed, expected)
  })

  it("can parse a failure sexp without metadata.", () => {
    const sexp = `(:return (:error "(input):1:1:\n  |\n1 | -----\n  | ^^^^^\nunexpected \\"-----\\"\nexpecting ':', dependent type signature, or end of input\n") 3)`
    const payload: S_Exp.InterpretErr = [
      ":error",
      `(input):1:1:\n  |\n1 | -----\n  | ^^^^^\nunexpected "-----"\nexpecting ':', dependent type signature, or end of input\n`,
    ]
    const rootExpr: RootExpr = [":return", payload, 3]
    const expected: FinalReply.Interpret = {
      err: `(input):1:1:\n  |\n1 | -----\n  | ^^^^^\nunexpected "-----"\nexpecting ':', dependent type signature, or end of input\n`,
      metadata: [],
      id: 3,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":interpret")
    assert.deepEqual(parsed, expected)
  })
})
