import { Compiler, rspack, Stats } from '@rspack/core';
import { RsLibConfig, RspackLibOptions } from './config';
import { logger } from 'node-logger-plus';
import { program } from 'commander';


export function rslibPackages() {
    try {
        const config = program.getOptionValue('config');
        runBuilds(RsLibConfig.resolve(config));
    } catch (err) {
        logger.error(err.message.split('\n')[0]);
    }
}

export function runBuilds(libConfig: RspackLibOptions, callback?: (err: Error, stats: Stats, index: number) => void): Compiler | void {
    const libLen = libConfig?.lib?.length ?? 0;
    if (!libLen && !libConfig.rspack) {
        logger.info(`lib length ${libLen}`, 'build closed');
        return;
    }
    if (!libLen) {
        return rspack(libConfig.rspack, (err, stats) => {
            callback?.(err, stats, -1);
            const error = err || stats?.hasErrors();
            if (error) {
                logger.error(error);
            }
            logger.success('Successify!');
        });
    }
    libConfig.lib.forEach((conf, index) => {
        const name = conf?.output?.filename ?? 'library';
        try {
            return rspack(conf, (err, stats) => {
                callback?.(err, stats, index);
                const error = err || stats?.hasErrors();
                if (error) {
                    throw error;
                }
                logger.success(`[${name}] index: ${index} ` + 'Successify!');
            });

        } catch (err) {
            logger.error(`[${name}] index: ${index} ` + err.message.split('\n')[0]);
        }
    });
}