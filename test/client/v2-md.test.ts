import { assert } from "chai"
import { spawn, ChildProcess } from "child_process"
import * as expected from "./v2-expected"
import * as unimplemented from "./unimplemented"
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

describe("Running the v2 client commands on test.md", () => {
  let ic: IdrisClient
  let proc: ChildProcess

  before(async () => {
    clean()
    proc = spawn("idris2", ["--ide-mode", "--no-color"])
    if (proc.stdin && proc.stdout) {
      ic = new IdrisClient(proc.stdin, proc.stdout)
    }
  })

  // This test _does_ need to be first, because it sets up the internal state
  // of the Idris IDE process.
  it("returns the expected result for :load-file", async () => {
    const actual = await ic.loadFile("./test/resources/test-v2.md")
    assert.deepEqual(actual, expected.loadFile)
  }).timeout(10000)

  it("returns the expected result for :add-clause.", async () => {
    const actual = await ic.addClause("f", 14)
    assert.deepEqual(std(actual), expected.addClause)
  })

  // Unimplemented
  // (:write-string "add-missing: command not yet implemented. Hopefully soon!" 3)
  // Also, how will this work if it won’t load the file with missing cases?
  it("returns the expected result for :add-missing.", async () => {
    const actual = await ic.addMissing("getName", 16)
    assert.deepEqual(std(actual), unimplemented.addMissing)
  })

  // Unimplemented
  // (:write-string "apropros: command not yet implemented. Hopefully soon!" 4)
  it("returns the expected result for :apropos.", async () => {
    const actual = await ic.apropos("plus")
    assert.deepEqual(std(actual), unimplemented.apropos)
  })

  // Unimplemented
  // (:write-string "browse-namespace: command not yet implemented. Hopefully soon!" 3)
  it("returns the expected result for :browse-namespace.", async () => {
    const actual = await ic.browseNamespace("Language.Reflection")
    assert.deepEqual(std(actual), unimplemented.browseNamespace)
  })

  // Unimplemented
  // (:write-string "calls-who: command not yet implemented. Hopefully soon!" 6)
  it("returns the expected result for :calls-who.", async () => {
    const actual = await ic.callsWho("plusTwo")
    assert.deepEqual(std(actual), unimplemented.callsWho)
  })

  it("returns the expected result for :case-split", async () => {
    const actual = await ic.caseSplit("n", 26)
    assert.deepEqual(std(actual), expected.caseSplit)
  })

  // Partially Implemented — no metadata
  it("returns the expected result for :docs-for", async () => {
    const actual = await ic.docsFor("putStrLn", ":full")
    assert.deepEqual(std(actual), expected.docsFor)
  })

  it("returns the expected result for :make-case", async () => {
    const actual = await ic.makeCase("g_rhs", 29)
    assert.deepEqual(std(actual), expected.makeCase)
  })

  // Partially implemented — Broken
  // (:return (:ok "g_rhs : Bool -> Nat -> String\ng_rhs b n") 11)
  it("returns the expected result for :make-lemma", async () => {
    const actual = await ic.makeLemma("g_rhs", 29)
    assert.deepEqual(std(actual), unimplemented.makeLemma)
  })

  it("returns the expected result for :make-with", async () => {
    const actual = await ic.makeWith("g_rhs", 29)
    assert.deepEqual(std(actual), expected.makeWith)
  })

  // Partially implemented — no metadata
  it("returns the expected result for :metavariables", async () => {
    const actual = await ic.metavariables(80)
    assert.deepEqual(std(actual), unimplemented.metavariables)
  })

  // Unimplemented
  //  (:write-string "print-definition: command not yet implemented. Hopefully soon!" 14)
  it("returns the expected result for :print-definition", async () => {
    const actual = await ic.printDefinition("Bool")
    assert.deepEqual(std(actual), unimplemented.printDefinition)
  })

  it("returns the expected result for :proof-search", async () => {
    const actual = await ic.proofSearch("n_rhs", 32, [])
    assert.deepEqual(std(actual), expected.proofSearch)
  })

  // Unimplemented
  // (:write-string "repl-completions: command not yet implemented. Hopefully soon!" 16)
  // (:return (:ok ()) 3)
  it("returns the expected result for :repl-completions", async () => {
    const actual = await ic.replCompletions("get")
    assert.deepEqual(std(actual), expected.replCompletions)
  })

  it("returns the expected result for :version", async () => {
    const actual = await ic.version()
    // We don’t want to tie the test to an actual version.
    assert.isTrue(actual.ok)
  })

  // Unimplemented
  // (:write-string "who-calls: command not yet implemented. Hopefully soon!" 18)
  it("returns the expected result for :who-calls", async () => {
    const actual = await ic.whoCalls("Cat")
    assert.deepEqual(std(actual), unimplemented.whoCalls)
  })

  // New V2 commands

  it("returns the expected result for :generate-def", async () => {
    const actual = await ic.generateDef("append", 34)
    assert.deepEqual(std(actual), expected.generateDef)
  })

  it("returns the expected result for :generate-def-next", async () => {
    const actual = await ic.generateDefNext()
    assert.deepEqual(std(actual), expected.generateDefNext)
  })

  it("returns the expected result for :proof-search-next", async () => {
    const actual = await ic.proofSearchNext()
    assert.deepEqual(std(actual), expected.proofSearchNext)
  })

  it("returns the expected result for :type-at", async () => {
    const actual = await ic.typeAt("b", 29, 5)
    assert.deepEqual(std(actual), expected.typeAt)
  })

  after(() => {
    proc.kill()
  })
})
