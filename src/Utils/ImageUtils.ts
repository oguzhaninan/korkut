import { convert, crop, IInfoResult, info, rescrop, resize, rotate, thumbnail } from 'easyimage';
import FileUtils from './FileUtils';

export default class ImageUtils {

    public static async convert(options: any): Promise<IInfoResult> {
        return convert(options);
    }

    public static async resize(options: any): Promise<IInfoResult> {
        return resize(options);
    }
}
