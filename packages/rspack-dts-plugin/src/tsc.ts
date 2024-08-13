import * as ts from 'typescript';
import { getFileLoc } from './utils';
import { logger } from 'node-logger-plus';


export function emitDts({
    rawCompilerOptions,
    fileNames,
}: {
    rawCompilerOptions: ts.CompilerOptions;
    fileNames: string[];
}) {
    const compilerOptions = {
        ...rawCompilerOptions,
        noEmit: false,
        declaration: true, // 生成.d描述文件
        emitDeclarationOnly: true, // 仅发布声明文件
    };
    // 创建 TypeScript 编译器主机
    const host: ts.CompilerHost = ts.createCompilerHost(compilerOptions);
    // 创建 TypeScript 编译器实例并构建 TypeScript 程序集
    const program = ts.createProgram(fileNames, compilerOptions, host);
    // 开始 emit 声明文件
    const emitResult = program.emit();

    // 获取所有 TypeScript 编译器的��断信息并��选出 error 类型
    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

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