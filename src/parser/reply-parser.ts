import {
  RootExpr,
  Decl,
  SourceMetadataExpr,
  MsgMetadataExpr,
  S_Exp,
} from "../s-exps"
import { RequestType } from "../request"
import {
  InfoReply,
  MessageMetadata,
  Reply,
  OutputReply,
  SourceMetadata,
  FinalReply,
} from "../reply"

export const parseReply = (expr: RootExpr, requestType: RequestType): Reply => {
  const [replyType, payload, id] = expr
  switch (replyType) {
    case ":output":
      return intoOutputReply(payload as S_Exp.Output, id)
    case ":protocol-version":
      return intoInfoReplyVersion(payload as S_Exp.ProtocolVersion, id)
    case ":return":
      switch (requestType) {
        case ":add-clause":
          return intoFinalReplyAddClause(payload as S_Exp.AddClause, id)
        case ":add-missing":
          return intoFinalReplyAddMissing(payload as S_Exp.AddMissing, id)
        case ":apropos":
          return intoFinalReplyApropos(payload as S_Exp.Apropos, id)
        case ":browse-namespace":
          return intoFinalReplyBrowseNamespace(
            payload as S_Exp.BrowseNamespace,
            id
          )
        case ":calls-who":
          return intoFinalReplyCallsWho(payload as S_Exp.CallsWho, id)
        case ":case-split":
          return intoFinalReplyCaseSplit(payload as S_Exp.CaseSplit, id)
        case ":docs-for":
          return intoFinalReplyDocsFor(payload as S_Exp.DocsFor, id)
        case ":interpret":
          return intoFinalReplyInterpret(payload as S_Exp.Interpret, id)
        case ":load-file":
          return intoFinalReplyLoadFile(payload as S_Exp.LoadFile, id)
        case ":make-case":
          return intoFinalReplyMakeCase(payload as S_Exp.MakeCase, id)
        case ":make-lemma":
          return intoFinalReplyMakeLemma(payload as S_Exp.MakeLemma, id)
        case ":make-with":
          return intoFinalReplyMakeWith(payload as S_Exp.MakeWith, id)
        case ":metavariables":
          return intoFinalReplyMetavariables(payload as S_Exp.Metavariables, id)
        case ":print-definition":
          return intoFinalReplyPrintDefinition(
            payload as S_Exp.PrintDefinition,
            id
          )
        case ":proof-search":
          return intoFinalReplyProofSearch(payload as S_Exp.ProofSearch, id)
        case ":repl-completions":
          return intoFinalReplyReplCompletions(
            payload as S_Exp.ReplCompletions,
            id
          )
        case ":type-of":
          return intoFinalReplyTypeOf(payload as S_Exp.TypeOf, id)
        case ":version":
          return intoFinalReplyVersion(payload as S_Exp.Version, id)
        case ":who-calls":
          return intoFinalReplyWhoCalls(payload as S_Exp.WhoCalls, id)
        default:
          throw "Unreachable."
      }
    case ":set-prompt":
      return intoInfoReplySetPrompt(payload as S_Exp.SetPrompt, id)
    case ":warning":
      return intoInfoReplyWarning(payload as S_Exp.Warning, id)
    case ":write-string":
      return intoInfoReplyWriteString(payload as S_Exp.WriteString, id)
    default:
      throw "Unexpected replyType: " + replyType
  }
}

/* Helpers */
const camelCaseKey = (lispKey: string): string =>
  lispKey
    .slice(1, lispKey.length)
    .split("-")
    .reduce(
      (acc, chunk, idx) =>
        idx === 0
          ? chunk
          : acc + chunk[0].toUpperCase() + chunk.slice(1, chunk.length),
      ""
    )

const formatDecl = ([name, metadata]: Decl) => ({
  name,
  metadata: intoMessageMetadata(metadata),
})

const intoSourceMetadata = (
  metadata: SourceMetadataExpr[]
): SourceMetadata[] => {
  const terms: SourceMetadata[] = metadata.map(
    ([[file, start, end], attrs]) => {
      const [_filename, filename] = file
      const [_start, startLine, startCol] = start
      const [_end, endLine, endCol] = end
      const metadata = attrs.reduce(
        (acc, [k, v]) => ({
          ...acc,
          [camelCaseKey(k)]: v,
        }),
        {}
      )
      return {
        end: { column: endCol, line: endLine },
        filename,
        metadata,
        start: { column: startCol, line: startLine },
      }
    }
  )
  // I haven’t witnessed multiple entries for duplicate locations
  // in the source metadata, so I’m not bothering to merge them like
  // the message metadata.
  return terms
}

