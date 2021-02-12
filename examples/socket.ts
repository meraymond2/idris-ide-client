import { spawn } from "child_process"
import { IdrisClient } from "idris-ide-client"
import { Socket } from "net"

/* Idris 1 */
{
  const idrisProc = spawn("idris", ["--ide-mode-socket"])

  // When you start Idris in socket IDE mode, it prints the socket port.
  const portProm: Promise<number> = new Promise((res) =>
    idrisProc.stdout.once("data", (chunk: Buffer) =>
      res(parseInt(chunk.toString("utf8")))
    )
  )
  const socket = new Socket({ readable: true, writable: true })

  const port = await portProm
  socket.connect({ port })

  const client = new IdrisClient(socket, socket)
  client
    .interpret("2 + 2")
    .then(console.log)
    .then(() => socket.destroy())
}

/* Idris 2 */
{
  const idrisProc = spawn("idris2", ["--ide-mode-socket", "--find-ipkg"])

  // When you start Idris in socket IDE mode, it prints the socket port.
  const portProm: Promise<number> = new Promise((res) =>
    idrisProc.stdout.once("data", (chunk: Buffer) =>
      res(parseInt(chunk.toString("utf8")))
    )
  )
  const socket = new Socket({ readable: true, writable: true })

  const port = await portProm
  socket.connect({ port })

  const client = new IdrisClient(socket, socket)
  client
    .interpret("2 + 2")
    .then(console.log)
    .then(() => {
      client.close()
      socket.destroy()
    })
}
