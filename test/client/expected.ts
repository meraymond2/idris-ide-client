import { FinalReply } from "../../src/reply"

export const loadFile: FinalReply.LoadFile = {
  id: 1,
  ok: true,
  type: ":return",
}

export const addClause: FinalReply.AddClause = {
  id: 2,
  initialClause: "f cat = ?f_rhs",
  ok: true,
  type: ":return",
}

export const addMissing: FinalReply.AddMissing = {
  id: 3,
  missingClauses: "getName Sherlock = ?getName_rhs_1",
  ok: true,
  type: ":return",
}

export const apropos: FinalReply.Apropos = {
  docs:
    "\nPrelude.Bits.b8ToBinString : Bits8 -> String\nEncode Bits8 as an 8-character binary string.\n",
  metadata: [
    {
      length: 26,
      metadata: {
        decor: ":function",
        docOverview: "Encode Bits8 as an 8-character binary string.",
        implicit: ":False",
        key:
          "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==",
        name: "Prelude.Bits.b8ToBinString",
        namespace: "Prelude.Bits",
        type: "Bits8 -> String",
      },
      start: 1,
    },
    {
      length: 5,
      metadata: {
        decor: ":type",
        docOverview: "Eight bits (unsigned)",
        name: "Bits8",
        type: "Type",
      },
      start: 30,
    },
    {
      length: 6,
      metadata: {
        decor: ":type",
        docOverview: "Strings in some unspecified encoding",
        name: "String",
        type: "Type",
      },
      start: 39,
    },
  ],
  id: 4,
  ok: true,
  type: ":return",
}

// Abbreviated, only includes the first declaration.
export const browseNamespace: FinalReply.BrowseNamespace = {
  subModules: [
    "Language.Reflection.Errors",
    "Language.Reflection.Elab",
    "Language.Reflection.Elab.Tactics",
    "Language.Reflection.Elab.ConstructorDefn",
    "Language.Reflection.Elab.TyDecl",
    "Language.Reflection.Elab.FunDefn",
    "Language.Reflection.Elab.DataDefn",
    "Language.Reflection.Elab.Datatype",
    "Language.Reflection.SourceLocation",
    "Language.Reflection.Elab.FunArg",
  ],
  declarations: [
    {
      name: "ATDouble : ArithTy",
      metadata: [
        {
          start: 0,
          length: 8,
          metadata: {
            name: "Language.Reflection.ATDouble",
            implicit: ":False",
            key:
              "AQAAAAAAAAAACEFURG91YmxlAAAAAAAAAAIAAAAAAAAAClJlZmxlY3Rpb24AAAAAAAAACExhbmd1YWdl",
            decor: ":data",
            docOverview: "",
            type: "ArithTy",
            namespace: "Language.Reflection",
          },
        },
        {
          start: 11,
          length: 7,
          metadata: {
            name: "Language.Reflection.ArithTy",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAB0FyaXRoVHkAAAAAAAAAAgAAAAAAAAAKUmVmbGVjdGlvbgAAAAAAAAAITGFuZ3VhZ2U=",
            decor: ":type",
            docOverview: "",
            type: "Type",
            namespace: "Language.Reflection",
            ttTerm: "TEST",
          },
        },
      ],
    },
  ],
  id: 5,
  ok: true,
  type: ":return",
}

