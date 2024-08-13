import { defineConfig as rsDefineConfig } from '@rspack/cli';
import { RspackPluginInstance } from '@rspack/core';
import merge from 'lodash/merge';
import path from 'path';

type RspackOptions = Parameters<typeof rsDefineConfig>[0];
export {
    RspackPluginInstance,
    RspackOptions,
}
export interface RspackLibOptions {
    rspack: RspackOptions,
    lib?: RspackOptions[],
    plugins?: RspackPluginInstance[],
}

export function defineConfig(config: RspackLibOptions): RspackLibOptions {
    return {
        rspack: rsDefineConfig(config.rspack),
        lib: config?.lib?.map(conf => rsDefineConfig(merge({}, config.rspack, conf))),
        plugins: config.plugins ?? [],
    }
}

export class RsLibConfig {
    constructor() {

    }
    public static resolve(name: string) {
        return require(path.resolve(process.cwd(), name));
    }
}