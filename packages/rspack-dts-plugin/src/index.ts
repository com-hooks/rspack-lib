import { buildDts } from './dts';
import { RspackDtsPluginOptions } from './types';

export class RspackDtsPlugin {
    options: RspackDtsPluginOptions;
    constructor(options: RspackDtsPluginOptions = {}) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.beforeRun.tap('beforeRun', () => {
            buildDts(this.options);
        });
    }
}                               