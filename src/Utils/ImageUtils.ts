import { convert, crop, IInfoResult, info, rescrop, resize, rotate, thumbnail } from 'easyimage';
import * as gm from 'gm';
import FileUtils from './FileUtils';
gm.subClass({ imageMagick: true });

export default class ImageUtils {

    public static async procces(options: any, cb: (img: gm.State) => void): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            const img: gm.State = gm(options.src);
            cb(img);
            img.write(options.dst, (err, stdout, stderr, cmd): void => {
                if (err) { console.log(err); }
                err ? reject(err) : resolve();
            });
        });
    }

    public static async optimize(options: any): Promise<void> {
        return this.procces(options, (img: gm.State): void => {
            img.quality(options.quality);
        });
    }

    public static async convert(options: any): Promise<any> {
        return this.procces(options, (img: gm.State): void => {
            if (options.autoOrient) { img.autoOrient(); }
            img.quality(options.quality);
        });
    }

    public static async resize(options: any): Promise<void> {
        return this.procces(options, (img: gm.State): void => {
            if (options.autoOrient) { img.autoOrient(); }
            img.quality(options.quality);
            const resizeOpt: any = options.ignoreAspectRatio ? '!' : '';
            img.resize(options.width, options.height, resizeOpt);
        });
    }

    public static async rotate(options: any): Promise<void> {
        return this.procces(options, (img: gm.State): void => {
            if (options.autoOrient) { img.autoOrient(); }
            img.quality(options.quality);
            img.rotate(options.backgroundColor, options.degrees);
        });
    }

    public static async crop(options: any): Promise<void> {
        return this.procces(options, (img: gm.State): void => {
            if (options.autoOrient) {
                img.autoOrient();
            }
            if (options.isDirection) {
                img.gravity(options.direction);
                img.crop(options.width, options.height);
            } else {
                img.crop(options.width, options.height, options.x, options.y);
            }
            img.quality(options.quality);
        });
    }
}
