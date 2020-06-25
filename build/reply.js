"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// FinalReply instances don’t inherit, so that they can be ok/err unions.
var FinalReply;
(function (FinalReply) {
    FinalReply.isFinalReply = (reply) => reply.type === ":return";
})(FinalReply = exports.FinalReply || (exports.FinalReply = {}));
//# sourceMappingURL=reply.js.map