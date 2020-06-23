import { spawn } from "child_process"
import { IdrisClient } from "idris-ide-client"

const idrisProc = spawn("idris", ["--ide-mode"])
const client = new IdrisClient(idrisProc.stdin, idrisProc.stdout)

client
  .interpret("2 + 2")
  .then(console.log)
  .then(() => idrisProc.kill())
