import { FinalReply } from "../../src/reply"

export const loadFile: FinalReply.LoadFile = {
  ok: null,
  id: 1,
  type: ":return",
}

export const addClause: FinalReply.AddClause = {
  ok: "f cat = ?f_rhs",
  id: 2,
  type: ":return",
}

export const addMissing: FinalReply.AddMissing = {
  ok: "getName Sherlock = ?getName_rhs_1",
  id: 3,
  type: ":return",
}

export const apropos: FinalReply.Apropos = {
  ok: {
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
  },
  id: 4,
  type: ":return",
}

// Abbreviated, only includes the first declaration.
export const browseNamespace: FinalReply.BrowseNamespace = {
  ok: {
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
              ttTerm:
                "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAHQXJpdGhUeQAAAAAAAAACAAAAAAAAAApSZWZsZWN0aW9uAAAAAAAAAAhMYW5ndWFnZQ==",
            },
          },
        ],
      },
    ],
  },
  id: 5,
  type: ":return",
}

export const callsWho: FinalReply.CallsWho = {
  ok: {
    caller: {
      name: "Example.plusTwo",
      metadata: [
        {
          start: 0,
          length: 15,
          metadata: {
            name: "Example.plusTwo",
            implicit: ":False",
            key: "AQAAAAAAAAAAB3BsdXNUd28AAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
            decor: ":function",
            docOverview: "",
            type: "Nat -> Nat",
            namespace: "Example",
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
  },
  id: 6,
  type: ":return",
}

export const caseSplit: FinalReply.CaseSplit = {
  ok: "plusTwo Z = plus 2 n\nplusTwo (S k) = plus 2 n\n",
  id: 7,
  type: ":return",
}

export const docsFor: FinalReply.DocsFor = {
  ok: {
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
  },
  id: 8,
  type: ":return",
}

export const interpret: FinalReply.Interpret = {
  ok: {
    result: "4 : Integer",
    metadata: [
      {
        length: 1,
        metadata: {
          decor: ":data",
          docOverview: "An arbitrary-precision integer",
          name: "4",
          ttTerm: "AAAAAAAAAAAEAQAAAAAE",
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
          ttTerm: "AAAAAAAAAAAECg==",
          type: "Type",
        },
        start: 4,
      },
    ],
  },
  id: 9,
  type: ":return",
}

export const makeCase: FinalReply.MakeCase = {
  ok: "g n b = case _ of\n             case_val => ?g_rhs\n",
  id: 10,
  type: ":return",
}

export const makeLemma: FinalReply.MakeLemma = {
  ok: {
    declaration: "g_rhs : (n : Nat) -> (b : Bool) -> String",
    metavariable: "g_rhs n b",
  },
  id: 11,
  type: ":return",
}

export const makeWith: FinalReply.MakeWith = {
  ok: "g n b with (_)\n  g n b | with_pat = ?g_rhs_rhs\n",
  id: 12,
  type: ":return",
}

export const metavariables: FinalReply.Metavariables = {
  ok: [
    {
      metavariable: {
        metadata: [
          {
            length: 3,
            metadata: {
              decor: ":type",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
              name: "Example.Cat",
              namespace: "Example",
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
              ttTerm:
                "AAAAAAAAAAACAAAAAAAAAAADY2F0AQIAAAMAAAAAAAAACAAAAAAAAAAAAQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxlBwAAAAAAAAAAGy4vLi90ZXN0L3Jlc291cmNlcy90ZXN0LmlkcgAAAAAAAAAXBA0=",
            },
            start: 0,
          },
        ],
        name: "Example.f",
        type: "Cat -> String",
      },
      scope: [],
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
              ttTerm: "AAAAAAAAAAIAAAAAAAAAAAFuAAAAAAAAAAAAAWIABA0=",
              type: "Type",
            },
            start: 0,
          },
        ],
        name: "Example.g_rhs",
        type: "String",
      },
      scope: [
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
                ttTerm:
                  "AAAAAAAAAAAAAwAAAAAAAAAIAAAAAAAAAAABAAAAAAAAAAADTmF0AAAAAAAAAAIAAAAAAAAAA05hdAAAAAAAAAAHUHJlbHVkZQ==",
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
                ttTerm:
                  "AAAAAAAAAAEAAAAAAAAAAAFuAAADAAAAAAAAAAgAAAAAAAAAAAEAAAAAAAAAAARCb29sAAAAAAAAAAIAAAAAAAAABEJvb2wAAAAAAAAAB1ByZWx1ZGU=",
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
              ttTerm:
                "AAAAAAAAAAAAAwAAAAAAAAAIAAAAAAAAAAABAAAAAAAAAAADTmF0AAAAAAAAAAIAAAAAAAAAA05hdAAAAAAAAAAHUHJlbHVkZQ==",
              type: "Type",
            },
            start: 0,
          },
        ],
        name: "Example.n_rhs",
        type: "Nat",
      },
      scope: [],
    },
  ],
  id: 13,
  type: ":return",
}

