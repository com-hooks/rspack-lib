const { defineConfig } = require('rspack-lib');
const { RspackDtsPlugin } = require('rspack-dts-plugin');

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
        },
    ],
    rspack: {
        plugins: [new RspackDtsPlugin()],
        entry: './src/index.ts',
        devtool: false,
        resolve: {
            extensions: [".ts", ".js", ".json", ".wasm"],
        },
        externals: {
            
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    exclude: [/node_modules/],
                    loader: 'builtin:swc-loader',
                    options: {
                        jsc: {
                            parser: {
                                syntax: 'typescript',
                            },
                        },
                    },
                    type: 'javascript/auto',
                },
            ],
        },
    }
});