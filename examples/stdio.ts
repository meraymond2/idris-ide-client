import { spawn } from "child_process"
import { IdrisClient } from "idris-ide-client"

/* Idris 1 */
{
  const idrisProc = spawn("idris", ["--ide-mode"])
  const client = new IdrisClient(idrisProc.stdin, idrisProc.stdout)

  client
    .interpret("2 + 2")
    .then(console.log)
    .then(() => idrisProc.kill())
}

/* Idris 2 */
{
  const idrisProc = spawn("idris2", ["--ide-mode", "--find-ipkg"])
  const client = new IdrisClient(idrisProc.stdin, idrisProc.stdout)

  client
    .iterpret("2 + 2")
    .then(console.log)
    .then(() => idrisProc.kill())
}
