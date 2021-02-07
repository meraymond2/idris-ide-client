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
  debug: false,
})

client.loadFile("temp.idr").then(() => {
  client
    // .generateDef(5, "append")
    // .then(console.log)
    // .then(() => client.version())

    .version()
    .then(console.log)
    .then(() => idrisProc.kill())
})
