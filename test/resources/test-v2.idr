module Main

data Cat = Cas | Luna | Sherlock

f : (cat: Cat) -> String

getName : (cat: Cat) -> String
getName Cas = "Cas"
getName Luna = "Luna"
getName Sherlock = "Sherlock"

plusTwo : (n: Nat) -> Nat
plusTwo n = ?plusTwo_rhs

g : (n: Nat) -> (b: Bool) -> String
g n b = ?g_rhs

num : Nat
num = ?n_rhs
