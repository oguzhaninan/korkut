import * as fs from 'fs';

export default class FileUtils {

    public static readonly IMAGE_FORMATS: string[] = ['jpg', 'jpeg', 'png', 'bmp'];

    public static isDirectory(path: string): boolean {
        return fs.lstatSync(path).isDirectory();
    }

    public static exists(path: string): boolean {
        return fs.existsSync(path);
    }

    public static isImage(fileName: string): boolean {
        return this.filterSuffix([fileName], this.IMAGE_FORMATS).length !== 0;
    }

    public static getSuffix(fileName: string): string {
        return fileName.split('.').pop();
    }

    public static filterSuffix(items: string[], suffixes: string[]): string[] {
        return items.filter(item => suffixes.indexOf(this.getSuffix(item)) !== -1);
    }

    public static dirFiles(path: string, suffixes?: string[]): string[] {
        const files = fs.readdirSync(path);

        if (suffixes) {
            return this.filterSuffix(files, suffixes);
        } else {
            return files;
        }
    }

    public static addPrefixOrSuffix(fileName: string, prefix: string, suffix?: string): string {
        if (prefix) fileName = prefix + fileName;
        
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
}