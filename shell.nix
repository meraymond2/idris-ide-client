{ nixpkgs ? import <nixpkgs> {} }:

with nixpkgs;
mkShell {
  name = "idris-client";
  buildInputs = [
      idris
      idris2
      nodejs
  ];
}
