import * as ts from 'typescript';
import path from 'path';

export function loadTsconfig(tsconfigPath: string): ts.ParsedCommandLine {
    // Load and parse the TypeScript configuration file.
    const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    // If the configuration
    const configFileContent = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        path.dirname(tsconfigPath),
    );

    return configFileContent;
}

export function getFileLoc(diagnostic: ts.Diagnostic): string {
    if (diagnostic.file) {
        // Get the line and character position of the diagnostic.
        const { line, character } = ts.getLineAndCharacterOfPosition(
            diagnostic.file,
            diagnostic.start!,
        );
        return `${diagnostic.file.fileName}:${line + 1}:${character + 1}`;
    }

    return '';
}

export const transpileOutputBundleList: ({ transpileOutput: ts.TranspileOutput; sourceFile: ts.SourceFile; })[] = [];

export function useDtsOnly({
    compilerOptions,
}: {
    compilerOptions: ts.CompilerOptions
}) {
    return () => {
        return {
            transformSourceFile(node: ts.SourceFile) {
                return node;
            },
            transformBundle(node: ts.Bundle) {
                transpileOutputBundleList.splice(0, transpileOutputBundleList.length);
                node.sourceFiles.forEach(sourceFile => {
                    const transpileOutput = ts.transpileDeclaration(sourceFile.text, {
                        fileName: sourceFile.fileName,
                        compilerOptions,
                    });
                    transpileOutputBundleList.push({
                        transpileOutput,
                        sourceFile,
                    });
                });
                return node;
            }
        }
    }
}

export function formatSourceFileTextByNamespace(newDeclarationOutPutText: string) {
    return newDeclarationOutPutText.split("\n").map(line => {
        // /^export *namespace (.*) {$/
        if (/\.\/|\.\.\//.test(line) && /from/.test(line)) {
            return `    // ${line}`;
        }
        return '    ' + line.replace(' declare', '');
    }).join("\n");
}