const intoMessageMetadata = (
  metadata: MsgMetadataExpr[]
): MessageMetadata[] => {
  const terms: MessageMetadata[] = metadata.map(([start, length, attrs]) => {
    return {
      start,
      length,
      metadata: attrs.reduce(
        (acc, [k, v]) => ({ ...acc, [camelCaseKey(k)]: v }),
        {}
      ),
    }
  })
  const merged = terms.reduce<Record<string, MessageMetadata>>((acc, term) => {
    const key = `${term.start},${term.length}`
    const existing = acc[key]?.metadata || {}
    const next = { ...existing, ...term.metadata }
    return {
      ...acc,
      [key]: { ...term, metadata: next },
    }
  }, {})
  return Object.values(merged)
}

// * Info Replies * //
const intoInfoReplySetPrompt = (
  payload: S_Exp.SetPrompt,
  id: number
): InfoReply.SetPrompt => ({
  path: payload,
  id,
  type: ":set-prompt",
})

const intoInfoReplyVersion = (
  payload: S_Exp.ProtocolVersion,
  id: number
): InfoReply.Version => ({
  version: payload,
  id,
  type: ":protocol-version",
})

const intoInfoReplyWarning = (
  payload: S_Exp.Warning,
  id: number
): InfoReply.Warning => {
  const [
    filename,
    [startLine, startCol],
    [endLine, endCol],
    warning,
    metadata,
  ] = payload
  return {
    err: {
      end: { line: endLine, column: endCol },
      filename,
      metadata: intoMessageMetadata(metadata),
      start: { line: startLine, column: startCol },
      warning,
    },
    id,
    type: ":warning",
  }
}

const intoInfoReplyWriteString = (
  payload: S_Exp.WriteString,
  id: number
): InfoReply.WriteString => ({
  message: payload,
  id,
  type: ":write-string",
})

// * Output Replies * //
const intoOutputReply = (payload: S_Exp.Output, id: number): OutputReply => {
  const [_ok, [_highlight, metadata]] = payload
  return {
    ok: intoSourceMetadata(metadata),
    id,
    type: ":output",
  }
}

// * Final Replies * //
const intoFinalReplyAddClause = (
  payload: S_Exp.AddClause,
  id: number
): FinalReply.AddClause => {
  const [_ok, initialClause] = payload
  return {
    initialClause,
    id,
    ok: true,
    type: ":return",
  }
}

const intoFinalReplyAddMissing = (
  payload: S_Exp.AddMissing,
  id: number
): FinalReply.AddMissing => {
  const [_ok, missingClauses] = payload
  return {
    id,
    ok: true,
    missingClauses,
    type: ":return",
  }
}

