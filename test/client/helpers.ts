import { MessageMetadata } from "../../src/reply"

/**
 * Replace dynamic tt-term serialisation, to allow reply comparison across versions.
 */
export const testTT = (
  metadata: Array<MessageMetadata>
): Array<MessageMetadata> =>
  metadata.map((md) =>
    md.metadata.ttTerm
      ? { ...md, metadata: { ...md.metadata, ttTerm: "TEST" } }
      : md
  )
