import * as fs from 'fs';

export default class FileUtils {
    static isDirectory(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }
}