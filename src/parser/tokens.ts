type TokenType = "LEFT_PAREN" | "RIGHT_PAREN" | "NAT" | "STRING" | "SYMBOL"

interface TokenBase {
  type: TokenType
}

export interface LeftParen extends TokenBase {
  type: "LEFT_PAREN"
}

export interface RightParen extends TokenBase {
  type: "RIGHT_PAREN"
}

export interface Nat extends TokenBase {
  nat: number
  type: "NAT"
}

export interface Str extends TokenBase {
  str: string
  type: "STRING"
}

export interface Sym extends TokenBase {
  sym: string
  type: "SYMBOL"
}

export type Token = LeftParen | RightParen | Nat | Str | Sym
