
module.exports = {
    entry: "./src/index.ts",
    devtool: false,
    watch: true,
    resolve: {
        extensions: ['.ts', '.js', '.json', ".wasm"],
    },
    externals: {
        '@rspack/cli': '@rspack/cli',
        '@rspack/core': '@rspack/core',
        'ts-node': 'ts-node',
        'node-logger-plus': 'node-logger-plus',
        'commander': 'commander',
        'lodash': 'lodash',
        'path': 'path',
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