import { assert } from "chai"
import { spawn, ChildProcess } from "child_process"
import * as expected from "./v1-expected"
import { clean, omitKeys } from "../utils"
import { IdrisClient } from "../../src/client"

/**
 * Standardise dynamic return values to allow equality checking.
 * All messages ids are set to an arbitrary number, so the tests are (mostly)
 * order independent. And we remove the ttTerm key, which is random.
 */
const std = (reply: object): object => ({
  ...omitKeys(reply, ["ttTerm"]),
  id: 8,
})

describe("Running the v1 client commands on test.idr", () => {
  let ic: IdrisClient
  let proc: ChildProcess

  before(async () => {
    clean()
    proc = spawn("idris", ["--ide-mode"])
    if (proc.stdin && proc.stdout) {
      ic = new IdrisClient(proc.stdin, proc.stdout)
    }
  })

  // This test _does_ need to be first, because it sets up the internal state
  // of the Idris IDE process.
  it("returns the expected result for :load-file", async () => {
    const actual = await ic.loadFile("./test/resources/test.idr")
    assert.deepEqual(actual, expected.loadFile)
  }).timeout(10000)

  it("returns the expected result for :add-clause.", async () => {
    const actual = await ic.addClause("f", 5)
    assert.deepEqual(std(actual), expected.addClause)
  })

  it("returns the expected result for :add-missing.", async () => {
    const actual = await ic.addMissing("getName", 7)
    assert.deepEqual(std(actual), expected.addMissing)
  })

  it("returns the expected result for :apropos.", async () => {
    const actual = await ic.apropos("b8ToBinString")
    assert.deepEqual(std(actual), expected.apropos)
  })

  it("returns the expected result for :browse-namespace.", async () => {
    const actual = await ic.browseNamespace("Language.Reflection")
    // The metadata for an actual namespace is too long to read if the test fails.
    if (actual.ok) actual.declarations = actual.declarations.slice(0, 1)
    assert.deepEqual(std(actual), expected.browseNamespace)
  })

  it("returns the expected result for :calls-who.", async () => {
    const actual = await ic.callsWho("plusTwo")
    assert.deepEqual(std(actual), expected.callsWho)
  })

  it("returns the expected result for :case-split", async () => {
    const actual = await ic.caseSplit("n", 12)
    assert.deepEqual(std(actual), expected.caseSplit)
  })

  it("returns the expected result for :docs-for", async () => {
    const actual = await ic.docsFor("b8ToBinString", ":full")
    assert.deepEqual(std(actual), expected.docsFor)
  })

  it("returns the expected result for :interpret", async () => {
    const actual = await ic.interpret("2 * 2")
    assert.deepEqual(std(actual), expected.interpret)
  })

  it("returns the expected result for :make-case", async () => {
    const actual = await ic.makeCase("g_rhs", 15)
    assert.deepEqual(std(actual), expected.makeCase)
  })

  it("returns the expected result for :make-lemma", async () => {
    const actual = await ic.makeLemma("g_rhs", 15)
    assert.deepEqual(std(actual), expected.makeLemma)
  })

  it("returns the expected result for :make-with", async () => {
    const actual = await ic.makeWith("g_rhs", 15)
    assert.deepEqual(std(actual), expected.makeWith)
  })

  it("returns the expected result for :metavariables", async () => {
    const actual = await ic.metavariables(80)
    assert.deepEqual(std(actual), expected.metavariables)
  })

  it("returns the expected result for :print-definition", async () => {
    const actual = await ic.printDefinition("Bool")
    assert.deepEqual(std(actual), expected.printDefinition)
  })

  it("returns the expected result for :proof-search", async () => {
    const actual = await ic.proofSearch("n_rhs", 18, [])
    assert.deepEqual(std(actual), expected.proofSearch)
  })

  it("returns the expected result for :repl-completions", async () => {
    const actual = await ic.replCompletions("get")
    assert.deepEqual(std(actual), expected.replCompletions)
  })

  it("returns the expected result for :type-of", async () => {
    const actual = await ic.typeOf("Cat")
    assert.deepEqual(std(actual), expected.typeOf)
  })

  it("returns the expected result for :version", async () => {
    const actual = await ic.version()
    // We don’t want to tie the test to an actual version.
    assert.isTrue(actual.ok)
  })

  it("returns the expected result for :who-calls", async () => {
    const actual = await ic.whoCalls("Cat")
    assert.deepEqual(std(actual), expected.whoCalls)
  })

  after(async () => {
    proc.kill()
  })
})
