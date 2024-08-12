import { rslibPackages } from '../core';
import { configName } from '../const';
import { program } from 'commander';

program.option('c, --config <config>', '配置文件路径', configName)
.action(() => {
    rslibPackages();
});

export function runCli() {
   program.parse(process.argv);
}