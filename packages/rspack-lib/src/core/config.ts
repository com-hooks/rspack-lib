import { defineConfig as rsDefineConfig } from '@rspack/cli';
import merge from 'lodash-es/merge';
import path from 'path';

type RspackOptions = Parameters<typeof rsDefineConfig>[0];
export interface RspackLibOptions {
    rspack: RspackOptions,
    lib: RspackOptions[],
}
export function defineConfig(config: RspackLibOptions): RspackLibOptions {
    return {
        rspack: rsDefineConfig(config.rspack),
        lib: config.lib.map(conf => rsDefineConfig(merge({}, config.rspack, conf))),
    }
}

export const configName = 'rspack.lib.config.js';
export class RsLibConfig {
    constructor() {
        
    }
    public static resolve(name: string) {
        // @ts-ignore
        return __non_webpack_require__(path.resolve(process.cwd(), name));
    }
}