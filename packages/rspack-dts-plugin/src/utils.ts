import * as ts from 'typescript';
// @ts-ignore
import path from 'node:path';

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

