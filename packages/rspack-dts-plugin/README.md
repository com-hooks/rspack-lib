### ts.d文件自动生成
### 使用

```js
const { RspackDtsPlugin } = require('rspack-dts-plugin');

// rspack.config.js
module.exports = {
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
```

### API 
- 触发编译 dts
```js
declare function buildDts(options: RspackDtsPluginOptions): void;
```

### RspackDtsPluginOptions
```ts
/**
 * @des 相同字段tsconfig.json优先级最高
 */
type RspackDtsPluginOptions = {
    /**
     * 是否生成ts
     * @default true
     */
    dts?: boolean;
    /**
      * 是否生成一个.d文件
      * @default true
      */
    only?: boolean;
    /**
     * ts 输出目录
     * @default ./dist/types
     */
    outputDir?: string;
    /**
     * ts 输出文件
     * @default ./dist/types/index
     */
    outFile?: string;
    /**
     * ts rootDir
     */
    rootDir?: 'src';
};
```