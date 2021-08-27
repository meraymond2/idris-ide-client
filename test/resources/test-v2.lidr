This is some documentation.

More documentation.

> module Main
>
> import Data.Vect
>
> data Cat = Cas | Luna | Sherlock
>
> f : (cat: Cat) -> String
>
> getName : (cat: Cat) -> String
> getName Cas = "Cas"
> getName Luna = "Luna"
> getName Sherlock = "Sherlock"

An intermission.

> plusTwo : (n: Nat) -> Nat
> plusTwo n = ?plusTwo_rhs
>
> g : (n: Nat) -> (b: Bool) -> String
> g n b = ?g_rhs
>
> num : Nat
> num = ?n_rhs
>
> append : Vect n a -> Vect m a -> Vect (n + m) a

Some closing thoughts.
