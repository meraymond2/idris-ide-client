import { assert } from "chai"
import { IdrisClient } from "../../src/client"
import * as expected from "./expected"
import { spawn, ChildProcess } from "child_process"
import { testTT } from "./helpers"

// These tests are order dependent, which is ugly, but the alternative is
// stopping and re-starting the client between each one, which would add seconds
// to each test. If it becomes an issue in the future, it can be changed.
describe("Running the client commands", () => {
  let ic: IdrisClient
  let proc: ChildProcess

  before(async () => {
    proc = spawn("idris", ["--ide-mode"])
    if (proc.stdin && proc.stdout) {
      ic = new IdrisClient(proc.stdin, proc.stdout)
    }
  })

  it("returns the expected result for :load-file", async () => {
    const actual = await ic.loadFile("./test/resources/test.idr")
    assert.deepEqual(actual, expected.loadFileV1)
  }).timeout(10000)

  it("returns the expected result for :add-clause.", async () => {
    const actual = await ic.addClause("f", 5)
    assert.deepEqual(actual, expected.addClause)
  })

  it("returns the expected result for :add-missing.", async () => {
    const actual = await ic.addMissing("getName", 7)
    assert.deepEqual(actual, expected.addMissing)
  })

  it("returns the expected result for :apropos.", async () => {
    const actual = await ic.apropos("b8ToBinString")
    assert.deepEqual(actual, expected.apropos)
  })

  it("returns the expected result for :browse-namespace.", async () => {
    const actual = await ic.browseNamespace("Language.Reflection")
    // The metadata for an actual namespace is too long to read if the test fails.
    if (actual.ok) {
      actual.declarations = actual.declarations.slice(0, 1)
      actual.declarations.forEach((decl) => {
        decl.metadata = testTT(decl.metadata)
      })
    }
    assert.deepEqual(actual, expected.browseNamespace)
  })

  it("returns the expected result for :calls-who.", async () => {
    const actual = await ic.callsWho("plusTwo")
    assert.deepEqual(actual, expected.callsWho)
  })

  it("returns the expected result for :case-split", async () => {
    const actual = await ic.caseSplit("n", 12)
    assert.deepEqual(actual, expected.caseSplit)
  })

  it("returns the expected result for :docs-for", async () => {
    const actual = await ic.docsFor("b8ToBinString", ":full")
    assert.deepEqual(actual, expected.docsFor)
  })

  it("returns the expected result for :interpret", async () => {
    const actual = await ic.interpret("2 * 2")
    if (actual.ok) actual.metadata = testTT(actual.metadata)
    assert.deepEqual(actual, expected.interpret)
  })

  it("returns the expected result for :make-case", async () => {
    const actual = await ic.makeCase("g_rhs", 15)
    assert.deepEqual(actual, expected.makeCase)
  })

  it("returns the expected result for :make-lemma", async () => {
    const actual = await ic.makeLemma("g_rhs", 15)
    assert.deepEqual(actual, expected.makeLemma)
  })

  it("returns the expected result for :make-with", async () => {
    const actual = await ic.makeWith("g_rhs", 15)
    assert.deepEqual(actual, expected.makeWith)
  })

  it("returns the expected result for :metavariables", async () => {
    const actual = await ic.metavariables(80)
    if (actual.ok) {
      actual.metavariables.forEach(({ metavariable, premises }) => {
        metavariable.metadata = testTT(metavariable.metadata)
        premises.forEach((p) => {
          p.metadata = testTT(p.metadata)
        })
      })
    }
    assert.deepEqual(actual, expected.metavariables)
  })

  it("returns the expected result for :print-definition", async () => {
    const actual = await ic.printDefinition("Bool")
    if (actual.ok) actual.metadata = testTT(actual.metadata)
    assert.deepEqual(actual, expected.printDefinition)
  })

  it("returns the expected result for :proof-search", async () => {
    const actual = await ic.proofSearch("n_rhs", 18, [])
    assert.deepEqual(actual, expected.proofSearch)
  })

  it("returns the expected result for :repl-completions", async () => {
    const actual = await ic.replCompletions("get")
    assert.deepEqual(actual, expected.replCompletions)
  })

  it("returns the expected result for :type-of", async () => {
    const actual = await ic.typeOf("Cat")
    if (actual.ok) actual.metadata = testTT(actual.metadata)
    assert.deepEqual(actual, expected.typeOf)
  })

  it("returns the expected result for :version", async () => {
    const actual = await ic.version()
    // We don’t want to tie the test to an actual version.
    assert.isTrue(actual.ok)
  })

  it("returns the expected result for :who-calls", async () => {
    const actual = await ic.whoCalls("Cat")
    assert.deepEqual(actual, expected.whoCalls)
  })

  after(async () => {
    proc.kill()
  })
})
