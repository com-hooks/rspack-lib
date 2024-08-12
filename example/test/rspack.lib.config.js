const { defineConfig } = require('rspack-lib');

module.exports = defineConfig({
    lib: [
        {

            output: {
                filename: 'index.cjs',
                library: {
                    type: 'commonjs2',
                }
            }
        },
        {
            output: {
                module: true,
                filename: 'index.mjs',
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
        }
    ],
    rspack: {
        entry: './src/index.ts',
        devtool: false,
        resolve: {
            extensions: [".ts", ".js", ".json", ".wasm"],
        },
        externals: {
        },
    }
});