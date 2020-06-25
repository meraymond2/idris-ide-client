export declare type RequestType = ":add-clause" | ":add-missing" | ":apropos" | ":browse-namespace" | ":calls-who" | ":case-split" | ":docs-for" | ":interpret" | ":load-file" | ":make-case" | ":make-lemma" | ":make-with" | ":metavariables" | ":print-definition" | ":proof-search" | ":repl-completions" | ":type-of" | ":version" | ":who-calls";
export declare type DocMode = ":overview" | ":full";
export declare namespace Request {
    interface RequestBase {
        id: number;
        type: RequestType;
    }
    export interface AddClause extends RequestBase {
        id: number;
        line: number;
        name: string;
        type: ":add-clause";
    }
    export interface AddMissing extends RequestBase {
        id: number;
        line: number;
        name: string;
        type: ":add-missing";
    }
    export interface Apropos extends RequestBase {
        id: number;
        string: string;
        type: ":apropos";
    }
    export interface BrowseNamespace extends RequestBase {
        id: number;
        namespace: string;
        type: ":browse-namespace";
    }
    export interface CallsWho extends RequestBase {
        id: number;
        name: string;
        type: ":calls-who";
    }
    export interface CaseSplit extends RequestBase {
        id: number;
        line: number;
        name: string;
        type: ":case-split";
    }
    export interface DocsFor extends RequestBase {
        id: number;
        mode: DocMode;
        name: string;
        type: ":docs-for";
    }
    export interface Interpret extends RequestBase {
        expression: string;
        id: number;
        type: ":interpret";
    }
    export interface LoadFile extends RequestBase {
        id: number;
        path: string;
        type: ":load-file";
    }
    export interface MakeCase extends RequestBase {
        id: number;
        line: number;
        name: string;
        type: ":make-case";
    }
    export interface MakeLemma extends RequestBase {
        id: number;
        line: number;
        name: string;
        type: ":make-lemma";
    }
    export interface MakeWith extends RequestBase {
        id: number;
        line: number;
        name: string;
        type: ":make-with";
    }
    export interface Metavariables extends RequestBase {
        id: number;
        type: ":metavariables";
        width: number;
    }
    export interface PrintDefinition extends RequestBase {
        id: number;
        name: string;
        type: ":print-definition";
    }
    export interface ProofSearch extends RequestBase {
        id: number;
        line: number;
        name: string;
        hints: string[];
        type: ":proof-search";
    }
    export interface ReplCompletions extends RequestBase {
        id: number;
        name: string;
        type: ":repl-completions";
    }
    export interface TypeOf extends RequestBase {
        id: number;
        name: string;
        type: ":type-of";
    }
    export interface Version extends RequestBase {
        id: number;
        type: ":version";
    }
    export interface WhoCalls extends RequestBase {
        id: number;
        name: string;
        type: ":who-calls";
    }
    export {};
}
export declare type Request = Request.AddClause | Request.AddMissing | Request.Apropos | Request.BrowseNamespace | Request.CallsWho | Request.CaseSplit | Request.DocsFor | Request.Interpret | Request.LoadFile | Request.MakeCase | Request.MakeLemma | Request.MakeWith | Request.Metavariables | Request.PrintDefinition | Request.ProofSearch | Request.ReplCompletions | Request.TypeOf | Request.Version | Request.WhoCalls;
export declare const serialiseRequest: (req: Request) => string;
