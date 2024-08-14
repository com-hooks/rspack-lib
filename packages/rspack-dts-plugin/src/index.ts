import { buildDts } from './dts';
import { RspackDtsPluginOptions } from './types';
import { Compiler } from '@rspack/core';

export class RspackDtsPlugin {
    options: RspackDtsPluginOptions;
    constructor(options: RspackDtsPluginOptions = {}) {
        this.options = options;
    }
    apply(compiler: Compiler) {
        compiler.hooks.initialize.tap('initialize', () => {
            buildDts(this.options, compiler.options);
        });
    }
}

export {
    buildDts,
}