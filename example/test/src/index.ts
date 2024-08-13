import { logger } from 'node-logger-plus';
import { Utils } from './utils';

export function testLibBuild() {
    logger.info('testLibBuild');
}

export type TestBuild = {
    a: string;
}
export function testLibBuild2() {
    logger.info(Utils);
}

export interface TestBuild2 {
    b: string;
}