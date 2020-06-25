export declare type ReplyType = ":output" | ":protocol-version" | ":return" | ":set-prompt" | ":warning" | ":write-string";
export declare const isReplyType: (s: string) => s is ReplyType;
export declare type Expr = string | number | Expr[];
export declare type RootExpr = [ReplyType, Expr, number];
export declare const isRootExpr: (expr: Expr) => expr is RootExpr;
export declare type Decor = ":bound" | ":data" | ":function" | ":keyword" | ":module" | ":metavar" | ":type";
export declare type S_ExpBool = ":True" | ":False";
export declare type Decl = [string, MsgMetadataExpr[]];
declare type AttributePair = [":decor", Decor] | [":doc-overview", string] | [":key", string] | [":implicit", S_ExpBool] | [":name", string] | [":namespace", string] | [":source-file", string] | [":tt-term", string] | [":type", string];
declare type StartPos = number;
declare type Length = number;
export declare type MsgMetadataExpr = [StartPos, Length, AttributePair[]];
declare type LineNum = number;
declare type ColNum = number;
declare type SourceMetaLoc = [[":filename", string], [":start", LineNum, ColNum], [":end", LineNum, ColNum]];
export declare type SourceMetadataExpr = [SourceMetaLoc, AttributePair[]];
export declare namespace S_Exp {
    export type ProtocolVersion = number;
    export type SetPrompt = string;
    export type WriteString = string;
    export type Warning = [string, [LineNum, ColNum], [LineNum, ColNum], string, MsgMetadataExpr[]];
    export type Output = [":ok", [":highlight-source", SourceMetadataExpr[]]];
    export type AddClause = [":ok", string];
    export type AddMissing = [":ok", string];
    export type AproposOk = [":ok", string, MsgMetadataExpr[]];
    export type AproposErr = [":error", "No results found", []];
    export type Apropos = AproposOk | AproposErr;
    export const isOkApropos: (payload: Apropos) => payload is AproposOk;
    export type BrowseNamespaceOk = [":ok", [string[], Decl[]]];
    export type BrowseNamespaceErr = [":error", "Invalid or empty namespace"];
    export type BrowseNamespace = BrowseNamespaceOk | BrowseNamespaceErr;
    export const isOkBrowseNamespace: (payload: BrowseNamespace) => payload is BrowseNamespaceOk;
    /**
     * Length of caller/references is 0 or 1.
     */
    export type CallsWho = [":ok", [Decl, Decl[]][]];
    export type CaseSplitOk = [":ok", string];
    export type CaseSplitErr = [":error", string];
    export type CaseSplit = CaseSplitOk | CaseSplitErr;
    export const isOkCaseSplit: (payload: CaseSplit) => payload is CaseSplitOk;
    export type DocsForOk = [":ok", string, MsgMetadataExpr[]];
    export type DocsForErr = [":error", string];
    export type DocsFor = DocsForOk | DocsForErr;
    export const isOkDocsFor: (payload: DocsFor) => payload is DocsForOk;
    export type InterpretOk = [":ok", string, MsgMetadataExpr[]];
    export type InterpretErr = [":error", string] | [":error", string, MsgMetadataExpr[]];
    export type Interpret = InterpretOk | InterpretErr;
    export const isOkInterpret: (payload: Interpret) => payload is InterpretOk;
    export type LoadFileOk = [":ok", []];
    export type LoadFileErr = [":error", string];
    export type LoadFile = LoadFileOk | LoadFileErr;
    export const isOkLoadFile: (payload: LoadFile) => payload is LoadFileOk;
    export type MakeCase = [":ok", string];
    export type MakeLemmaOk = [":ok", [":metavariable-lemma", [":replace-metavariable", string], [":definition-type", string]]];
    export type MakeLemmaErr = [":error", string];
    export type MakeLemma = MakeLemmaOk | MakeLemmaErr;
    export const isOkMakeLemma: (payload: MakeLemma) => payload is MakeLemmaOk;
    export type MakeWith = [":ok", string];
    type ScopeVar = [string, string, MsgMetadataExpr[]];
    type Metavar = [string, ScopeVar[], [string, MsgMetadataExpr[]]];
    export type Metavariables = [":ok", Metavar[]];
    export type PrintDefinitionOk = [":ok", string, MsgMetadataExpr[]];
    export type PrintDefinitionErr = [":error", string];
    export type PrintDefinition = PrintDefinitionOk | PrintDefinitionErr;
    export const isOkPrintDefinition: (payload: PrintDefinition) => payload is PrintDefinitionOk;
    export type ProofSearch = [":ok", string];
    export type ReplCompletions = [":ok", [string[], ""]];
    export type TypeOfOk = [":ok", string, MsgMetadataExpr[]];
    export type TypeOfErr = [":error", string];
    export type TypeOf = TypeOfOk | TypeOfErr;
    export const isOkTypeOf: (payload: TypeOf) => payload is TypeOfOk;
    export type Version = [":ok", [[number, number, number], string[]]];
    /**
     * Length of callee/references will be 0 or 1.
     */
    export type WhoCalls = [":ok", [Decl, Decl[]][]];
    export {};
}
export {};
