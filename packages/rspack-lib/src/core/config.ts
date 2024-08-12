import { defineConfig as rsDefineConfig } from '@rspack/cli';
import merge from 'lodash/merge';
import path from 'path';

type RspackOptions = Parameters<typeof rsDefineConfig>[0];
export interface RspackLibOptions {
    rspack: RspackOptions,
    lib?: RspackOptions[],
}

export function defineConfig(config: RspackLibOptions): RspackLibOptions {
    return {
        rspack: rsDefineConfig(config.rspack),
        lib: config?.lib?.map(conf => rsDefineConfig(merge({}, config.rspack, conf))),
    }
}

export class RsLibConfig {
    constructor() {
        
    }
    public static resolve(name: string) {
        return require(path.resolve(process.cwd(), name));
    }
}