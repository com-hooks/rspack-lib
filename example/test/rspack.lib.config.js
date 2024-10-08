// @ts-check

const { defineConfig, usePreEsModuleConfig } = require('rspack-lib');
const { RspackDtsPlugin } = require('rspack-dts-plugin');

module.exports = defineConfig({
    lib: [
        {
            output: {
                filename: 'index.cjs',
                library: {
                    name: "exampleTest",
                    type: 'commonjs',
                },
            },
            plugins: [new RspackDtsPlugin({ only: true })],
        },
        usePreEsModuleConfig({
            output: {
                filename: 'index.mjs',
            },
          
        }),
    ],
    rspack: {
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