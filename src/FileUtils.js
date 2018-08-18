import fs from 'fs'

export default class FileUtils {
    static isDirectory(path) {
        return fs.lstatSync(path).isDirectory();
    }
}