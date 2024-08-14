import * as ts from 'typescript';
import { getFileLoc, useDtsOnly, transpileOutputBundleList } from './utils';
import { logger } from 'node-logger-plus';
import { RspackDtsPluginOptions } from './types';

export function emitDts({
    rawCompilerOptions,
    fileNames,
    rslibDtsOptions,
}: {
    rawCompilerOptions: ts.CompilerOptions;
    fileNames: string[];
    rslibDtsOptions: RspackDtsPluginOptions;
}) {
    const compilerOptions = {
        ...rawCompilerOptions,
        noEmit: false,
        declaration: true, // 生成.d描述文件
        emitDeclarationOnly: true, // 仅发布声明文件
    };
    const createFiles = {};

    // 创建 TypeScript 编译器主机
    const host: ts.CompilerHost = ts.createCompilerHost(compilerOptions);
    host.writeFile = (fileName: string, contents: string) => {
        createFiles[fileName] = contents;
        if (rslibDtsOptions.only) {
            const newDeclarationOutPutText = transpileOutputBundleList.map(item => {
                return item.transpileOutput.outputText;
            }).join('');
            ts.sys.writeFile(fileName, newDeclarationOutPutText);
        } else {
            ts.sys.writeFile(fileName, contents);
        }
    };
    // 创建 TypeScript 编译器实例并构建 TypeScript 程序集
    const program = ts.createProgram(fileNames, compilerOptions, host);
    // 开始 emit 声明文件
    const emitResult = program.emit(undefined, undefined, undefined, undefined, {
        afterDeclarations: rslibDtsOptions.only ? [useDtsOnly({ compilerOptions })] : []
    });
    // Loop through all the input files
    console.log("### JavaScript\n");
    console.log(fileNames.join('\n'));
    console.log("### Type Definition\n");

    // 获取所有 TypeScript 编译器的��断信息并��选出 error 类型
    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics)
        // 考虑要不要显示呢？
        // .concat(transpileOutputBundleList.map(item => item.transpileOutput?.diagnostics ?? []).flat());

    const diagnosticMessages: string[] = [];
    logger.success("TypeScript EmitDiagnostics closed successfully");
    for (const diagnostic of allDiagnostics) {
        const fileLoc = getFileLoc(diagnostic);
        const message = `${fileLoc} - ${'error'} ${`TS${diagnostic.code}:`} ${ts.flattenDiagnosticMessageText(
            diagnostic.messageText,
            host.getNewLine(),
        )}`;
        diagnosticMessages.push(message);
    }
    if (diagnosticMessages.length) {
        logger.error(
            `Failed to emit declaration files.`,
        );
        for (const message of diagnosticMessages) {
            logger.error(message);
        }
    }
}