const intoFinalReplyApropos = (
  payload: S_Exp.Apropos,
  id: number
): FinalReply.Apropos => {
  if (S_Exp.isOkApropos(payload)) {
    const [_ok, apropos, metadata] = payload
    return {
      docs: apropos,
      metadata: intoMessageMetadata(metadata),
      id,
      ok: true,
      type: ":return",
    }
  } else {
    const [_err, msg, _empty] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyBrowseNamespace = (
  payload: S_Exp.BrowseNamespace,
  id: number
): FinalReply.BrowseNamespace => {
  if (S_Exp.isOkBrowseNamespace(payload)) {
    const [_ok, [subModules = [], decls = []]] = payload
    return {
      declarations: decls.map(formatDecl),
      id,
      ok: true,
      subModules,
      type: ":return",
    }
  } else {
    const [_err, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyCallsWho = (
  payload: S_Exp.CallsWho,
  id: number
): FinalReply.CallsWho => {
  if (payload[1].length > 0) {
    const [_ok, [[decl, refs]]] = payload
    return {
      caller: formatDecl(decl),
      id,
      ok: true,
      references: refs.map(formatDecl),
      type: ":return",
    }
  } else {
    return {
      caller: null,
      id,
      ok: true,
      references: [],
      type: ":return",
    }
  }
}

const intoFinalReplyCaseSplit = (
  payload: S_Exp.CaseSplit,
  id: number
): FinalReply.CaseSplit => {
  if (S_Exp.isOkCaseSplit(payload)) {
    const [_ok, caseClause] = payload
    return {
      caseClause,
      id,
      ok: true,
      type: ":return",
    }
  } else {
    const [_error, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyDocsFor = (
  payload: S_Exp.DocsFor,
  id: number
): FinalReply.DocsFor => {
  if (S_Exp.isOkDocsFor(payload)) {
    const [_ok, docs, metadata] = payload
    return {
      docs,
      id,
      metadata: intoMessageMetadata(metadata),
      ok: true,
      type: ":return",
    }
  } else {
    const [_error, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyInterpret = (
  payload: S_Exp.Interpret,
  id: number
): FinalReply.Interpret => {
  if (S_Exp.isOkInterpret(payload)) {
    const [_ok, result, metadata] = payload
    return {
      id,
      ok: true,
      metadata: intoMessageMetadata(metadata),
      result,
      type: ":return",
    }
  } else {
    const [_err, msg, metadata] = payload
    return {
      err: msg,
      id,
      metadata: intoMessageMetadata(metadata || []),
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyLoadFile = (
  payload: S_Exp.LoadFile,
  id: number
): FinalReply.LoadFile => {
  if (S_Exp.isOkLoadFile(payload)) {
    return {
      id,
      ok: true,
      type: ":return",
    }
  } else {
    const [_error, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyMakeCase = (
  payload: S_Exp.MakeCase,
  id: number
): FinalReply.MakeCase => {
  const [_ok, caseClause] = payload
  return {
    caseClause,
    id,
    ok: true,
    type: ":return",
  }
}

const intoFinalReplyMakeLemma = (
  payload: S_Exp.MakeLemma,
  id: number
): FinalReply.MakeLemma => {
  if (S_Exp.isOkMakeLemma(payload)) {
    const [
      _ok,
      [_metavariableLemma, [_replace, metavariable], [_def_type, declaration]],
    ] = payload
    return {
      declaration,
      id,
      ok: true,
      metavariable,
      type: ":return",
    }
  } else {
    const [_err, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyMakeWith = (
  payload: S_Exp.MakeWith,
  id: number
): FinalReply.MakeWith => {
  const [_ok, withClause] = payload
  return {
    withClause,
    id,
    ok: true,
    type: ":return",
  }
}

const intoFinalReplyMetavariables = (
  payload: S_Exp.Metavariables,
  id: number
): FinalReply.Metavariables => {
  const [_ok, metavars] = payload
  const metavariables = metavars.map(
    ([name, holePremises, [type, metadata]]) => {
      const metavariable = {
        name,
        type,
        metadata: intoMessageMetadata(metadata),
      }
      const premises = holePremises.map(([name, type, metadata]) => ({
        name,
        type,
        metadata: intoMessageMetadata(metadata),
      }))
      return { metavariable, premises }
    }
  )
  return { id, ok: true, metavariables, type: ":return" }
}

const intoFinalReplyPrintDefinition = (
  payload: S_Exp.PrintDefinition,
  id: number
): FinalReply.PrintDefinition => {
  if (S_Exp.isOkPrintDefinition(payload)) {
    const [_ok, definition, metadata] = payload
    return {
      definition,
      id,
      metadata: intoMessageMetadata(metadata),
      ok: true,
      type: ":return",
    }
  } else {
    const [_err, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyProofSearch = (
  payload: S_Exp.ProofSearch,
  id: number
): FinalReply.ProofSearch => {
  const [_ok, solution] = payload
  return {
    id,
    ok: true,
    solution,
    type: ":return",
  }
}

const intoFinalReplyReplCompletions = (
  payload: S_Exp.ReplCompletions,
  id: number
): FinalReply.ReplCompletions => {
  const [_ok, [completions, _x]] = payload // x is always ""?
  return {
    completions,
    id,
    ok: true,
    type: ":return",
  }
}

const intoFinalReplyTypeOf = (
  payload: S_Exp.TypeOf,
  id: number
): FinalReply.TypeOf => {
  if (S_Exp.isOkTypeOf(payload)) {
    const [_ok, typeOf, metadata] = payload
    return {
      id,
      ok: true,
      metadata: intoMessageMetadata(metadata),
      type: ":return",
      typeOf,
    }
  } else {
    const [_err, msg] = payload
    return {
      err: msg,
      id,
      ok: false,
      type: ":return",
    }
  }
}

const intoFinalReplyVersion = (
  payload: S_Exp.Version,
  id: number
): FinalReply.Version => {
  const [_ok, [[major, minor, patch], tags]] = payload
  return {
    id,
    major,
    minor,
    ok: true,
    patch,
    tags,
    type: ":return",
  }
}

const intoFinalReplyWhoCalls = (
  payload: S_Exp.WhoCalls,
  id: number
): FinalReply.WhoCalls => {
  if (payload[1].length > 0) {
    const [_ok, [[decl, refs]]] = payload
    return {
      callee: formatDecl(decl),
      id,
      ok: true,
      references: refs.map(formatDecl),
      type: ":return",
    }
  } else {
    return {
      callee: null,
      id,
      ok: true,
      references: [],
      type: ":return",
    }
  }
}
