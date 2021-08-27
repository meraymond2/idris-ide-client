# Markdown!

*more* _markdown_

[text](link)

```idris
module Main

import Data.Vect

data Cat = Cas | Luna | Sherlock

f : (cat: Cat) -> String

getName : (cat: Cat) -> String
getName Cas = "Cas"
getName Luna = "Luna"
getName Sherlock = "Sherlock"
```

## Section 2

~~~idris2
plusTwo : (n: Nat) -> Nat
plusTwo n = ?plusTwo_rhs

g : (n: Nat) -> (b: Bool) -> String
g n b = ?g_rhs

num : Nat
num = ?n_rhs

append : Vect n a -> Vect m a -> Vect (n + m) a

~~~

The block has to include `idris` something. It can be idris, idris2, idris3 (future proofing), etc.