export const callsWho: FinalReply.CallsWho = {
  caller: {
    name: "Main.plusTwo",
    metadata: [
      {
        start: 0,
        length: 12,
        metadata: {
          name: "Main.plusTwo",
          implicit: ":False",
          key: "AQAAAAAAAAAAB3BsdXNUd28AAAAAAAAAAQAAAAAAAAAETWFpbg==",
          decor: ":function",
          docOverview: "",
          type: "Nat -> Nat",
          namespace: "Main",
        },
      },
    ],
  },
  references: [
    {
      name: "Prelude.Nat.Nat",
      metadata: [
        {
          start: 0,
          length: 15,
          metadata: {
            name: "Prelude.Nat.Nat",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
            decor: ":type",
            docOverview:
              "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.",
            type: "Type",
            namespace: "Prelude.Nat",
          },
        },
      ],
    },
    {
      name: "Prelude.Nat.plus",
      metadata: [
        {
          start: 0,
          length: 16,
          metadata: {
            name: "Prelude.Nat.plus",
            implicit: ":False",
            key:
              "AQAAAAAAAAAABHBsdXMAAAAAAAAAAgAAAAAAAAADTmF0AAAAAAAAAAdQcmVsdWRl",
            decor: ":function",
            docOverview: "Add two natural numbers.",
            type: "Nat -> Nat -> Nat",
            namespace: "Prelude.Nat",
          },
        },
      ],
    },
    {
      name: "Prelude.Interfaces.fromInteger",
      metadata: [
        {
          start: 0,
          length: 30,
          metadata: {
            name: "Prelude.Interfaces.fromInteger",
            implicit: ":False",
            key:
              "AQAAAAAAAAAAC2Zyb21JbnRlZ2VyAAAAAAAAAAIAAAAAAAAACkludGVyZmFjZXMAAAAAAAAAB1ByZWx1ZGU=",
            decor: ":function",
            docOverview: "Conversion from Integer.",
            type: "Num ty => Integer -> ty",
            namespace: "Prelude.Interfaces",
          },
        },
      ],
    },
    {
      name: "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num",
      metadata: [
        {
          start: 0,
          length: 56,
          metadata: {
            name: "Prelude.Nat.Nat implementation of Prelude.Interfaces.Num",
            implicit: ":False",
            key:
              "AQMCAQAAAAAAAAAAA051bQAAAAAAAAACAAAAAAAAAApJbnRlcmZhY2VzAAAAAAAAAAdQcmVsdWRlAAAAAAAAAAEAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
            decor: ":function",
            docOverview: "",
            type: "Num Nat",
            namespace: "Prelude.Nat",
          },
        },
      ],
    },
  ],
  id: 6,
  ok: true,
  type: ":return",
}

export const caseSplit: FinalReply.CaseSplit = {
  caseClause: "plusTwo Z = plus 2 n\nplusTwo (S k) = plus 2 n\n",
  id: 7,
  ok: true,
  type: ":return",
}

export const docsFor: FinalReply.DocsFor = {
  docs:
    "Prelude.Bits.b8ToBinString : Bits8 -> String\n    Encode Bits8 as an 8-character binary string.\n    \n    The function is: Total & public export",
  metadata: [
    {
      start: 0,
      length: 26,
      metadata: {
        name: "Prelude.Bits.b8ToBinString",
        implicit: ":False",
        key:
          "AQAAAAAAAAAADWI4VG9CaW5TdHJpbmcAAAAAAAAAAgAAAAAAAAAEQml0cwAAAAAAAAAHUHJlbHVkZQ==",
        decor: ":function",
        docOverview: "Encode Bits8 as an 8-character binary string.",
        type: "Bits8 -> String",
        namespace: "Prelude.Bits",
      },
    },
    {
      start: 29,
      length: 5,
      metadata: {
        decor: ":type",
        type: "Type",
        docOverview: "Eight bits (unsigned)",
        name: "Bits8",
      },
    },
    {
      start: 38,
      length: 6,
      metadata: {
        decor: ":type",
        type: "Type",
        docOverview: "Strings in some unspecified encoding",
        name: "String",
      },
    },
  ],
  id: 8,
  ok: true,
  type: ":return",
}

export const interpret: FinalReply.Interpret = {
  result: "4 : Integer",
  metadata: [
    {
      length: 1,
      metadata: {
        decor: ":data",
        docOverview: "An arbitrary-precision integer",
        name: "4",
        ttTerm: "TEST",
        type: "Integer",
      },
      start: 0,
    },
    {
      length: 7,
      metadata: {
        decor: ":type",
        docOverview: "Arbitrary-precision integers",
        name: "Integer",
        ttTerm: "TEST",
        type: "Type",
      },
      start: 4,
    },
  ],
  id: 9,
  ok: true,
  type: ":return",
}

export const makeCase: FinalReply.MakeCase = {
  caseClause: "g n b = case _ of\n             case_val => ?g_rhs\n",
  id: 10,
  ok: true,
  type: ":return",
}

export const makeLemma: FinalReply.MakeLemma = {
  declaration: "g_rhs : (n : Nat) -> (b : Bool) -> String",
  metavariable: "g_rhs n b",
  id: 11,
  ok: true,
  type: ":return",
}

