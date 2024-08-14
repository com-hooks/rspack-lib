
/**
 * @des 相同字段tsconfig.json优先级最高
 */
export type RspackDtsPluginOptions = {
    /**
     * 是否生成ts
     * @default true
     */
    dts?: boolean;
    /**
      * 是否生成一个.d文件
      * @default false
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
    /**
     * library name
     * @default undefined;
     */
    name?: string;
} 