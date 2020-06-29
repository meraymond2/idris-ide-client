import { assert } from "chai"
import { IdrisClient } from "../../src/client"
import * as expected from "./expected"
import { spawn, ChildProcess } from "child_process"

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

  // TODO: Unimplemented
  // (:write-string "add-missing: command not yet implemented. Hopefully soon!" 3)
  // Also, how will this work if it won’t load the file with missing cases?
  it("returns the expected result for :add-missing.", async () => {
    const actual = await ic.addMissing("getName", 7)
    assert.deepEqual(actual, expected.addMissing)
  })

  // TODO: Unimplemented
  // (:write-string "apropros: command not yet implemented. Hopefully soon!" 4)
  it("returns the expected result for :apropos.", async () => {
    const actual = await ic.apropos("plus")
    assert.deepEqual(actual, expected.apropos)
  })

  // TODO: Unimplemented
  // (:write-string "browse-namespace: command not yet implemented. Hopefully soon!" 3)
  it("returns the expected result for :browse-namespace.", async () => {
    const actual = await ic.browseNamespace("Language.Reflection")
    assert.deepEqual(actual, expected.browseNamespace)
  })

  // TODO: Unimplemented
  // (:write-string "calls-who: command not yet implemented. Hopefully soon!" 6)
  it("returns the expected result for :calls-who.", async () => {
    const actual = await ic.callsWho("plusTwo")
    assert.deepEqual(actual, expected.callsWho)
  })

  // TODO: can’t get to work. It looks like V2 has an optional column parameter,
  // but adding it didn’t seem to make a difference.
  it("returns the expected result for :case-split", async () => {
    const actual = await ic.caseSplit("n", 13)
    assert.deepEqual(actual, expected.caseSplit)
  })

  // TODO: Unimplemented
  // (:write-string "docs-for: command not yet implemented. Hopefully soon!" 8)
  it("returns the expected result for :docs-for", async () => {
    const actual = await ic.docsFor("b8ToBinString", ":full")
    assert.deepEqual(actual, expected.docsFor)
  })

  // TODO: Partially implemented, no message metadata.
  // (:return (:ok "4" ()) 9)
  // Also, no longer includes type in response, possibly intentional.
  it("returns the expected result for :interpret", async () => {
    const actual = await ic.interpret("2 * 2")
    assert.deepEqual(actual, expected.interpret)
  })

  // TODO: Unimplemented
  // (:return (:error "Not implemented yet") 10)
  // Parser accidentally works, because it works positionally, so it returns
  // the error message instead.
  it("returns the expected result for :make-case", async () => {
    const actual = await ic.makeCase("g_rhs", 15)
    assert.deepEqual(actual, expected.makeCase)
  })

  // TODO: Partially implemented, no message metadata.
  // (:return (:ok "g_rhs : Bool -> Nat -> String\ng_rhs b n") 11)
  // Also appears to have an incorrect return value?
  it("returns the expected result for :make-lemma", async () => {
    const actual = await ic.makeLemma("g_rhs", 15)
    assert.deepEqual(actual, expected.makeLemma)
  })

  // TODO: Partially implemented? Looks broken like make-lemma.
  // (:return (:ok "g : (n: Nat) -> (b: Bool) -> Stringwith (_)\n  g : (n: Nat) -> (b: Bool) -> String| with_pat = ?g_rhs_rhs\n  ") 12)
  it("returns the expected result for :make-with", async () => {
    const actual = await ic.makeWith("g_rhs", 15)
    assert.deepEqual(actual, expected.makeWith)
  })

  // TODO: Unimplemented?
  // (:return (:ok (("Main.f" () ("?" ())) ("Main.g_rhs" () ("?" ())) ("Main.n_rhs" () ("?" ())))) 13)
  it("returns the expected result for :metavariables", async () => {
    const actual = await ic.metavariables(80)
    assert.deepEqual(actual, expected.metavariables)
  })

  // TODO: Unimplemented
  //  (:write-string "print-definition: command not yet implemented. Hopefully soon!" 14)
  it("returns the expected result for :print-definition", async () => {
    const actual = await ic.printDefinition("Bool")
    assert.deepEqual(actual, expected.printDefinition)
  })

  it("returns the expected result for :proof-search", async () => {
    const actual = await ic.proofSearch("n_rhs", 18, [])
    assert.deepEqual(actual, expected.proofSearch)
  })

  // TODO: Unimplemented
  // (:write-string "repl-completions: command not yet implemented. Hopefully soon!" 16)
  it("returns the expected result for :repl-completions", async () => {
    const actual = await ic.replCompletions("get")
    assert.deepEqual(actual, expected.replCompletions)
  })

  // TODO: Partially implemented, no message metadata
  // (:return (:ok "Main.Cat : Type" ()) 17)
  // Reply now namespaces variable, possibly intentional
  it("returns the expected result for :type-of", async () => {
    const actual = await ic.typeOf("Cat")
    assert.deepEqual(actual, expected.typeOf)
  })

  // TODO: Completely broken, will break client, since client assumes (possibly
  // naïvely, that all input and output is well-formed.)
  // (:return (:error "Unrecognised command: ((:version) 18)") 17)
  it("returns the expected result for :version", async () => {
    // const actual = await ic.version()
    // We don’t want to tie the test to an actual version.
    // assert.isTrue(actual.ok)
  })

  // TODO: Unimplemented
  // (:write-string "who-calls: command not yet implemented. Hopefully soon!" 18)
  it("returns the expected result for :who-calls", async () => {
    const actual = await ic.whoCalls("Cat")
    assert.deepEqual(actual, expected.whoCalls)
  })

  after(async () => {
    // proc.kill()
  })
})