export const makeWith: FinalReply.MakeWith = {
  id: 12,
  ok: true,
  type: ":return",
  withClause: "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs\n",
}

export const metavariables: FinalReply.Metavariables = {
  metavariables: [
    {
      metavariable: {
        metadata: [
          {
            length: 3,
            metadata: {
              decor: ":type",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAARNYWlu",
              name: "Main.Cat",
              namespace: "Main",
              type: "Type",
            },
            start: 0,
          },
          {
            length: 6,
            metadata: {
              decor: ":type",
              docOverview: "Strings in some unspecified encoding",
              name: "String",
              type: "Type",
            },
            start: 7,
          },
          {
            length: 13,
            metadata: {
              ttTerm: "TEST",
            },
            start: 0,
          },
        ],
        name: "Main.f",
        type: "Cat -> String",
      },
      premises: [],
    },
    {
      metavariable: {
        metadata: [
          {
            length: 6,
            metadata: {
              decor: ":type",
              docOverview: "Strings in some unspecified encoding",
              name: "String",
              ttTerm: "TEST",
              type: "Type",
            },
            start: 0,
          },
        ],
        name: "Main.g_rhs",
        type: "String",
      },
      premises: [
        {
          metadata: [
            {
              length: 3,
              metadata: {
                decor: ":type",
                docOverview:
                  "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
                name: "Prelude.Nat.Nat",
                namespace: "Prelude.Nat",
                ttTerm: "TEST",
                type: "Type",
              },
              start: 0,
            },
          ],
          name: "n",
          type: "Nat",
        },
        {
          metadata: [
            {
              length: 4,
              metadata: {
                decor: ":type",
                docOverview: "Boolean Data Type",
                implicit: ":False",
                key:
                  "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
                name: "Prelude.Bool.Bool",
                namespace: "Prelude.Bool",
                ttTerm: "TEST",
                type: "Type",
              },
              start: 0,
            },
          ],
          name: "b",
          type: "Bool",
        },
      ],
    },
    {
      metavariable: {
        metadata: [
          {
            length: 3,
            metadata: {
              decor: ":type",
              docOverview:
                "Natural numbers: unbounded, unsigned integers\nwhich can be pattern matched.",
              implicit: ":False",
              key:
                "AQAAAAAAAAAAA05hdAAAAAAAAAACAAAAAAAAAANOYXQAAAAAAAAAB1ByZWx1ZGU=",
              name: "Prelude.Nat.Nat",
              namespace: "Prelude.Nat",
              ttTerm: "TEST",
              type: "Type",
            },
            start: 0,
          },
        ],
        name: "Main.n_rhs",
        type: "Nat",
      },
      premises: [],
    },
  ],
  id: 13,
  ok: true,
  type: ":return",
}

export const printDefinition: FinalReply.PrintDefinition = {
  definition: "data Bool : Type where\n  False : Bool\n  True : Bool",
  metadata: [
    {
      length: 4,
      metadata: {
        decor: ":keyword",
      },
      start: 0,
    },
    {
      length: 4,
      metadata: {
        decor: ":type",
        docOverview: "Boolean Data Type",
        implicit: ":False",
        key:
          "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
        name: "Prelude.Bool.Bool",
        namespace: "Prelude.Bool",
        type: "Type",
      },
      start: 5,
    },
    {
      length: 4,
      metadata: {
        decor: ":type",
        docOverview: "The type of types",
        name: "Type",
        ttTerm: "TEST",
        type: "Type",
      },
      start: 12,
    },
    {
      length: 5,
      metadata: {
        decor: ":keyword",
      },
      start: 17,
    },
    {
      length: 5,
      metadata: {
        decor: ":data",
        docOverview: "",
        implicit: ":False",
        key:
          "AQAAAAAAAAAABUZhbHNlAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=",
        name: "Prelude.Bool.False",
        namespace: "Prelude.Bool",
        type: "Bool",
      },
      start: 25,
    },
    {
      length: 4,
      metadata: {
        decor: ":type",
        docOverview: "Boolean Data Type",
        implicit: ":False",
        key:
          "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
        name: "Prelude.Bool.Bool",
        namespace: "Prelude.Bool",
        ttTerm: "TEST",
        type: "Type",
      },
      start: 33,
    },
    {
      length: 4,
      metadata: {
        decor: ":data",
        docOverview: "",
        implicit: ":False",
        key:
          "AQAAAAAAAAAABFRydWUAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
        name: "Prelude.Bool.True",
        namespace: "Prelude.Bool",
        type: "Bool",
      },
      start: 40,
    },
    {
      length: 4,
      metadata: {
        decor: ":type",
        docOverview: "Boolean Data Type",
        implicit: ":False",
        key:
          "AQAAAAAAAAAABEJvb2wAAAAAAAAAAgAAAAAAAAAEQm9vbAAAAAAAAAAHUHJlbHVkZQ==",
        name: "Prelude.Bool.Bool",
        namespace: "Prelude.Bool",
        ttTerm: "TEST",
        type: "Type",
      },
      start: 47,
    },
  ],
  id: 14,
  ok: true,
  type: ":return",
}

