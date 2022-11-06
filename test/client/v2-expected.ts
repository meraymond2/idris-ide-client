import * as v1 from "./v1-expected"
import { FinalReply } from "../../src/reply"

/**
 * The expected replies are extracted into a separate file because I want to reuse
 * them across the V1 and V2 tests. That makes it easier to determine where V2
 * is not backwards compatible, or has bugs.
 *
 * The ttTerm key has been omitted, since it’s random, and we can’t check it for equality.
 */

export const loadFile: FinalReply.LoadFile = v1.loadFile

export const addClause: FinalReply.AddClauseOk = v1.addClause

export const caseSplit: FinalReply.CaseSplitOk = {
  caseClause: "plusTwo 0 = ?plusTwo_rhs_0\nplusTwo (S k) = ?plusTwo_rhs_1",
  id: 8,
  ok: true,
  type: ":return",
}

export const docsFor: FinalReply.DocsFor = {
  docs: "Prelude.putStrLn : HasIO io => String -> io ()\n  Output a string to stdout with a trailing newline.\n  Totality: total\n  Visibility: export",
  metadata: [
    {
      length: 16,
      metadata: {
        decor: ":function",
      },
      start: 0,
    },
    {
      length: 5,
      metadata: {
        decor: ":type",
      },
      start: 19,
    },
    {
      length: 2,
      metadata: {
        decor: ":bound",
      },
      start: 25,
    },
    {
      length: 2,
      metadata: {
        decor: ":keyword",
      },
      start: 28,
    },
    {
      length: 6,
      metadata: {
        decor: ":type",
      },
      start: 31,
    },
    {
      length: 2,
      metadata: {
        decor: ":keyword",
      },
      start: 38,
    },
    {
      length: 2,
      metadata: {
        decor: ":bound",
      },
      start: 41,
    },
    {
      length: 8,
      metadata: {
        textFormatting: ":underline",
      },
      start: 102,
    },
    {
      length: 5,
      metadata: {
        decor: ":keyword",
      },
      start: 112,
    },
    {
      length: 10,
      metadata: {
        textFormatting: ":underline",
      },
      start: 120,
    },
    {
      length: 6,
      metadata: {
        decor: ":keyword",
      },
      start: 132,
    },
  ],
  id: 8,
  ok: true,
  type: ":return",
}

export const interpret: FinalReply.Interpret = {
  result: "4",
  metadata: [{ length: 1, metadata: { decor: ":data" }, start: 0 }],
  id: 8,
  ok: true,
  type: ":return",
}

export const makeCase: FinalReply.MakeCase = {
  caseClause: "g n b = case _ of\n             case_val => ?g_rhs",
  id: 8,
  ok: true,
  type: ":return",
}

export const makeWith: FinalReply.MakeWith = {
  id: 8,
  ok: true,
  type: ":return",
  withClause: "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs",
}

export const proofSearch: FinalReply.ProofSearch = v1.proofSearch

export const replCompletions: FinalReply.ReplCompletions = {
  completions: [
    "getName",
    "getAt",
    "getLine",
    "getChar",
    "getRight",
    "getLeft",
  ],
  id: 8,
  ok: true,
  type: ":return",
}

export const typeOf: FinalReply.TypeOf = {
  typeOf: "Main.Cat : Type",
  metadata: [
    {
      length: 8,
      metadata: {
        decor: ":type",
      },
      start: 0,
    },
    {
      length: 4,
      metadata: {
        decor: ":type",
      },
      start: 11,
    },
  ],
  id: 8,
  ok: true,
  type: ":return",
}

// Idris 2 only.
export const generateDef: FinalReply.GenerateDefOk = {
  def: "append [] ys = ys\nappend (x :: xs) ys = x :: append xs ys",
  id: 8,
  ok: true,
  type: ":return",
}

export const generateDefNext: FinalReply.GenerateDefOk = {
  def: "append [] ys = ys\nappend (x :: xs) [] = x :: append xs []\nappend (x :: xs) (y :: ys) = x :: append xs (y :: ys)",
  id: 8,
  ok: true,
  type: ":return",
}

export const proofSearchNext: FinalReply.ProofSearch = {
  id: 8,
  ok: true,
  solution: "1",
  type: ":return",
}

export const typeAt: FinalReply.TypeAt = {
  id: 8,
  ok: true,
  type: ":return",
  typeAt: "b : Bool",
}
