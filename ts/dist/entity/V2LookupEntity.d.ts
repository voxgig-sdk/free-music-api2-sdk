import { FreeMusicApi2EntityBase } from '../FreeMusicApi2EntityBase';
import type { FreeMusicApi2SDK } from '../FreeMusicApi2SDK';
import type { Control } from '../types';
import type { V2Lookup, V2LookupListMatch } from '../FreeMusicApi2Types';
declare class V2LookupEntity extends FreeMusicApi2EntityBase<V2Lookup> {
    constructor(client: FreeMusicApi2SDK, entopts: any);
    make(this: V2LookupEntity): V2LookupEntity;
    list(this: any, reqmatch?: V2LookupListMatch, ctrl?: Control): Promise<V2LookupEntity[]>;
}
export { V2LookupEntity };
