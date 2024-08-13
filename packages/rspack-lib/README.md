## rspack-lib

### install
```shell
$ npm install rspack-lib --save-dev rspack-dts-plugin --save-dev
# or
# pnpm add rspack-lib -D rspack-dts-plugin -D
```

### 命令
- package.json
- rspack-lib 启动
- rspack-lib --config 自定义加载config文件
```json
  {
    "scripts": {
      "lib": "rspack-lib",
      "lib2": "rspack-lib --config rspack.lib2.config.js",
    },
  }
```
- 启动编译
```shell
pnpm lib
```

### Api
#### runBuilds
```js
export declare function runBuilds(libConfig: RspackLibOptions): boolean;
const { runBuilds } = require("rspack-lib");
runBuilds({
  // RspackLibOptions 配置

}, (err, stats, index) => {
    const error = err || stats?.hasErrors();
    if (error) {
      
    }
})
```

### 配置文件
- 运行目录创建 rspack.lib.config.js
- `rspack-dts-plugin` https://www.npmjs.com/package/rspack-dts-plugin?activeTab=readme
```js
const { defineConfig } = require("rspack-lib");
const { RspackDtsPlugin } = require('rspack-dts-plugin');

module.exports = defineConfig({
  // 会合并rspack中的配置
  lib: [
    // 编译commonjs
    {
      output: {
        filename: "index.cjs",
        library: {
          type: "commonjs2",
        },
      },
    },
    // 编译esmodule
    {
      output: {
        module: true,
        chunkFormat: "module",
        filename: "index.mjs",
        chunkFormat: "module",
        library: {
          type: "module",
        },
      },
      optimization: {
        concatenateModules: true,
      },
      experiments: {
        outputModule: true,
      },
    },
  ],
  // rspack 配置
  rspack: {
    // 生成ts描述文件
     plugins: [new RspackDtsPlugin()],
    entry: "./src/index.ts",
    devtool: false,
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
    externals: {

    },
  },
});
```
