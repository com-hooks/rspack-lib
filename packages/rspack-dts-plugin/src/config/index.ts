import { RspackDtsPluginOptions } from '../types';
export const rspackDtsPluginOptions: RspackDtsPluginOptions = {
    dts: true,
    only: false,
    outputDir: './dist/types',
    outFile: './dist/types/index',
    rootDir: 'src',
    name: undefined,
}

export function mergeRspackDtsPluginOptions(...options: RspackDtsPluginOptions[]): RspackDtsPluginOptions {
    return Object.assign({}, rspackDtsPluginOptions, ...options);
}

