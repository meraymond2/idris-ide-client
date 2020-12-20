let
  nixpkgs = import ./nixpkgs-unstable.nix { };
in
nixpkgs.mkShell {
  buildInputs =
    [
      nixpkgs.idris
      nixpkgs.idris2
    ];
}
