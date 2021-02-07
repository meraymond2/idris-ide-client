export { IdrisClient } from "./client"
export {
  InfoReply,
  FinalReply,
  HolePremise,
  Metavariable,
  MessageMetadata,
  OutputReply,
  Reply,
  SourceMetadata,
} from "./reply"
export { Request } from "./request"
export { Decor } from "./s-exps"

import { IdrisClient } from "./client"
import { spawn } from "child_process"

const idrisProc = spawn("idris2", ["--ide-mode"])
const client = new IdrisClient(idrisProc.stdin, idrisProc.stdout, {
  debug: true,
})

client.loadFile("../temp.idr").then(() => {
  client
    .proofSearch("blue_rhs", 10, [])
    .then(console.log)
    .then(() => client.proofSearchNext())
    .then(console.log)
    .then(() => client.proofSearchNext())
    .then(console.log)
    .then(() => client.proofSearch("blue", 8, []))
    .then(console.log)
    .then(() => client.proofSearchNext())
    .then(console.log)
    .then(() => idrisProc.kill())
})
