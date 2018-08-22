import * as fs from 'fs';
import InputFormats from '../Enums/InputFormats';

export default class FileUtils {

    public static readonly INPUT_FORMATS: string[] = Object.keys(InputFormats)
        .map((key): string => InputFormats[key]);

    public static isDirectory(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }

    public static exists(path: string): boolean {
        return fs.existsSync(path);
    }

    public static isSupportedFile(fileName: string): boolean {
        return this.filterSuffix([fileName], this.INPUT_FORMATS).length !== 0;
    }

    public static getSuffix(fileName: string): string {
        return fileName.split('.').pop();
    }

    public static filterSuffix(items: string[], suffix: string[] | string): string[] {
        suffix = Array.isArray(suffix) ? suffix : [suffix];
        return items.filter((item) => suffix.indexOf(this.getSuffix(item)) !== -1);
    }

    public static dirFiles(path: string, suffix?: string[] | string): string[] {
        const files = fs.readdirSync(path);

        suffix = Array.isArray(suffix) ? suffix : [suffix];

        if (suffix) {
            return this.filterSuffix(files, suffix);
        } else {
            return files;
        }
    }

    public static addPrefixOrSuffix(fileName: string, prefix: string, suffix?: string): string {
        if (prefix) { fileName = prefix + fileName; }

        if (suffix) {
            const temp = fileName
                .split('.')
                .reverse();
            temp[1] += suffix;
            fileName = temp.reverse()
                .join('.');
        }

        return fileName;
    }

    public static changeExtension(outputFileName: string, outputType: InputFormats): string {
        const temp: string[] = outputFileName.split('.').reverse();
        temp.splice(0, 1, outputType);
        return temp.reverse().join('.');
    }

}
