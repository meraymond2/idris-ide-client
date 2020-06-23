import { assert } from "chai"
import { parseReply } from "../../src/parser"
import { deserialise } from "../../src/parser/expr-parser"
import { lex } from "../../src/parser/lexer"
import { RootExpr, S_Exp } from "../../src/s-exps"
import { FinalReply, InfoReply, OutputReply } from "../../src/reply"

describe("Parsing :load-file reply", () => {
  it("can parse the load-file source highlighting", () => {
    // client.loadFile("./test/resources/test.idr") it prepends the extra ./
    const sexp = `(:output (:ok (:highlight-source ((((:filename "././test/resources/test.idr") (:start 1 8) (:end 1 14)) ((:namespace "Example") (:decor :module) (:source-file "/home/michael/dev/idris-client/test/resources/test.idr")))))) 1)`
    const payload: S_Exp.Output = [
      ":ok",
      [
        ":highlight-source",
        [
          [
            [
              [":filename", "././test/resources/test.idr"],
              [":start", 1, 8],
              [":end", 1, 14],
            ],
            [
              [":namespace", "Example"],
              [":decor", ":module"],
              [
                ":source-file",
                "/home/michael/dev/idris-client/test/resources/test.idr",
              ],
            ],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":output", payload, 1]
    const expected: OutputReply = {
      ok: [
        {
          end: {
            column: 14,
            line: 1,
          },
          filename: "././test/resources/test.idr",
          metadata: {
            decor: ":module",
            namespace: "Example",
            sourceFile:
              "/home/michael/dev/idris-client/test/resources/test.idr",
          },
          start: {
            column: 8,
            line: 1,
          },
        },
      ],
      id: 1,
      type: ":output",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":load-file")
    assert.deepEqual(parsed, expected)
  })

  it("can parse the load-file compilation/type-checking log", () => {
    const sexp = `(:write-string "Type checking ././test/resources/test.idr" 1)`
    const payload: S_Exp.WriteString =
      "Type checking ././test/resources/test.idr"
    const rootExpr: RootExpr = [":write-string", payload, 1]
    const expected: InfoReply.WriteString = {
      message: "Type checking ././test/resources/test.idr",
      id: 1,
      type: ":write-string",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":load-file")
    assert.deepEqual(parsed, expected)
  })

  it("can parse the load-file set-prompt log", () => {
    const sexp = `(:set-prompt "*./test/resources/test" 1)`
    const payload: S_Exp.SetPrompt = "*./test/resources/test"
    const rootExpr: RootExpr = [":set-prompt", payload, 1]
    const expected: InfoReply.SetPrompt = {
      path: "*./test/resources/test",
      id: 1,
      type: ":set-prompt",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":load-file")
    assert.deepEqual(parsed, expected)
  })

  it("can parse the load-file success reply", () => {
    const sexp = `(:return (:ok ()) 1)`
    const payload: S_Exp.LoadFileOk = [":ok", []]
    const rootExpr: RootExpr = [":return", payload, 1]
    const expected: FinalReply.LoadFile = {
      ok: true,
      id: 1,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":load-file")
    assert.deepEqual(parsed, expected)
  })

  it("can parse the load-file failed compilation warning", () => {
    const sexp = `(:warning ("././test/resources/test.idr" (10 1) (10 13) "When checking left hand side of getName:\n    When checking argument cat to Example.getName:\n            Tiger is not a valid name for a pattern variable" ((32 7 ((:name "Example.getName") (:implicit :False) (:key "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==") (:decor :metavar) (:doc-overview "") (:type "Cat -> String") (:namespace "Example"))) (64 3 ((:name "cat") (:decor :bound) (:implicit :False))) (71 15 ((:name "Example.getName") (:implicit :False) (:key "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==") (:decor :metavar) (:doc-overview "") (:type "Cat -> String") (:namespace "Example"))))) 1)`
    // const payload: S_Exp.Warning = [":ok", []]
    const payload: S_Exp.Warning = [
      "././test/resources/test.idr",
      [10, 1],
      [10, 13],
      "When checking left hand side of getName:\n    When checking argument cat to Example.getName:\n            Tiger is not a valid name for a pattern variable",
      [
        [
          32,
          7,
          [
            [":name", "Example.getName"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
            ],
            [":decor", ":metavar"],
            [":doc-overview", ""],
            [":type", "Cat -> String"],
            [":namespace", "Example"],
          ],
        ],
        [
          64,
          3,
          [
            [":name", "cat"],
            [":decor", ":bound"],
            [":implicit", ":False"],
          ],
        ],
        [
          71,
          15,
          [
            [":name", "Example.getName"],
            [":implicit", ":False"],
            [
              ":key",
              "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
            ],
            [":decor", ":metavar"],
            [":doc-overview", ""],
            [":type", "Cat -> String"],
            [":namespace", "Example"],
          ],
        ],
      ],
    ]
    const rootExpr: RootExpr = [":warning", payload, 1]
    const expected: InfoReply.Warning = {
      err: {
        end: {
          column: 13,
          line: 10,
        },
        filename: "././test/resources/test.idr",
        metadata: [
          {
            length: 7,
            metadata: {
              decor: ":metavar",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
              name: "Example.getName",
              namespace: "Example",
              type: "Cat -> String",
            },
            start: 32,
          },
          {
            length: 3,
            metadata: {
              decor: ":bound",
              implicit: ":False",
              name: "cat",
            },
            start: 64,
          },
          {
            length: 15,
            metadata: {
              decor: ":metavar",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
              name: "Example.getName",
              namespace: "Example",
              type: "Cat -> String",
            },
            start: 71,
          },
        ],
        start: {
          column: 1,
          line: 10,
        },
        warning:
          "When checking left hand side of getName:\n    When checking argument cat to Example.getName:\n            Tiger is not a valid name for a pattern variable",
      },
      id: 1,
      type: ":warning",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":load-file")
    assert.deepEqual(parsed, expected)
  })

  it("can parse the load-file failure", () => {
    const sexp = `(:return (:error "didn't load ./test/resources/test.idr") 1)`
    const payload: S_Exp.LoadFileErr = [
      ":error",
      "didn't load ./test/resources/test.idr",
    ]
    const rootExpr: RootExpr = [":return", payload, 1]
    const expected: FinalReply.LoadFile = {
      err: "didn't load ./test/resources/test.idr",
      id: 1,
      ok: false,
      type: ":return",
    }

    const tokens = lex(sexp)
    const exprs = deserialise(tokens)[0] as RootExpr
    assert.deepEqual(exprs, rootExpr)

    const parsed = parseReply(rootExpr, ":load-file")
    assert.deepEqual(parsed, expected)
  })
})
