import { parseReply } from "./reply-parser";
import { RootExpr } from "../s-exps";
declare const parseRootExpr: (plString: string) => RootExpr;
export { parseRootExpr, parseReply };
