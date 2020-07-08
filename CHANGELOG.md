## Unreleased
### Added
### Changed
### Fixed

## v0.1.3
### Added
### Changed
- Breaking: `ok` in FinalReply is now a Boolean discriminator.

### Fixed
- Handle a bug where the Idris reply length-header doesn’t match the actual message length on Windows.

## v0.1.2
### Added
- Support for connecting to an Idris process over sockets.

### Changed
- Breaking: IdrisClient constructor now accepts an input stream and an output stream, and no longer manages the Idris process.

### Fixed
- Fixed a bug in the lexer that would cause it to crash if reading a slash before a quote, such as in the function name `"\\"`.
- Fixed a bug in the lexer where it would return the escaped `\\` rather than the actual value `\` in strings.
