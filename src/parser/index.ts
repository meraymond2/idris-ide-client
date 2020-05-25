import { parseReply } from "./reply-parser"
import { Token } from "./tokens"
import { lex } from "./lexer"
import { deserialise } from "./expr-parser"
import { RootExpr, Expr, isRootExpr } from "../s-exps"

const parseRootExpr = (plString: string): RootExpr => {
  const tokenArray: Token[] = lex(plString)
  const expr: Expr = deserialise(tokenArray)[0] // deserialise wraps everything in an extra []
  if (!isRootExpr(expr)) throw "Reply not handled: " + JSON.stringify(plString)
  return expr
}

export { parseRootExpr, parseReply }
