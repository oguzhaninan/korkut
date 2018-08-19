import * as inquirer from 'inquirer'
import * as fs from 'fs'
import * as gm from 'gm'
import * as Ora from 'ora'
import Questions from './Questions'
import FileUtils from './Utils/FileUtils'
import ImageUtils from './Utils/ImageUtils';
import { InputType, ImageOperations } from './Types'

gm.subClass({ imageMagick: true });

export default class Resizer {

    private inputType: InputType;

    private inputFilePath: string;
    private outputFilePath: string;

    private inputDirPath: string;
    private outputDirPath: string;
    private inputFiles: string[];

    private spinner: any;

    constructor() {
        this.spinner = new Ora({ spinner: "bouncingBar" });
    }

    async askInputFilePath(): Promise<void> {
        let { inputFilePath }: any = await inquirer.prompt([Questions.inputFilePath]);
        this.inputFilePath = inputFilePath;
    }

    async askOutputFilePath(): Promise<void> {
        let { outputFilePath }: any = await inquirer.prompt([Questions.outputFilePath]);
        this.outputFilePath = outputFilePath;
    }

    async askDirPath(): Promise<void> {
        let { 
            inputDirPath,
            outputDirPath,
        }: any = await inquirer.prompt([Questions.inputDirPath, Questions.outputDirPath]);

        let foundImages = FileUtils.dirFiles(inputDirPath, FileUtils.IMAGE_FORMATS);

        this.inputDirPath = inputDirPath;
        this.outputDirPath = outputDirPath;
        this.inputFiles = foundImages;

        console.log(`Number of image found: ${foundImages.length}`);
    }

    startSpinner(text: string): void {
        this.spinner.start(text);
    }

    succedSpinner(text: string): void {
        this.spinner.succeed(text);
    }

    failSpinner(text: string): void {
        this.spinner.fail(text);
    }

    async askImageOperations(): Promise<void> {
        let { operation }: any = await inquirer.prompt([Questions.operations]);
        
        // await this.askOutputFilePath()

        switch (operation) {
            // Convert
            case ImageOperations.Convert:
                let {
                    autoOrient,
                    quality,
                }: any = await inquirer.prompt([Questions.autoOrient, Questions.quality]);

                this.startSpinner('Processing...');
                const inputCount: number = this.inputFiles.length;

                for(let i = 0; i < this.inputFiles.length; ++i) {
                    const filePath: string = this.inputFiles[i];
                    try {
                        await ImageUtils.convert({
                            src: `${this.inputDirPath}/${filePath}`,
                            dst: `${this.outputDirPath}/new-${filePath}`,
                            quality: parseInt(quality),
                            autoOrient,
                        });
                        this.spinner.text = `Processing... (${i+1}/${inputCount})`;
                    } catch(err) {
                        console.log('err')
                    }
                }
                this.succedSpinner('Successfully completed.');
                break;
                
            // Resize
            case ImageOperations.Resize: 

            default:
                break;
        }
    }

    async askInputType(): Promise<void> {
        let { inputType }: any = await inquirer.prompt([Questions.inputType]);
        this.inputType = inputType;

        switch (inputType) {
            case InputType.File:
                await this.askInputFilePath();
                break;
            case InputType.Directory:
                await this.askDirPath();
                break;
        }
    }

    async main(): Promise<void> {
        await this.askInputType();

        await this.askImageOperations();
    }

}

new Resizer().main();



//#region gimp 
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

//#endregion