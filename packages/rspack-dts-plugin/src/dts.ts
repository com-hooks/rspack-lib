import { loadTsconfig } from './utils';
import { emitDts } from './tsc';
import { RspackDtsPluginOptions } from './types';
import { mergeRspackDtsPluginOptions } from './config';
import { logger } from 'node-logger-plus';

const { options: rawCompilerOptions, fileNames } = loadTsconfig('tsconfig.json');

export function buildDts(options: RspackDtsPluginOptions) {
    const { dts, only, outputDir, rootDir, outFile } = mergeRspackDtsPluginOptions(options);
    if (!dts) {
        return;
    }

    if (only) {
        rawCompilerOptions.outFile = rawCompilerOptions.outFile ?? outFile;
        rawCompilerOptions.declarationDir = null;
    } else {
        rawCompilerOptions.declarationDir = rawCompilerOptions.declarationDir ?? outputDir;
        rawCompilerOptions.rootDir = rawCompilerOptions.rootDir ?? rootDir;
    }
    // 构建 TypeScript 声明文件
    logger.info(`Building DTS configuration`);
    emitDts({
        rawCompilerOptions,
        fileNames,
    })
}