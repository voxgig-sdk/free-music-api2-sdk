import { FreeMusicApi2EntityBase } from '../FreeMusicApi2EntityBase';
import type { FreeMusicApi2SDK } from '../FreeMusicApi2SDK';
import type { Control } from '../types';
import type { V2List, V2ListListMatch } from '../FreeMusicApi2Types';
declare class V2ListEntity extends FreeMusicApi2EntityBase<V2List> {
    constructor(client: FreeMusicApi2SDK, entopts: any);
    make(this: V2ListEntity): V2ListEntity;
    list(this: any, reqmatch?: V2ListListMatch, ctrl?: Control): Promise<V2ListEntity[]>;
}
export { V2ListEntity };
