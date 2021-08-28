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

// Close the process
idrisProc.kill()
```

## What’s it for?
It’s primarily intended to serve as the foundation for my [VSCode extension](https://github.com/meraymond2/idris-vscode). By keeping it as a separate layer, it can easily be reused in case someone wants to make their own extension. Or for another editor that supports TypeScript.

Types are great documentation, and I’ve typed all of the s-expressions that the IDE returns in TypeScript. As the IDE protocol documentation is a bit spare, hopefully this will be of help to anyone implementing something similar in the future.

## Status
It works with Idris 1.3.X on all OSes.

It is also compatible with the most recent release of Idris 2, currently v0.4.0. This will _not_ maintain backwards compatibility with older versions of Idris 2 until it stabilises.

Not all IDE commands have been completely implemented in Idris2, see the issues for their current status.

If you experience any problems on other versions or OSes, please raise an issue. Confirming compatability should be as simple as running the tests.

A few request-types related to tt-terms have not been implemented yet, because I don’t understand what they’re supposed to do.

## Known Issues
The handling for unexpected errors could use a bit of work. For example, in Idris 1.3.2, you can cause the IDE to crash by passing in a line number that doesn’t exist, and there’s nothing at the moment to restart the IDE if it dies unexpectedly.

## Upgrade idris for CI

from the root:
```sh
niv update nixpkgs -b nixos-21.05
niv update nixpkgs-unstable -b nixpkgs-unstable
```
this will update to the newest nixos-unstable branch of nixpkgs.

To test the idris versions in the nix shell you can then use
```sh
nix-shell nix/idris1and2.nix
```
to get dropped into a shell with both `idris` and `idris2`.

To directly run the tests in the nix shell use:
```sh
nix-shell nix/idris1and2.nix --run "npm test"
```
