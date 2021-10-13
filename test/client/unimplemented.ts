import { FinalReply } from "../../src/reply"

export const addMissing: FinalReply.AddMissing = {
  id: 8,
  missingClauses: "",
  ok: true,
  type: ":return",
}

export const apropos: FinalReply.Apropos = {
  docs: "",
  metadata: [],
  id: 8,
  ok: true,
  type: ":return",
}

export const browseNamespace: FinalReply.BrowseNamespace = {
  subModules: [],
  declarations: [],
  id: 8,
  ok: true,
  type: ":return",
}

export const callsWho: FinalReply.CallsWho = {
  caller: null,
  references: [],
  id: 8,
  ok: true,
  type: ":return",
}

// Partially Implemented — partial metadata
export const docsFor: FinalReply.DocsFor = {
  docs: "Prelude.putStrLn : HasIO io => String -> io ()\n  Output a string to stdout with a trailing newline.\n  Totality: total",
  metadata: [
    { length: 16, metadata: { decor: ":function" }, start: 0 },
    { length: 5, metadata: { decor: ":type" }, start: 19 },
    { length: 2, metadata: { decor: ":bound" }, start: 25 },
    { length: 6, metadata: { decor: ":type" }, start: 31 },
    { length: 2, metadata: { decor: ":bound" }, start: 41 },
    { length: 8, metadata: { textFormatting: ":underline" }, start: 102 },
  ],
  id: 8,
  ok: true,
  type: ":return",
}

// Partially Implemented — partial metadata
export const interpret: FinalReply.Interpret = {
  result: "4",
  metadata: [
    {
      length: 1,
      metadata: {
        decor: ":data",
      },
      start: 0,
    },
  ],
  id: 8,
  ok: true,
  type: ":return",
}

// Partially Implemented — kinda broken
export const makeLemma: FinalReply.MakeLemmaOk = {
  declaration: "g_rhs : Bool -> Nat -> String",
  metavariable: "g_rhs b n",
  id: 8,
  ok: true,
  type: ":return",
}

export const metavariables: FinalReply.Metavariables = {
  metavariables: [
    {
      metavariable: {
        metadata: [],
        name: "Main.append",
        type: "Vect n a -> Vect m a -> Vect (plus n m) a",
      },
      premises: [],
    },
    {
      metavariable: {
        metadata: [],
        name: "Main.f",
        type: "Cat -> String",
      },
      premises: [],
    },
    {
      metavariable: {
        metadata: [],
        name: "Main.g_rhs",
        type: "String",
      },
      premises: [
        {
          metadata: [],
          name: "  b",
          type: "Bool",
        },
        {
          metadata: [],
          name: "  n",
          type: "Nat",
        },
      ],
    },
    {
      metavariable: {
        metadata: [],
        name: "Main.n_rhs",
        type: "Nat",
      },
      premises: [],
    },
    // This is additional to the V2 test, because I had to make it a
    // metavariable in order for case split to work.
    {
      metavariable: {
        metadata: [],
        name: "Main.plusTwo_rhs",
        type: "Nat",
      },
      premises: [
        {
          metadata: [],
          name: "  n",
          type: "Nat",
        },
      ],
    },
  ],
  id: 8,
  ok: true,
  type: ":return",
}

export const printDefinition: FinalReply.PrintDefinition = {
  definition: "Bool",
  metadata: [],
  id: 8,
  ok: true,
  type: ":return",
}

export const replCompletions: FinalReply.ReplCompletions = {
  completions: [],
  id: 8,
  ok: true,
  type: ":return",
}

// Partially implemented — partial metadata
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

export const whoCalls: FinalReply.WhoCalls = {
  callee: null,
  references: [],
  id: 8,
  ok: true,
  type: ":return",
}
