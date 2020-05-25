import { Decor, S_ExpBool, ReplyType } from "./s-exps"

export interface BaseReply {
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
    err: {
      end: Position
      filename: string
      metadata: MessageMetadata[]
      start: Position
      warning: string
    }
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
  ok: SourceMetadata[]
  id: number
  type: ":output"
}

// FinalReply instances don’t inherit, so that they can be ok/err unions.
export namespace FinalReply {
  export const isFinalReply = (reply: Reply): boolean =>
    reply.type === ":return"

  export type AddClause = {
    ok: string
    id: number
    type: ":return"
  }

  export type AddMissing = {
    ok: string
    id: number
    type: ":return"
  }

  export type Apropos =
    | {
        ok: {
          docs: string
          metadata: MessageMetadata[]
        }
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  export type BrowseNamespace =
    | {
        ok: {
          declarations: {
            name: string
            metadata: MessageMetadata[]
          }[]
          subModules: string[]
        }
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  /**
   * Caller is null only when it is not found.
   */
  export type CallsWho = {
    ok: {
      caller: {
        name: string
        metadata: MessageMetadata[]
      } | null
      references: {
        name: string
        metadata: MessageMetadata[]
      }[]
    }
    id: number
    type: ":return"
  }

  export type CaseSplit =
    | {
        ok: string
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  export type DocsFor =
    | {
        ok: {
          docs: string
          metadata: MessageMetadata[]
        }
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  /**
   * If part of the input can be interpreted, it will be an error, but with metadata.
   */
  export type Interpret =
    | {
        ok: { result: string; metadata: MessageMetadata[] }
        id: number
        type: ":return"
      }
    | {
        err: {
          message: string
          metadata: MessageMetadata[]
        }
        id: number
        type: ":return"
      }

  export type LoadFile =
    | {
        ok: null
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  export type MakeCase = {
    ok: string
    id: number
    type: ":return"
  }

  export type MakeLemma =
    | {
        ok: {
          declaration: string
          metavariable: string
        }
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  export type MakeWith = {
    ok: string
    id: number
    type: ":return"
  }

  export type Metavariables = {
    ok: {
      metavariable: {
        name: string
        type: string
        metadata: MessageMetadata[]
      }
      scope: {
        name: string
        type: string
        metadata: MessageMetadata[]
      }[]
    }[]
    id: number
    type: ":return"
  }

  export type PrintDefinition =
    | {
        ok: { definition: string; metadata: MessageMetadata[] }
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  export type ProofSearch = {
    ok: string
    id: number
    type: ":return"
  }

  /**
   * This reply omits an additional element that seems to always be an empty string.
   */
  export type ReplCompletions = {
    ok: string[]
    id: number
    type: ":return"
  }

  export type TypeOf =
    | {
        ok: {
          type: string
          metadata: MessageMetadata[]
        }
        id: number
        type: ":return"
      }
    | { err: string; id: number; type: ":return" }

  export type Version = {
    ok: {
      major: number
      minor: number
      patch: number
      tags: string[]
    }
    id: number
    type: ":return"
  }

  export type WhoCalls = {
    ok: {
      callee: {
        name: string
        metadata: MessageMetadata[]
      } | null
      references: {
        name: string
        metadata: MessageMetadata[]
      }[]
    }

    id: number
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
