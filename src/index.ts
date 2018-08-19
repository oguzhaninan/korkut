import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as gm from 'gm'
import Questions from './Questions'
import FileUtils from './FileUtils'
import { InputType } from './Types'

gm.subClass({ imageMagick: true });

export default class Resizer {

    private inputType: InputType;

    private inputFilePath: string;
    private outputFilePath: string;

    private inputDirectoryPath: string;

    constructor() {
        
    }

    askFilePath() {
        inquirer.prompt([Questions.input_file_name, Questions.output_file_name])
            .then(({ input_file_name, output_file_name }: any) => {
                if (FileUtils.exists(input_file_name)) {
                    if (FileUtils.isImage(input_file_name)) {

                    } else {
                        console.log('File is not image.')
                    }
                } else {
                    console.log('File not exists.')
                }
            })
    }

    askDirPath() {
        inquirer.prompt([Questions.dir_path])
            .then(({ dir_path }: any) => {
                try {
                    if (FileUtils.isDirectory(dir_path)) {
                        let foundImages = FileUtils.dirFiles(dir_path, FileUtils.IMAGE_FORMATS);
                        if (foundImages.length > 0) {
                            console.log(`Found image count: ${foundImages.length}`);

                            inquirer.prompt([Questions.options])
                                .then(ans => {
                                    console.log(ans)
                                })
                        } else {
                            console.log('Not found image.');
                        }
                    }
                } catch (err) {
                    console.log('Invalid path.')
                }
            })
    }

    main() {
        inquirer.prompt([Questions.input_type])
            .then(({ input_type }: any) => {
                switch (input_type) {
                    case InputType.File:
                        this.askFilePath()
                        break;
                    case InputType.Directory:
                        this.askDirPath()
                        break;
                }
            })
    }

}

new Resizer().main()











/* 
 gm('/home/oguzhan/Pictures/foto.jpg')
    // .blur(10,5)
    // .chop(500, 500, 100, 10)
    .borderColor('#444')
    .border(20, 20)
    // .charcoal(1)
    // .colorize(12, 50, 60)
    // .colors(100)
    // .crop(600, 300, 20, 20)
    // .flip()
    // .flop()
    // .frame(20, 20, 10, 10)
    // .gamma(12,1,35)
    // .geometry(600, 500, '%')
    // .gravity('Center')
    // .highlightColor('red')
    // .fuzz()
    // .gaussian(12)
    // .channel('Opacity')
    // .append('/home/oguzhan/Pictures/icon.png', true)
    // .watermark(23, 32)
    .stroke('red', 25)
    .fill('yellow')
    .drawRectangle(10, 20, 200, 200, )
    .fontSize(64)
    .fill('red')
    .drawText(20, 30, 'TEXT', 'CENTER')
    .write('/home/oguzhan/Pictures/foto2.jpg', err => console.log(err))

process.exit() */