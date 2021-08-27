import { Decor, S_ExpBool, ReplyType } from "./s-exps"

interface BaseReply {
  id: number
  type: ReplyType
}

interface Position {
  line: number
  column: number
}

interface MetaDetails {
  decor?: Decor
  docOverview?: string
  key?: string
  implicit?: S_ExpBool
  name?: string
  namespace?: string
  sourceFile?: string
  ttTerm?: string
  type?: string
}

export interface MessageMetadata {
  start: number
  length: number
  metadata: MetaDetails
}

export interface SourceMetadata {
  filename: string
  start: Position
  end: Position
  metadata: MetaDetails
}

export interface FileWarning {
  end: Position
  filename: string
  metadata: Array<MessageMetadata>
  start: Position
  warning: string
}

export interface Declaration {
  name: string
  metadata: Array<MessageMetadata>
}

export interface Variable {
  name: string
  type: string
  metadata: Array<MessageMetadata>
}

export interface HolePremise {
  name: string
  type: string
  metadata: Array<MessageMetadata>
}

export interface Metavariable {
  metavariable: Variable
  premises: Array<HolePremise>
}

export namespace InfoReply {
  export interface SetPrompt extends BaseReply {
    path: string
    id: number
    type: ":set-prompt"
  }

  export interface Version extends BaseReply {
    version: number
    id: number
    type: ":protocol-version"
  }

  export interface Warning extends BaseReply {
    err: FileWarning
    id: number
    type: ":warning"
  }

  export interface WriteString extends BaseReply {
    message: string
    id: number
    type: ":write-string"
  }
}

export interface OutputReply extends BaseReply {
  ok: Array<SourceMetadata>
  id: number
  type: ":output"
}

// FinalReply instances don’t inherit, so that they can be ok/err unions.
export namespace FinalReply {
  export const isFinalReply = (reply: Reply): boolean =>
    reply.type === ":return"

  export type AddClauseOk = {
    initialClause: string
    id: number
    ok: true
    type: ":return"
  }
  type AddClauseErr = { err: string; id: number; ok: false; type: ":return" }

  export type AddClause = AddClauseOk | AddClauseErr

  export type AddMissing = {
    id: number
    ok: true
    missingClauses: string
    type: ":return"
  }

  type AproposOk = {
    docs: string
    id: number
    metadata: Array<MessageMetadata>
    ok: true
    type: ":return"
  }

  type AproposErr = { err: string; id: number; ok: false; type: ":return" }

  export type Apropos = AproposOk | AproposErr

  type BrowseNamespaceOk = {
    declarations: Array<Declaration>
    id: number
    ok: true
    subModules: string[]
    type: ":return"
  }

  type BrowseNamespaceErr = {
    err: string
    id: number
    ok: false
    type: ":return"
  }

  export type BrowseNamespace = BrowseNamespaceOk | BrowseNamespaceErr

  /**
   * Caller is null only when it is not found.
   */
  export type CallsWho = {
    caller: Declaration | null
    id: number
    ok: true
    references: Array<Declaration>
    type: ":return"
  }

  export type CaseSplitOk = {
    caseClause: string
    id: number
    ok: true
    type: ":return"
  }

  type CaseSplitErr = { err: string; id: number; ok: false; type: ":return" }

  export type CaseSplit = CaseSplitOk | CaseSplitErr

  type DocsForOk = {
    docs: string
    metadata: Array<MessageMetadata>
    id: number
    ok: true
    type: ":return"
  }

  type DocsForErr = { err: string; id: number; ok: false; type: ":return" }

  export type DocsFor = DocsForOk | DocsForErr

  export type GenerateDefOk = {
    def: string
    id: number
    ok: true
    type: ":return"
  }

  type GenerateDefErr = { err: string; id: number; ok: false; type: ":return" }

  export type GenerateDef = GenerateDefOk | GenerateDefErr

  /**
   * If part of the input can be interpreted, it will be an error, but with metadata.
   */
  type InterpretOk = {
    id: number
    ok: true
    metadata: Array<MessageMetadata>
    result: string
    type: ":return"
  }

  type InterpretErr = {
    err: string
    metadata: MessageMetadata[]
    id: number
    ok: false
    type: ":return"
  }

  export type Interpret = InterpretOk | InterpretErr

  type LoadFileOk = {
    id: number
    ok: true
    type: ":return"
  }

  type LoadFileErr = { err: string; id: number; ok: false; type: ":return" }

  export type LoadFile = LoadFileOk | LoadFileErr

  export type MakeCase = {
    caseClause: string
    id: number
    ok: true
    type: ":return"
  }

  export type MakeLemmaOk = {
    declaration: string
    metavariable: string
    id: number
    ok: true
    type: ":return"
  }

  type MakeLemmaErr = { err: string; id: number; ok: false; type: ":return" }

  export type MakeLemma = MakeLemmaOk | MakeLemmaErr

  export type MakeWith = {
    id: number
    ok: true
    type: ":return"
    withClause: string
  }

  export type Metavariables = {
    id: number
    metavariables: Array<Metavariable>
    ok: true
    type: ":return"
  }

  type PrintDefinitionOk = {
    definition: string
    id: number
    metadata: Array<MessageMetadata>
    ok: true
    type: ":return"
  }

  type PrintDefinitionErr = {
    err: string
    id: number
    ok: false
    type: ":return"
  }

  export type PrintDefinition = PrintDefinitionOk | PrintDefinitionErr

  type ProofSearchOk = {
    id: number
    ok: true
    solution: string
    type: ":return"
  }

  type ProofSearchErr = { err: string; id: number; ok: false; type: ":return" }

  export type ProofSearch = ProofSearchOk | ProofSearchErr

  /**
   * This reply omits an additional element that seems to always be an empty string.
   */
  export type ReplCompletions = {
    completions: Array<string>
    id: number
    ok: true
    type: ":return"
  }

  type TypeAtOk = {
    id: number
    ok: true
    type: ":return"
    typeAt: string
  }

  type TypeAtErr = { err: string; id: number; ok: false; type: ":return" }

  export type TypeAt = TypeAtOk | TypeAtErr

  type TypeOfOk = {
    id: number
    ok: true
    metadata: Array<MessageMetadata>
    type: ":return"
    typeOf: string
  }

  type TypeOfErr = { err: string; id: number; ok: false; type: ":return" }

  export type TypeOf = TypeOfOk | TypeOfErr

  export type Version = {
    id: number
    minor: number
    major: number
    ok: true
    patch: number
    tags: Array<string>
    type: ":return"
  }

  export type WhoCalls = {
    callee: Declaration | null
    references: Array<Declaration>
    id: number
    ok: true
    type: ":return"
  }
}

export type Reply =
  | FinalReply.AddClause
  | FinalReply.AddMissing
  | FinalReply.Apropos
  | FinalReply.BrowseNamespace
  | FinalReply.CallsWho
  | FinalReply.CaseSplit
  | FinalReply.DocsFor
  | FinalReply.GenerateDef
  | FinalReply.Interpret
  | FinalReply.LoadFile
  | FinalReply.MakeCase
  | FinalReply.MakeLemma
  | FinalReply.MakeWith
  | FinalReply.Metavariables
  | FinalReply.PrintDefinition
  | FinalReply.ProofSearch
  | FinalReply.ReplCompletions
  | FinalReply.TypeOf
  | FinalReply.Version
  | FinalReply.WhoCalls
  | InfoReply.SetPrompt
  | InfoReply.Version
  | InfoReply.Warning
  | InfoReply.WriteString
  | OutputReply
