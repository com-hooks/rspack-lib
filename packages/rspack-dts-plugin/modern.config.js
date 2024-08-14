import { defineConfig, moduleTools } from '@modern-js/module-tools';


export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      outDir: './dist/cjs',
      format: 'cjs',
      dts: false,
      externals: ['@rspack/core'],
    },
    {
      outDir: './dist/esm',
      format: 'esm',
      dts: false,
      externals: ['@rspack/core'],
    },
    {
      buildType: 'bundle',
      outDir: './dist/types',
      dts: {
        only: true,
      },
      externals: ['@rspack/core'],
    }
  ]
});