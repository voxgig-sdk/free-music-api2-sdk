import { FreeMusicApi2EntityBase } from '../FreeMusicApi2EntityBase';
import type { FreeMusicApi2SDK } from '../FreeMusicApi2SDK';
import type { Control } from '../types';
import type { V2Search, V2SearchLoadMatch } from '../FreeMusicApi2Types';
declare class V2SearchEntity extends FreeMusicApi2EntityBase<V2Search> {
    constructor(client: FreeMusicApi2SDK, entopts: any);
    make(this: V2SearchEntity): V2SearchEntity;
    load(this: any, reqmatch?: V2SearchLoadMatch, ctrl?: Control): Promise<V2SearchEntity>;
}
export { V2SearchEntity };
