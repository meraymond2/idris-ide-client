import { parseReply } from "./reply-parser"
import { TokenIter } from "./lexer"
import { RootExpr, Expr, isRootExpr } from "../s-exps"

export const parse = (ts: TokenIter): Expr => {
  const next = ts.next()
  if (next === null) return []
  switch (next.type) {
    case "LEFT_PAREN": {
      let exprs = []
      while (ts.peek()?.type !== "RIGHT_PAREN") {
        exprs.push(parse(ts))
      }
      ts.next() // consume right paren
      return exprs
    }
    case "NAT":
      return next.nat
    case "STRING":
      return next.str
    case "SYMBOL":
      return next.sym
    case "RIGHT_PAREN":
      throw Error("Unexpected right paren encountered while parsing.")
  }
}

export const parseRootExpr = (plString: string): RootExpr => {
  const tokens = new TokenIter(plString)
  const expr: Expr = parse(tokens)
  if (!isRootExpr(expr)) throw "Reply not handled: " + JSON.stringify(plString)
  return expr
}

export { parseReply }
