import { assert } from "chai"
import { IdrisClient } from "../../src/client"
import * as expected from "./expected"
import { spawn, ChildProcess } from "child_process"
import { FinalReply } from "../../src/reply"

// These tests are order dependent, which is ugly, but the alternative is
// stopping and re-starting the client between each one, which would add seconds
// to each test. If it becomes an issue in the future, it can be changed.
describe("Running the client commands", () => {
  let ic: IdrisClient
  let proc: ChildProcess

  before(async () => {
    proc = spawn("idris2", ["--ide-mode"])
    if (proc.stdin && proc.stdout) {
      ic = new IdrisClient(proc.stdin, proc.stdout, { debug: true })
    }
  })

  it("returns the expected result for :load-file", async () => {
    const actual = await ic.loadFile("./test/resources/test-v2.idr")
    assert.deepEqual(actual, expected.loadFile)
  }).timeout(10000)

  it("returns the expected result for :add-clause.", async () => {
    const actual = await ic.addClause("f", 5)
    assert.deepEqual(actual, expected.addClause)
  })

  // TODO: UNIMPLEMENTED
  // (:write-string "add-missing: command not yet implemented. Hopefully soon!" 3)
  // Also, how will this work if it won’t load the file with missing cases?
  it("returns the expected result for :add-missing.", async () => {
    const actual = await ic.addMissing("getName", 7)
    const unimplemented: FinalReply.AddMissing = {
      id: 3,
      missingClauses: "",
      ok: true,
      type: ":return",
    }
    assert.deepEqual(actual, unimplemented)
  })

  // TODO: UNIMPLEMENTED
  // (:write-string "apropros: command not yet implemented. Hopefully soon!" 4)
  it("returns the expected result for :apropos.", async () => {
    const unimplemented: FinalReply.Apropos = {
      docs: "",
      id: 4,
      metadata: [],
      ok: true,
      type: ":return",
    }
    const actual = await ic.apropos("plus")
    assert.deepEqual(actual, unimplemented)
  })

  // TODO: UNIMPLEMENTED
  // (:write-string "browse-namespace: command not yet implemented. Hopefully soon!" 3)
  it("returns the expected result for :browse-namespace.", async () => {
    const actual = await ic.browseNamespace("Language.Reflection")
    const unimplemented: FinalReply.BrowseNamespace = {
      declarations: [],
      id: 5,
      ok: true,
      subModules: [],
      type: ":return",
    }
    if (actual.ok) actual.declarations = actual.declarations.slice(0, 1)
    assert.deepEqual(actual, unimplemented)
  })

  // TODO: UNIMPLEMENTED
  // (:write-string "calls-who: command not yet implemented. Hopefully soon!" 6)
  it("returns the expected result for :calls-who.", async () => {
    const actual = await ic.callsWho("plusTwo")
    const unimplemented: FinalReply.CallsWho = {
      caller: null,
      id: 6,
      ok: true,
      references: [],
      type: ":return",
    }
    assert.deepEqual(actual, unimplemented)
  })

  // TODO: can’t get to work. It looks like V2 has an optional column parameter,
  // but adding it didn’t seem to make a difference.
  it("returns the expected result for :case-split", async () => {
    const actual = await ic.caseSplit("n", 13)
    assert.deepEqual(actual, expected.caseSplit)
  })

  // it("returns the expected result for :docs-for", async () => {
  //   const actual = await ic.docsFor("b8ToBinString", ":full")
  //   assert.deepEqual(actual, expected.docsFor)
  // })

  // it("returns the expected result for :interpret", async () => {
  //   const actual = await ic.interpret("2 * 2")
  //   assert.deepEqual(actual, expected.interpret)
  // })

  // it("returns the expected result for :make-case", async () => {
  //   const actual = await ic.makeCase("g_rhs", 15)
  //   assert.deepEqual(actual, expected.makeCase)
  // })

  // it("returns the expected result for :make-lemma", async () => {
  //   const actual = await ic.makeLemma("g_rhs", 15)
  //   assert.deepEqual(actual, expected.makeLemma)
  // })

  // it("returns the expected result for :make-with", async () => {
  //   const actual = await ic.makeWith("g_rhs", 15)
  //   assert.deepEqual(actual, expected.makeWith)
  // })

  // it("returns the expected result for :metavariables", async () => {
  //   const actual = await ic.metavariables(80)
  //   assert.deepEqual(actual, expected.metavariables)
  // })

  // it("returns the expected result for :print-definition", async () => {
  //   const actual = await ic.printDefinition("Bool")
  //   assert.deepEqual(actual, expected.printDefinition)
  // })

  // it("returns the expected result for :proof-search", async () => {
  //   const actual = await ic.proofSearch("n_rhs", 18, [])
  //   assert.deepEqual(actual, expected.proofSearch)
  // })

  // it("returns the expected result for :repl-completions", async () => {
  //   const actual = await ic.replCompletions("get")
  //   assert.deepEqual(actual, expected.replCompletions)
  // })

  // it("returns the expected result for :type-of", async () => {
  //   const actual = await ic.typeOf("Cat")
  //   assert.deepEqual(actual, expected.typeOf)
  // })

  // it("returns the expected result for :version", async () => {
  //   const actual = await ic.version()
  //   // We don’t want to tie the test to an actual version.
  //   assert.isTrue(actual.ok)
  // })

  // it("returns the expected result for :who-calls", async () => {
  //   const actual = await ic.whoCalls("Cat")
  //   assert.deepEqual(actual, expected.whoCalls)
  // })

  after(async () => {
    // proc.kill()
  })
})
