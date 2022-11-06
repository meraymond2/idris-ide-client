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
        name: `"Main.append"`,
        type: "Vect n a -> Vect m a -> Vect (plus n m) a",
      },
      premises: [],
    },
    {
      metavariable: {
        metadata: [],
        name: `"Main.f"`,
        type: "Cat -> String",
      },
      premises: [],
    },
    {
      metavariable: {
        metadata: [],
        name: `"Main.g_rhs"`,
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
        name: `"Main.n_rhs"`,
        type: "Nat",
      },
      premises: [],
    },
    // This is additional to the V2 test, because I had to make it a
    // metavariable in order for case split to work.
    {
      metavariable: {
        metadata: [],
        name: `"Main.plusTwo_rhs"`,
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

export const whoCalls: FinalReply.WhoCalls = {
  callee: null,
  references: [],
  id: 8,
  ok: true,
  type: ":return",
}
