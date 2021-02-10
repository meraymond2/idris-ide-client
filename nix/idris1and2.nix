let
  nixpkgs = import ./nixpkgs.nix { };
  nixpkgs-unstable = import ./nixpkgs-unstable.nix { };
in
nixpkgs.mkShell {
  buildInputs =
    [
      nixpkgs.idris
      nixpkgs-unstable.idris2
    ];
}
