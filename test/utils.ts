import { existsSync, rmdirSync, rmSync, stat } from "fs"

/**
 * Remove all instances of a key, recursively, within the object. This is
 * necessary for the tests, to remove random values.
 */
export const omitKeys = (o: any, omit: string[]): any => {
  const recur = (next: any) => omitKeys(next, omit)
  if (Array.isArray(o)) return o.map(recur)
  else if (isObject(o))
    return Object.entries(o).reduce(
      (acc, [k, v]) => (omit.includes(k) ? acc : { ...acc, [k]: recur(v) }),
      {}
    )
  else return o
}

const isObject = (o: any): boolean =>
  typeof o === "object" && o !== null && !Array.isArray(o)

// The build files screw up the tests when running against files with similar names.
export const clean = () => {
  rmSync("build/", { force: true, recursive: true })
  rmSync("test/resources/test.ibc", { force: true })
}