export const printDefinition: FinalReply.PrintDefinition = {
  ok: {
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
          ttTerm:
            "AAAAAAAAAAAHAAAAAAAAAAASLi9QcmVsdWRlL0Jvb2wuaWRyAAAAAAAAABQ=",
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
          ttTerm:
            "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl",
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
          ttTerm:
            "AAAAAAAAAAAAAwAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAEQm9vbAAAAAAAAAACAAAAAAAAAARCb29sAAAAAAAAAAdQcmVsdWRl",
          type: "Type",
        },
        start: 47,
      },
    ],
  },
  id: 14,
  type: ":return",
}

export const proofSearch: FinalReply.ProofSearch = {
  ok: "0",
  id: 15,
  type: ":return",
}

export const replCompletions: FinalReply.ReplCompletions = {
  ok: [
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
  type: ":return",
}

export const typeOf: FinalReply.TypeOf = {
  ok: {
    type: "Cat : Type",
    metadata: [
      {
        length: 3,
        metadata: {
          decor: ":type",
          docOverview: "",
          implicit: ":False",
          key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
          name: "Example.Cat",
          namespace: "Example",
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
          ttTerm:
            "AAAAAAAAAAAHAAAAAAAAAAAbLi8uL3Rlc3QvcmVzb3VyY2VzL3Rlc3QuaWRyAAAAAAAAABQ=",
          type: "Type",
        },
        start: 6,
      },
    ],
  },
  id: 17,
  type: ":return",
}

export const version: FinalReply.Version = {
  ok: { major: 1, minor: 3, patch: 2, tags: [] },
  id: 18,
  type: ":return",
}

export const whoCalls: FinalReply.WhoCalls = {
  ok: {
    callee: {
      metadata: [
        {
          length: 11,
          metadata: {
            decor: ":type",
            docOverview: "",
            implicit: ":False",
            key: "AQAAAAAAAAAAA0NhdAAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
            name: "Example.Cat",
            namespace: "Example",
            type: "Type",
          },
          start: 0,
        },
      ],
      name: "Example.Cat",
    },
    references: [
      {
        metadata: [
          {
            length: 11,
            metadata: {
              decor: ":data",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAA0NhcwAAAAAAAAABAAAAAAAAAAdFeGFtcGxl",
              name: "Example.Cas",
              namespace: "Example",
              type: "Cat",
            },
            start: 0,
          },
        ],
        name: "Example.Cas",
      },
      {
        metadata: [
          {
            length: 12,
            metadata: {
              decor: ":data",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAABEx1bmEAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
              name: "Example.Luna",
              namespace: "Example",
              type: "Cat",
            },
            start: 0,
          },
        ],
        name: "Example.Luna",
      },
      {
        metadata: [
          {
            length: 16,
            metadata: {
              decor: ":data",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAACFNoZXJsb2NrAAAAAAAAAAEAAAAAAAAAB0V4YW1wbGU=",
              name: "Example.Sherlock",
              namespace: "Example",
              type: "Cat",
            },
            start: 0,
          },
        ],
        name: "Example.Sherlock",
      },
      {
        metadata: [
          {
            length: 9,
            metadata: {
              decor: ":metavar",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAAWYAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
              name: "Example.f",
              namespace: "Example",
              type: "Cat -> String",
            },
            start: 0,
          },
        ],
        name: "Example.f",
      },
      {
        metadata: [
          {
            length: 15,
            metadata: {
              decor: ":function",
              docOverview: "",
              implicit: ":False",
              key: "AQAAAAAAAAAAB2dldE5hbWUAAAAAAAAAAQAAAAAAAAAHRXhhbXBsZQ==",
              name: "Example.getName",
              namespace: "Example",
              type: "Cat -> String",
            },
            start: 0,
          },
        ],
        name: "Example.getName",
      },
    ],
  },
  id: 19,
  type: ":return",
}
