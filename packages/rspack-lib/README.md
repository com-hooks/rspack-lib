## rspack-lib

### example

- 运行目录创建 rspack.lib.config.js

```js
const { defineConfig } = require("rspack-lib");

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
