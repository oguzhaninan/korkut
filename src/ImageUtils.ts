import FileUtils from './FileUtils'
import { convert, crop, rescrop, resize, thumbnail, rotate, info, IInfoResult } from 'easyimage'

export default class ImageUtils {

    static async convert(options: any): Promise<IInfoResult> {
        return convert(options);
    }

}