export const proofSearch: FinalReply.ProofSearch = {
  id: 15,
  ok: true,
  solution: "0",
  type: ":return",
}

export const replCompletions: FinalReply.ReplCompletions = {
  completions: [
    "getArgs",
    "getChar",
    "getEnv",
    "getErrno",
    "getFileError",
    "getGoal",
    "getGuess",
    "getHoles",
    "getLine",
    "getLine'",
    "getMyVM",
    "getName",
    "getProof",
    "getSourceLocation",
    "getStringFromBuffer",
    "getWitness",
  ],
  id: 16,
  ok: true,
  type: ":return",
}

export const typeOf: FinalReply.TypeOf = {
  typeOf: "Cat : Type",
  metadata: [
    {
      length: 3,
      metadata: {
        decor: ":type",
        docOverview: "",
        implicit: ":False",
        key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAARNYWlu",
        name: "Main.Cat",
        namespace: "Main",
        type: "Type",
      },
      start: 0,
    },
    {
      length: 4,
      metadata: {
        decor: ":type",
        docOverview: "The type of types",
        name: "Type",
        ttTerm: "TEST",
        type: "Type",
      },
      start: 6,
    },
  ],
  id: 17,
  ok: true,
  type: ":return",
}

export const whoCalls: FinalReply.WhoCalls = {
  callee: {
    metadata: [
      {
        length: 8,
        metadata: {
          decor: ":type",
          docOverview: "",
          implicit: ":False",
          key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAARNYWlu",
          name: "Main.Cat",
          namespace: "Main",
          type: "Type",
        },
        start: 0,
      },
    ],
    name: "Main.Cat",
  },
  references: [
    {
      metadata: [
        {
          length: 8,
          metadata: {
            decor: ":data",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAAA0NhcwAAAAAAAAABAAAAAAAAAARNYWlu",
            name: "Main.Cas",
            namespace: "Main",
            type: "Cat",
          },
          start: 0,
        },
      ],
      name: "Main.Cas",
    },
    {
      metadata: [
        {
          length: 9,
          metadata: {
            decor: ":data",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAABEx1bmEAAAAAAAAAAQAAAAAAAAAETWFpbg==",
            name: "Main.Luna",
            namespace: "Main",
            type: "Cat",
          },
          start: 0,
        },
      ],
      name: "Main.Luna",
    },
    {
      metadata: [
        {
          length: 13,
          metadata: {
            decor: ":data",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAACFNoZXJsb2NrAAAAAAAAAAEAAAAAAAAABE1haW4=",
            name: "Main.Sherlock",
            namespace: "Main",
            type: "Cat",
          },
          start: 0,
        },
      ],
      name: "Main.Sherlock",
    },
    {
      metadata: [
        {
          length: 6,
          metadata: {
            decor: ":metavar",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAAAWYAAAAAAAAAAQAAAAAAAAAETWFpbg==",
            name: "Main.f",
            namespace: "Main",
            type: "Cat -> String",
          },
          start: 0,
        },
      ],
      name: "Main.f",
    },
    {
      metadata: [
        {
          length: 12,
          metadata: {
            decor: ":function",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAETWFpbg==",
            name: "Main.getName",
            namespace: "Main",
            type: "Cat -> String",
          },
          start: 0,
        },
      ],
      name: "Main.getName",
    },
  ],
  id: 19,
  ok: true,
  type: ":return",
}
