const { defineConfig } = require('@rspack/cli');
const { rspack } = require('@rspack/core');
const { logger } = require('node-logger-plus');
const merge = require('lodash/merge');
const shareConfig = require('./config');

rspack(merge({}, shareConfig, defineConfig({
    output: {
        filename: 'cjs/index.js',
        library: {
            type: 'commonjs',
        }
    },
})), (err, stats) => {
    if (err || stats.hasErrors()) {
        logger.error('commonjs: ' + err);
        return;
    }
    // 处理完成
    logger.success('commonjs Successify!');
});
