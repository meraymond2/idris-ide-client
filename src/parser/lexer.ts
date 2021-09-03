import { Token } from "./tokens"

const whitespace = (char: string): boolean =>
  char === " " || char === "\t" || char === "\n" || char === "\r"

const isNumeric = (char: string): boolean => {
  const charCode = char.charCodeAt(0)
  return charCode >= 48 && charCode <= 57
}

// Is a character part of a keyword: alpha-numeric or a hyphen.
const isKeywordChar = (char: string): boolean => {
  const charCode = char.charCodeAt(0)
  return (
    (97 <= charCode && charCode <= 122) ||
    char === "-" ||
    (65 <= charCode && charCode <= 90)
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

export class TokenIter {
  private text: string
  private pos: number

  constructor(msg: string) {
    this.pos = 0
    this.text = msg
  }

  advance = (n: number = 1): void => {
    this.pos += n
  }

  next = (): Token | null => {
    if (this.pos >= this.text.length) return null

    const char = this.text[this.pos]
    switch (char) {
      case "(":
        this.advance()
        return { type: "LEFT_PAREN" }
      case ")":
        this.advance()
        return { type: "RIGHT_PAREN" }
      case ":": {
        const start = this.pos
        this.advance() // advance over the colon
        while (isKeywordChar(this.text[this.pos])) {
          this.advance()
        }
        return { type: "SYMBOL", sym: this.text.slice(start, this.pos) }
      }
      case '"': {
        const start = this.pos
        this.advance() // consume the opening quotes
        let escapes = 0
        while (this.text[this.pos] !== '"' || escapes % 2 !== 0) {
          if (this.text[this.pos] === "\\") {
            escapes += 1
          } else {
            escapes = 0
          }
          this.advance()
        }
        this.advance() // consume the closing quotes
        const str = parseEscapes(this.text.slice(start, this.pos))
        return { type: "STRING", str }
      }
      default: {
        if (isNumeric(char)) {
          const start = this.pos
          while (isNumeric(this.text[this.pos])) {
            this.advance()
          }
          return {
            type: "NAT",
            nat: parseInt(this.text.slice(start, this.pos)),
          }
        } else if (whitespace(char)) {
          this.advance()
          return this.next()
        } else {
          throw (
            "Unhandled character: " +
            this.text[this.pos] +
            " at " +
            this.pos +
            " in " +
            this.text.slice(this.pos - 100, this.pos + 100)
          )
        }
      }
    }
  }

  peek = (): Token | null => {
    const start = this.pos
    const token = this.next()
    this.pos = start
    return token
  }
}
