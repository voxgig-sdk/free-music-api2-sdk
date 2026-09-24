"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeMusicApi2Error = void 0;
class FreeMusicApi2Error extends Error {
    isFreeMusicApi2Error = true;
    sdk = 'FreeMusicApi2';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.FreeMusicApi2Error = FreeMusicApi2Error;
//# sourceMappingURL=FreeMusicApi2Error.js.map