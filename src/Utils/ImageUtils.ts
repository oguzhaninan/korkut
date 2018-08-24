import * as EasyImage from 'easyimage';
import * as gm from 'gm';
// gm.subClass({ imageMagick: true });

export default class ImageUtils {

    public static async procces(opt: any, cb: (img: gm.State) => void): Promise<void> {
        return new Promise<void>((resolve, reject): void => {
            const img: gm.State = gm(opt.src);
            cb(img);
            img.write(opt.dst, (err, stdout, stderr, cmd): void => {
                if (err) { console.log(err); }
                err ? reject(err) : resolve();
            });
        });
    }

    public static async optimize(opt: any): Promise<void> {
        return this.procces(opt, (img: gm.State): void => {
            img.quality(opt.quality);
        });
    }

    public static async convert(opt: any): Promise<any> {
        return EasyImage.convert(opt);
        // return this.procces(opt, (img: gm.State): void => {
        //     if (opt.autoOrient) { img.autoOrient(); }
        //     img.quality(opt.quality);
        // });
    }

    public static async resize(opt: any): Promise<void> {
        return this.procces(opt, (img: gm.State): void => {
            if (opt.autoOrient) { img.autoOrient(); }
            img.quality(opt.quality);
            const resizeOpt: any = opt.ignoreAspectRatio ? '!' : '';
            img.resize(opt.width, opt.height, resizeOpt);
        });
    }

    public static async rotate(opt: any): Promise<void> {
        return this.procces(opt, (img: gm.State): void => {
            if (opt.autoOrient) { img.autoOrient(); }
            img.quality(opt.quality);
            img.rotate(opt.backgroundColor, opt.degrees);
        });
    }

    public static async crop(opt: any): Promise<void> {
        return this.procces(opt, (img: gm.State): void => {
            if (opt.autoOrient) { img.autoOrient(); }
            if (opt.isSetDirection) {
                img.gravity(opt.direction);
                img.crop(opt.width, opt.height);
            } else {
                img.crop(opt.width, opt.height, opt.x, opt.y);
            }
            img.quality(opt.quality);
        });
    }

    public static async watermark(opt: any): Promise<any> {
        const args: string[] = [opt.src, opt.watermarkFilePath];

        let geometry: string = `${opt.size}+${opt.horizontalOffset}+${opt.verticalOffset}`;
        geometry += opt.ignoreAspectRatio ? '!' : '';

        args.push('-geometry', geometry);

        if (opt.direction) {
            args.push('-gravity', opt.direction);
        }
        args.push('-composite', opt.dst);

        return EasyImage.execute('convert', args);
    }
}
