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

/**
 * Parses the s-exp representation of a string and into a JS string.
 * Unfortunately, we can’t just reuse JSON.parse. It does not have exhaustive
 * error handling; it assumes strings are well-formed.
 */
const parseEscapes = (s: string): string => {
  let res = ""
  let pos = 1 // skip opening quotes
  const end = s.length - 1 // skip closing quotes
  while (pos < end) {
    if (s[pos] === "\\") pos += 1

    res += s[pos]
    pos += 1
  }
  return res
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
        const start = pos
        pos += 1 // consume the opening quotes
        let escapes = 0
        while (msg[pos] !== '"' || escapes % 2 !== 0) {
          if (msg[pos] === "\\") escapes += 1
          else escapes = 0
          pos += 1
        }
        pos += 1 // consume the closing quotes
        const str = parseEscapes(msg.slice(start, pos))
        tokens.push({ type: "STRING", str })
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
