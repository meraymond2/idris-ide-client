import { FinalReply } from "../../src/reply"

export const addMissing: FinalReply.AddMissing = {
  id: 3,
  missingClauses: "",
  ok: true,
  type: ":return",
}

export const apropos: FinalReply.Apropos = {
  docs: "",
  metadata: [],
  id: 4,
  ok: true,
  type: ":return",
}

export const browseNamespace: FinalReply.BrowseNamespace = {
  subModules: [],
  declarations: [],
  id: 5,
  ok: true,
  type: ":return",
}

export const callsWho: FinalReply.CallsWho = {
  caller: null,
  references: [],
  id: 6,
  ok: true,
  type: ":return",
}

// Partially Implemented — no metadata
export const docsFor: FinalReply.DocsFor = {
  docs:
    "Prelude.putStrLn : HasIO io => String -> io ()\n\t Output a string to stdout with a trailing newline.\n\nTotality: total",
  metadata: [],
  id: 8,
  ok: true,
  type: ":return",
}

// Partially Implemented — no metadata
export const interpret: FinalReply.Interpret = {
  result: "4",
  metadata: [],
  id: 9,
  ok: true,
  type: ":return",
}
