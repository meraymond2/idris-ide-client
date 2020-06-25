import { RootExpr } from "../s-exps";
import { RequestType } from "../request";
import { Reply } from "../reply";
export declare const parseReply: (expr: RootExpr, requestType: RequestType) => Reply;
