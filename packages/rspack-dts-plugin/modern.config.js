import { defineConfig, moduleTools } from '@modern-js/module-tools';


export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: [
    {
      outDir: './dist/cjs',
      format: 'cjs',
      dts: false,
    },
    {
      outDir: './dist/esm',
      format: 'esm',
      dts: false,
    },
    {
      buildType: 'bundle',
      outDir: './dist/types',
      dts: {
        only: true,
      },
    }
  ]
});