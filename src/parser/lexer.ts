import { Token } from "./tokens"

const whitespace = (char: string): boolean =>
  char === " " || char === "\t" || char === "\n" || char === "\r"

const isNumeric = (char: string): boolean => {
  const charCode = char.charCodeAt(0)
  return charCode >= 48 && charCode <= 57
}

const isAlpha = (char: string): boolean => {
  const charCode = char.charCodeAt(0)
  return (
    (65 <= charCode && charCode <= 90) || (97 <= charCode && charCode <= 122)
  )
}

export const lex = (msg: string): Token[] => {
  let pos = 0
  let tokens: Token[] = []
  while (pos < msg.length) {
    const char = msg[pos]
    switch (char) {
      case "(":
        tokens.push({ type: "LEFT_PAREN" })
        pos += 1
        break
      case ")":
        tokens.push({ type: "RIGHT_PAREN" })
        pos += 1
        break
      case ":": {
        const start = pos
        pos += 1
        while (isAlpha(msg[pos]) || msg[pos] === "-") {
          pos += 1
        }
        tokens.push({ type: "SYMBOL", sym: msg.slice(start, pos) })
        break
      }
      case '"': {
        pos += 1 // skip the opening quotes
        const start = pos
        // FIX ME!
        while (!(msg[pos] === '"' && msg[pos - 1] !== "\\")) {
          pos += 1
        }
        tokens.push({ type: "STRING", str: msg.slice(start, pos) })
        pos += 1 // skip the closing quotes
        break
      }
      default: {
        if (isNumeric(char)) {
          const start = pos
          while (isNumeric(msg[pos])) {
            pos += 1
          }
          tokens.push({ type: "NAT", nat: parseInt(msg.slice(start, pos)) })
          break
        } else if (whitespace(char)) {
          pos += 1
          break
        } else {
          throw (
            "Unhandled character: " +
            msg[pos] +
            " at " +
            pos +
            " in " +
            msg.slice(pos - 100, pos + 100)
          )
        }
      }
    }
  }
  return tokens
}
