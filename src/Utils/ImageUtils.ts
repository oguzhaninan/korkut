import { convert, crop, IInfoResult, info, rescrop, resize, rotate, thumbnail } from 'easyimage';
import * as gm from 'gm';
import FileUtils from './FileUtils';
gm.subClass({ imageMagick: true });

export default class ImageUtils {

    public static async procces(options: any, cb: (img: gm.State) => void): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const img: gm.State = gm(options.src);
            cb(img);
            img.write(options.dst, (err, stdout, stderr, cmd) => {
                // console.log(err);
                err ? reject(err) : resolve();
            });
        });
    }

    public static async optimize(options: any): Promise<void> {
        return this.procces(options, (img: gm.State): void => {
            img.quality(options.quality);
        });
    }

    public static async convert(options: any): Promise<IInfoResult> {
        return resize(options);
    }

    public static async resize(options: any): Promise<IInfoResult> {
        return resize(options);
    }
}
