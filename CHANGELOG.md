## Unreleased
### Added
### Changed
### Fixed

## v0.1.6
### Added
### Changed
- Added workarounds to the reply-parser to handle Idris 2, version 0.6.0.
### Fixed

## v0.1.5
### Added
- Added the new Idris2-specific commands :generate-def, :generate-def-next and :proof-search-next.
- Added a typeAt method, which implements the Idris2 :type-of + location command.
### Changed
- The client now keeps track of the protocol version, and some requests are serialised differently depending on the version.
### Fixed
- Partially fixed a bug where the :version request didn't work with Idris2 because of a breaking change in the protocol.

## v0.1.4
### Added
- Added a listening flag to the client, so it can stop listening before closing, to handle Idris2 printing invalid messages on exit.
### Changed
- A few workarounds have been added to the reply-parser to handle Idris 2, version 0.2.1.
### Fixed
- Cover the case where :add-clause returns an error.

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
