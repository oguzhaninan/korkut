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
    private inputFiles: string[];

    constructor() {

    }

    async askFilePath(): Promise<void> {
        let { 
            inputFilePath,
            outputFilePath,
        }: any = await inquirer.prompt([Questions.inputFilePath, Questions.outputFilePath]);

        this.inputFilePath = inputFilePath;
        this.outputFilePath = outputFilePath;
    }

    async askDirPath(): Promise<void> {
        let { dirPath }: any = await inquirer.prompt([Questions.dirPath]);

        let foundImages = FileUtils.dirFiles(dirPath, FileUtils.IMAGE_FORMATS);
        this.inputDirectoryPath = dirPath;
        this.inputFiles = foundImages;
        
        console.log(`Number of image found: ${foundImages.length}`);
    }

    askImageOperations() {
        inquirer.prompt([Questions.operations])
            .then(({ operations }: any) => {
                console.log(operations)
            })
    }

    async askInputType(): Promise<void> {
        let { inputType }: any = await inquirer.prompt([Questions.inputType])
        this.inputType = inputType

        switch (inputType) {
            case InputType.File:
                await this.askFilePath()
                break;
            case InputType.Directory:
                await this.askDirPath()
                break;
        }

    }

    async main(): Promise<void> {
        await this.askInputType();

        await this.askImageOperations();
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