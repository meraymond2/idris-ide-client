# idris-ide-client
A TypeScript library for communicating with an Idris IDE process.

## Usage
```typescript
import { IdrisClient } from "idris-ide-client"

// Create an Idris process
const idrisProc = spawn("idris", ["--ide-mode"])

// Instantiate the client
const client = new IdrisClient(idrisProc.stdin, idrisProc.stdout)

// Load a file
await client.loadFile("test/resources/test.idr")

// Make a request
const reply = await client.typeOf("n")

// Do something with the reply
if (reply.ok) {
  console.log(reply.typeOf) // => "n : Nat"
} else {
  console.warn(reply.err)
}

// Close the client
client.close()
idrisProc.kill()
```

## What’s it for?
It’s primarily intended to serve as the foundation for my [VSCode extension](https://github.com/meraymond2/idris-vscode). By keeping it as a separate layer, it can easily be reused in case someone wants to make their own extension. Or for another editor that supports TypeScript.

Types are great documentation, and I’ve typed all of the s-expressions that the IDE returns in TypeScript. As the IDE protocol documentation is a bit spare, hopefully this will be of help to anyone implementing something similar in the future.

## Status
It’s been tested and is working on Idris 1.3.2, on some Linux distributions. When I can get Idris 2 to compile, it will hopefully be extended to that (as far as I understand, the protocol should be backwards compatible).

If you experience any problems on other versions or OSes, please raise an issue. Confirming compatability should be as simple as running the tests.

A few request-types related to tt-terms have not been implemented yet, because I don’t understand what they’re supposed to do.

## Known Issues
The handling for unexpected errors could use a bit of work. For example, in Idris 1.3.2, you can cause the IDE to crash by passing in a line number that doesn’t exist, and there’s nothing at the moment to restart the IDE if it dies unexpectedly.
