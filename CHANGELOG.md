## Unreleased
### Fixed
- Fixed a bug in the lexer that would cause it to crash if reading a slash before a quote, such as in the function name `"\\"`.
- Fixed a bug in the lexer where it would return the escaped `\\` rather than the actual value `\` in strings.
