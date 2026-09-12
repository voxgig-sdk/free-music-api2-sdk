import { FreeMusicApi2EntityBase } from '../FreeMusicApi2EntityBase';
import type { FreeMusicApi2SDK } from '../FreeMusicApi2SDK';
import type { Control } from '../types';
import type { V1List, V1ListListMatch } from '../FreeMusicApi2Types';
declare class V1ListEntity extends FreeMusicApi2EntityBase<V1List> {
    constructor(client: FreeMusicApi2SDK, entopts: any);
    make(this: V1ListEntity): V1ListEntity;
    list(this: any, reqmatch?: V1ListListMatch, ctrl?: Control): Promise<V1ListEntity[]>;
}
export { V1ListEntity };
