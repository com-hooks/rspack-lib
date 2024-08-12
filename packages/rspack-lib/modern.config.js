import { defineConfig, moduleTools } from '@modern-js/module-tools';


export default defineConfig({
  plugins: [moduleTools()],
  buildConfig: {
    outDir: './dist/cjs',
    format: 'cjs',
    dts: {
        distPath: '../types',
        only: false,
        respectExternal: true,
    }
  }
});