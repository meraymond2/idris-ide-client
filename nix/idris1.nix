let
  nixpkgs = import ./nixpkgs.nix { };
in
nixpkgs.mkShell {
  buildInputs =
    [
      nixpkgs.idris
    ];
}
