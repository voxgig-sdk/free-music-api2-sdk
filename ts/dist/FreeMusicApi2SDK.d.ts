import { V1ListEntity } from './entity/V1ListEntity';
import { V1LookupEntity } from './entity/V1LookupEntity';
import { V1SearchEntity } from './entity/V1SearchEntity';
import { V2ListEntity } from './entity/V2ListEntity';
import { V2LookupEntity } from './entity/V2LookupEntity';
import { V2SearchEntity } from './entity/V2SearchEntity';
export type * from './FreeMusicApi2Types';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { FreeMusicApi2EntityBase } from './FreeMusicApi2EntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class FreeMusicApi2SDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    V1List(entopts?: Record<string, any>): V1ListEntity;
    V1Lookup(entopts?: Record<string, any>): V1LookupEntity;
    V1Search(entopts?: Record<string, any>): V1SearchEntity;
    V2List(entopts?: Record<string, any>): V2ListEntity;
    V2Lookup(entopts?: Record<string, any>): V2LookupEntity;
    V2Search(entopts?: Record<string, any>): V2SearchEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): FreeMusicApi2SDK;
    tester(testopts?: any, sdkopts?: any): FreeMusicApi2SDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof FreeMusicApi2SDK;
export { stdutil, config, BaseFeature, FreeMusicApi2EntityBase, FreeMusicApi2SDK, SDK, };
