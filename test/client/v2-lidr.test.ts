import { assert } from "chai"
import { spawn, ChildProcess } from "child_process"
import * as expected from "./v2-expected"
import * as unimplemented from "./unimplemented"
import { clean, omitKeys } from "../utils"
import { IdrisClient } from "../../src/client"

/**
 * Check the IDE process responses for literate Idris files.
 * The expected behaviour is that the they are identical
 * to the normal V2 responses, except with the appropriate
 * prefix when returning new lines.
 *
 * From the Idris2 docs:
 * Bird notation is a classic literate mode found in Haskell,
 * (and Orwell) in which visible code lines begin with > and
 * hidden lines with <. Other lines are treated as documentation.
 */

const codePrefix = "> "

/**
 * Standardise dynamic return values to allow equality checking.
 * All messages ids are set to an arbitrary number, so the tests are (mostly)
 * order independent. And we remove the ttTerm key, which is random.
 */
const std = (reply: object): object => ({
  ...omitKeys(reply, ["ttTerm"]),
  id: 8,
})

describe("Running the v2 client commands on test.lidr", () => {
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
    const actual = await ic.loadFile("./test/resources/test-v2.lidr")
    assert.deepEqual(actual, expected.loadFile)
  }).timeout(10000)

  it("returns the expected result for :add-clause.", async () => {
    const actual = await ic.addClause("f", 11)
    const correctlyPrefixed = codePrefix + expected.addClause.initialClause
    assert.deepEqual(std(actual), {
      ...expected.addClause,
      initialClause: correctlyPrefixed,
    })
  })

  // Unimplemented
  // (:write-string "add-missing: command not yet implemented. Hopefully soon!" 3)
  // Also, how will this work if it won’t load the file with missing cases?
  it("returns the expected result for :add-missing.", async () => {
    const actual = await ic.addMissing("getName", 9)
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
    const actual = await ic.caseSplit("n", 21)
    const correctlyPrefixed = expected.caseSplit.caseClause
      .split("\n")
      .map((line) => codePrefix + line)
      .join("\n")
    assert.deepEqual(std(actual), {
      ...expected.caseSplit,
      caseClause: correctlyPrefixed,
    })
  })

  // Partially Implemented — no metadata
  it("returns the expected result for :docs-for", async () => {
    const actual = await ic.docsFor("putStrLn", ":full")
    assert.deepEqual(std(actual), expected.docsFor)
  })

  // Partially Implemented — no metadata.
  // (:return (:ok "4" ()) 9)
  // Also, no longer includes type in response, possibly intentional.
  it("returns the expected result for :interpret", async () => {
    const actual = await ic.interpret("2 * 2")
    assert.deepEqual(std(actual), expected.interpret)
  })

  it("returns the expected result for :make-case", async () => {
    const actual = await ic.makeCase("g_rhs", 24)
    // I do not think this is the intended behaviour. The first line
    // is given an additional prefix. the second line is correctly
    // prefixed though, and indented correctly.
    // > > g n b = case _ of
    // >                case_val => ?g_rhs
    const incorrectlyPrefixed = expected.makeCase.caseClause
      .split("\n")
      .map((line, idx) => (idx === 0 ? "> > " + line : ">   " + line))
      .join("\n")
    assert.deepEqual(std(actual), {
      ...expected.makeCase,
      caseClause: incorrectlyPrefixed,
    })
  })

  // Partially implemented — Broken
  // (:return (:ok "g_rhs : Bool -> Nat -> String\ng_rhs b n") 11)
  it("returns the expected result for :make-lemma", async () => {
    const actual = await ic.makeLemma("g_rhs", 24)
    // The metavariable is not prefixed, which is correct, because
    // it goes inline.
    const correctlyPrefixed = codePrefix + unimplemented.makeLemma.declaration
    assert.deepEqual(std(actual), {
      ...unimplemented.makeLemma,
      declaration: correctlyPrefixed,
    })
  })

  it("returns the expected result for :make-with", async () => {
    const actual = await ic.makeWith("g_rhs", 24)
    // I'm not entirely sure what's happened here.
    // from:
    // g n b with (_)
    //   g n b | with_pat = ?g_rhs_rhs
    // to:
    // > > > g n b with (_)
    // > >   > g n b | with_pat = ?g_rhs_rhs
    const incorrectlyPrefixed = expected.makeWith.withClause
      .split("\n")
      .map((line, idx) =>
        idx === 0 ? "> > > " + line : "> >   > " + line.trim()
      )
      .join("\n")
    assert.deepEqual(std(actual), {
      ...expected.makeWith,
      withClause: incorrectlyPrefixed,
    })
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
    const actual = await ic.proofSearch("n_rhs", 27, [])
    assert.deepEqual(std(actual), expected.proofSearch)
  })

  // Unimplemented
  // (:write-string "repl-completions: command not yet implemented. Hopefully soon!" 16)
  // (:return (:ok ()) 3)
  it("returns the expected result for :repl-completions", async () => {
    const actual = await ic.replCompletions("get")
    assert.deepEqual(std(actual), expected.replCompletions)
  })

  // Partially Implemented — no metadata
  // (:return (:ok "Main.Cat : Type" ()) 17)
  it("returns the expected result for :type-of", async () => {
    const actual = await ic.typeOf("Cat")
    assert.deepEqual(std(actual), expected.typeOf)
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
    const actual = await ic.generateDef("append", 29)
    const correctlyPrefixed = expected.generateDef.def
      .split("\n")
      .map((line) => codePrefix + line)
      .join("\n")
    assert.deepEqual(std(actual), {
      ...expected.generateDef,
      def: correctlyPrefixed,
    })
  })

  it("returns the expected result for :generate-def-next", async () => {
    const actual = await ic.generateDefNext()
    const correctlyPrefixed = expected.generateDefNext.def
      .split("\n")
      .map((line) => codePrefix + line)
      .join("\n")
    assert.deepEqual(std(actual), {
      ...expected.generateDefNext,
      def: correctlyPrefixed,
    })
  })

  it("returns the expected result for :proof-search-next", async () => {
    const actual = await ic.proofSearchNext()
    assert.deepEqual(std(actual), expected.proofSearchNext)
  })

  it("returns the expected result for :type-at", async () => {
    const actual = await ic.typeAt("b", 24, 5)
    assert.deepEqual(std(actual), expected.typeAt)
  })

  after(() => {
    proc.kill()
  })
})
