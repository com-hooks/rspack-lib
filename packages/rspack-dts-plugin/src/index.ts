import { buildDts } from './dts';
import { RspackDtsPluginOptions } from './types';

export class RspackDtsPlugin {
    options: RspackDtsPluginOptions;
    constructor(options: RspackDtsPluginOptions = {}) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.initialize.tap('initialize', () => {
            buildDts(this.options);
        });
    }
}

export {
    buildDts,
}