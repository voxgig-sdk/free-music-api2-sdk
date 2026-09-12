import { FreeMusicApi2EntityBase } from '../FreeMusicApi2EntityBase';
import type { FreeMusicApi2SDK } from '../FreeMusicApi2SDK';
import type { Control } from '../types';
import type { V1Search, V1SearchListMatch } from '../FreeMusicApi2Types';
declare class V1SearchEntity extends FreeMusicApi2EntityBase<V1Search> {
    constructor(client: FreeMusicApi2SDK, entopts: any);
    make(this: V1SearchEntity): V1SearchEntity;
    list(this: any, reqmatch?: V1SearchListMatch, ctrl?: Control): Promise<V1SearchEntity[]>;
}
export { V1SearchEntity };
