import { Context } from './Context';
declare class FreeMusicApi2Error extends Error {
    isFreeMusicApi2Error: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { FreeMusicApi2Error };
