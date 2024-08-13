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

/**
 * 定义 rspack lib options
 * @param config 
 * @returns 
 */
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

/**
 * 预设的esmodule格式
 * @param options 
 * @returns 
 */
export function usePreEsModuleConfig(options: RspackOptions): RspackOptions {
    return merge({
        output: {
            module: true,
            filename: 'esm/index.js',
            chunkFormat: 'module',
            library: {
                type: 'module',
            }
        },
        optimization: {
            concatenateModules: true,
        },
        experiments: {
            outputModule: true,
        },
    }, options);
}