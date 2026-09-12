import { FreeMusicApi2EntityBase } from '../FreeMusicApi2EntityBase';
import type { FreeMusicApi2SDK } from '../FreeMusicApi2SDK';
import type { Control } from '../types';
import type { V1Lookup, V1LookupListMatch } from '../FreeMusicApi2Types';
declare class V1LookupEntity extends FreeMusicApi2EntityBase<V1Lookup> {
    constructor(client: FreeMusicApi2SDK, entopts: any);
    make(this: V1LookupEntity): V1LookupEntity;
    list(this: any, reqmatch?: V1LookupListMatch, ctrl?: Control): Promise<V1LookupEntity[]>;
}
export { V1LookupEntity };
