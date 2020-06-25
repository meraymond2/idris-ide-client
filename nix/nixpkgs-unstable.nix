{ sources ? import ./sources.nix }: # import the sources
with
{
  overlay = _: pkgs:
    {
      niv = import sources.niv { }; # use the sources :)
    };
};
import
  sources.nixpkgs-unstable          # and use them again!
{ overlays = [ overlay ]; config = { }; }
