export type ReplyType =
  | ":output"
  | ":protocol-version"
  | ":return"
  | ":set-prompt"
  | ":warning"
  | ":write-string"

export const isReplyType = (s: string): s is ReplyType =>
  s === ":protocol-version" ||
  s === ":output" ||
  s === ":return" ||
  s === ":set-prompt" ||
  s === ":warning" ||
  s === ":write-string"

export type Expr = string | number | Expr[]

export type RootExpr = [ReplyType, Expr, number]

export const isRootExpr = (expr: Expr): expr is RootExpr =>
  Array.isArray(expr) &&
  typeof expr[0] === "string" &&
  isReplyType(expr[0]) &&
  typeof expr[2] === "number"

export type Decor =
  | ":bound"
  | ":data"
  | ":function"
  | ":keyword"
  | ":module"
  | ":metavar"
  | ":type"

export type S_ExpBool = ":True" | ":False"

export type Decl = [string, MsgMetadataExpr[]]

type AttributePair =
  | [":decor", Decor]
  | [":doc-overview", string]
  | [":key", string]
  | [":implicit", S_ExpBool]
  | [":name", string]
  | [":namespace", string]
  | [":source-file", string]
  | [":tt-term", string]
  | [":type", string]

type StartPos = number
type Length = number
export type MsgMetadataExpr = [StartPos, Length, AttributePair[]]

type LineNum = number
type ColNum = number
type SourceMetaLoc = [
  [":filename", string],
  [":start", LineNum, ColNum],
  [":end", LineNum, ColNum]
]
export type SourceMetadataExpr = [SourceMetaLoc, AttributePair[]]

export namespace S_Exp {
  /* Info Replies */
  export type ProtocolVersion = number
  export type SetPrompt = string
  export type WriteString = string

  export type Warning = [
    string,
    [LineNum, ColNum],
    [LineNum, ColNum],
    string,
    MsgMetadataExpr[]
  ]

  /* Output Replies */
  export type Output = [":ok", [":highlight-source", SourceMetadataExpr[]]]

  /* Final Replies */
  export type AddClause = [":ok", string]

  export type AddMissing = [":ok", string]

  export type AproposOk = [":ok", string, MsgMetadataExpr[]]
  export type AproposErr = [":error", "No results found", []]
  export type Apropos = AproposOk | AproposErr
  export const isOkApropos = (payload: Apropos): payload is AproposOk =>
    payload[0] === ":ok"

  export type BrowseNamespaceOk = [":ok", [string[], Decl[]]] | [":ok", []]
  export type BrowseNamespaceErr = [":error", "Invalid or empty namespace"]
  export type BrowseNamespace = BrowseNamespaceOk | BrowseNamespaceErr
  export const isOkBrowseNamespace = (
    payload: BrowseNamespace
  ): payload is BrowseNamespaceOk => payload[0] === ":ok"

  /**
   * Length of caller/references is 0 or 1.
   */
  export type CallsWho = [":ok", [Decl, Decl[]][]]

  export type CaseSplitOk = [":ok", string]
  export type CaseSplitErr = [":error", string]
  export type CaseSplit = CaseSplitOk | CaseSplitErr
  export const isOkCaseSplit = (payload: CaseSplit): payload is CaseSplitOk =>
    payload[0] === ":ok"

  export type DocsForOk = [":ok", string, MsgMetadataExpr[]]
  export type DocsForErr = [":error", string]
  export type DocsFor = DocsForOk | DocsForErr
  export const isOkDocsFor = (payload: DocsFor): payload is DocsForOk =>
    payload[0] === ":ok"

  export type InterpretOk = [":ok", string, MsgMetadataExpr[]]
  // If it can parse some of the input, it returns metadata.
  export type InterpretErr =
    | [":error", string]
    | [":error", string, MsgMetadataExpr[]]
  export type Interpret = InterpretOk | InterpretErr
  export const isOkInterpret = (payload: Interpret): payload is InterpretOk =>
    payload[0] === ":ok"

  export type LoadFileOk = [":ok", []]
  export type LoadFileErr = [":error", string]
  export type LoadFile = LoadFileOk | LoadFileErr
  export const isOkLoadFile = (payload: LoadFile): payload is LoadFileOk =>
    payload[0] === ":ok"

  export type MakeCase = [":ok", string]

  export type MakeLemmaOk = [
    ":ok",
    [
      ":metavariable-lemma",
      [":replace-metavariable", string],
      [":definition-type", string]
    ]
  ]
  export type MakeLemmaErr = [":error", string]
  export type MakeLemma = MakeLemmaOk | MakeLemmaErr
  export const isOkMakeLemma = (payload: MakeLemma): payload is MakeLemmaOk =>
    payload[0] === ":ok"

  export type MakeWith = [":ok", string]

  type ScopeVar = [string, string, MsgMetadataExpr[]]
  type Metavar = [string, ScopeVar[], [string, MsgMetadataExpr[]]]
  export type Metavariables = [":ok", Metavar[]]

  export type PrintDefinitionOk = [":ok", string, MsgMetadataExpr[]]
  export type PrintDefinitionErr = [":error", string]
  export type PrintDefinition = PrintDefinitionOk | PrintDefinitionErr
  export const isOkPrintDefinition = (
    payload: PrintDefinition
  ): payload is PrintDefinitionOk => payload[0] === ":ok"

  export type ProofSearch = [":ok", string]

  export type ReplCompletions = [":ok", [string[], ""]]

  export type TypeOfOk = [":ok", string, MsgMetadataExpr[]]
  export type TypeOfErr = [":error", string]
  export type TypeOf = TypeOfOk | TypeOfErr
  export const isOkTypeOf = (payload: TypeOf): payload is TypeOfOk =>
    payload[0] === ":ok"

  export type Version = [":ok", [[number, number, number], string[]]]

  /**
   * Length of callee/references will be 0 or 1.
   */
  export type WhoCalls = [":ok", [Decl, Decl[]][]]
}
