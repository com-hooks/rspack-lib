import { rspack } from '@rspack/core';
import { RsLibConfig, configName, RspackLibOptions } from './config';
import { logger } from 'node-logger-plus';

export function rslibPackages() {
    try {
        runBuilds(RsLibConfig.resolve(configName));
    } catch (err) {
        logger.error(err.message.split('\n')[0]);
    }
}

function runBuilds(libConfig: RspackLibOptions) {
    const libLen = libConfig?.lib?.length ?? 0;
    if (!libLen && !libConfig.rspack?.output?.library) {
        logger.info(`lib length ${libLen}`, 'build closed');
        return false;
    }
    if (!libLen) {
        rspack(libConfig.rspack, (err, stats) => {
            const error = err || stats?.hasErrors();
            if (error) {
                logger.error(error);
            }
            logger.success('Successify!');
        });
        return false;
    }
    libConfig.lib.forEach((conf, index) => {
        const name = conf?.output?.filename ?? 'library';
        try {
            rspack(conf, (err, stats) => {
                const error = err || stats?.hasErrors();
                if (error) {
                    throw error;
                }
                logger.success(`[${name}] index: ${index} ` + 'Successify!');
            });

        } catch (err) {
            logger.error(`[${name}] index: ${index}` + err.message.split('\n')[0]);
        }
    });
    return true;
}