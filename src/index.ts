import * as chalk from 'chalk-pipe';
import * as inquirer from 'inquirer';
import * as Ora from 'ora';
import * as path from 'path';

import ImageOperations from "./Enums/ImageOperations";
import InputFormats from './Enums/InputFormats';
import InputType from "./Enums/InputType";

import Questions from './Questions';
import ConvertQuestions from './Questions/ConvertQuestions';
import CropQuestions from './Questions/CropQuestions';
import FlipQuestions from './Questions/FlipQuestions';
import OptimizeQuestions from './Questions/OptimizeQuestions';
import ResizeQuestions from './Questions/ResizeQuestions';
import RotateQuestions from './Questions/RotateQuestions';
import WatermarkQuestions from './Questions/WatermarkQuestions';

import FileUtils from './Utils/FileUtils';
import ImageUtils from './Utils/ImageUtils';

export default class Resizer {

    private inputType: InputType;

    private inputFilePath: string;
    private outputFilePath: string;

    private suffix: string;
    private prefix: string;

    private inputDirPath: string;
    private outputDirPath: string;
    private inputFiles: string[];

    private processedFiles: string[];

    private spinner: any;

    constructor() {
        this.spinner = new Ora({ spinner: "bouncingBar" });
    }

    public async main(): Promise<void> {
        console.log(chalk('green')(`Korkut Version: ${this.getKorkutVersion()}`));

        await this.checkImageMagickVersion();

        await this.askInputType();

        await this.askImageOperations();
    }

    private getKorkutVersion(): number {
        return require("../package.json").version;
    }

    private async checkImageMagickVersion() {
        try {
            const version = await ImageUtils.getImageMagickVersion();
            console.log(chalk('green')(`ImageMagick Version: ${version}\n`));
        } catch (err) {
            console.log(`
${chalk('red')('ImageMagick not found.')}\n
${chalk('white.bold')('Mac OS X Install:')}
brew install imagemagick --with-webp\n
${chalk('white.bold')('Ubuntu Install:')}
sudo apt-get install imagemagick -y
sudo apt-get install webp -y # for webp support\n
${chalk('white.bold')('Windows Install:')}
https://imagemagick.org/script/download.php#windows
            `);
            process.exit();
        }
    }

    private async askInputFilePath(): Promise<void> {
        const { inputFilePath }: any = await inquirer.prompt(Questions.inputFilePath);
        this.inputFilePath = inputFilePath;
    }

    private async askOutputFilePath(): Promise<void> {
        const { outputFilePath }: any = await inquirer.prompt(Questions.outputFilePath);
        this.outputFilePath = outputFilePath;
    }

    private async askSuffixOrPrefix(): Promise<void> {
        const { suffixOrPrefix }: any = await inquirer.prompt(Questions.suffixOrPrefix);

        switch (suffixOrPrefix) {
            case 'suffix':
                const { suffix }: any = await inquirer.prompt(Questions.suffix);
                this.suffix = suffix;
                break;
            case 'prefix':
                const { prefix }: any = await inquirer.prompt(Questions.prefix);
                this.prefix = prefix;
                break;
            default:
                break;
        }
    }

    private async askDirPath(): Promise<void> {
        const {
            inputDirPath,
            outputDirPath,
        }: any = await inquirer.prompt([Questions.inputDirPath, Questions.outputDirPath]);

        const foundFiles = FileUtils.dirFiles(inputDirPath, FileUtils.INPUT_FORMATS);

        this.inputDirPath = inputDirPath;
        this.outputDirPath = outputDirPath;

        const foundFormats: any[] = [];
        const inputInfo: string[] = Object.keys(InputFormats)
            .reduce((counts: string[], key: string): string[] => {
                const fileCount: number = FileUtils.filterSuffix(foundFiles, InputFormats[key]).length;
                if (fileCount > 0) {
                    counts.push(`${key}: ${fileCount}`);
                    foundFormats.push({
                        name: `${key} (.${InputFormats[key]})`,
                        value: `${InputFormats[key]}`,
                    });
                }
                return counts;
            }, []);

        const msg: string = `> Number of file found: ${foundFiles.length}\n> ${inputInfo.join(' | ')}`;
        console.log(chalk('royalblue.bold')(msg));

        if (foundFormats.length === 1) {
            this.inputFiles = foundFiles;
        } else {
            Questions.selectedFormats.choices = foundFormats;
            const { selectedFormats }: any = await inquirer.prompt(Questions.selectedFormats);

            this.inputFiles = FileUtils.filterSuffix(foundFiles, selectedFormats);
        }
    }

    private startSpinner(text: string): void {
        this.spinner.start(text);
    }

    private succedSpinner(text: string): void {
        this.spinner.succeed(text);
    }

    private failSpinner(text: string): void {
        this.spinner.fail(text);
    }

    private async askImageOperations(): Promise<void> {
        const { operation }: any = await inquirer.prompt(Questions.operations);

        let options: any;
        switch (operation) {
            // Optimize
            case ImageOperations.Optimize: {
                options = await inquirer.prompt(OptimizeQuestions);
            }
                break;
            // Convert
            case ImageOperations.Convert: {
                options = await inquirer.prompt(ConvertQuestions);
            }
                break;
            // Resize
            case ImageOperations.Resize: {
                options = await inquirer.prompt(ResizeQuestions);
                const [width, height] = options.size.split('x')
                    .map((v: string) => isNaN(parseInt(v, 10)) ? '' : parseInt(v, 10));
                options.width = width;
                options.height = height;

                if (Number.isInteger(width) && Number.isInteger(height)) {
                    const { ignoreAspectRatio }: any = await inquirer.prompt(Questions.ignoreAspectRatio);
                    options.ignoreAspectRatio = ignoreAspectRatio;
                }
            }
                break;
            // Rotate
            case ImageOperations.Rotate: {
                options = await inquirer.prompt(RotateQuestions);
            }
                break;
            // Crop
            case ImageOperations.Crop: {
                options = await inquirer.prompt(CropQuestions);
                if (options.isSetDirection) {
                    const { direction }: any = await inquirer.prompt(Questions.direction);
                    options.direction = direction;
                } else {
                    const position: any = await inquirer.prompt([Questions.x, Questions.y]);
                    Object.keys(position).forEach((key: string): void => options[key] = position[key]);
                }
            }
                break;
            // Watermark
            case ImageOperations.Watermark: {
                options = await inquirer.prompt(WatermarkQuestions);
            }
                break;
            // Flip
            case ImageOperations.Flip: {
                options = await inquirer.prompt(FlipQuestions);
            }
                break;
        }

        this.startSpinner('Processing…');

        this.processedFiles = [];
        switch (this.inputType) {
            case InputType.Directory: {
                const inputCount: number = this.inputFiles.length;
                let isFail = false;

                for (let i = 0; i < this.inputFiles.length; ++i) {
                    const fileName: string = this.inputFiles[i];
                    let outputFileName: string = FileUtils.addPrefixOrSuffix(fileName, this.prefix, this.suffix);

                    if (options.outputType) {
                        outputFileName = FileUtils.changeExtension(outputFileName, options.outputType);
                    }
                    try {
                        options.src = path.join(this.inputDirPath, fileName);
                        options.dst = path.join(this.outputDirPath, outputFileName);
                        await ImageUtils[operation](options);

                        this.processedFiles.push(outputFileName);

                        this.spinner.text = `Processing… (${i + 1}/${inputCount}) - ${outputFileName}`;
                    } catch (err) {
                        console.log(err);
                        isFail = true;
                        this.failSpinner(`Failed. - ${fileName}`);
                        process.exit();
                    }
                }
                if (!isFail) { this.succedSpinner('Successfully completed.'); }
            }
                break;
            case InputType.File: {
                try {
                    if (options.outputType) {
                        this.outputFilePath = FileUtils.changeExtension(this.outputFilePath, options.outputType);
                    }
                    options.src = this.inputFilePath;
                    options.dst = this.outputFilePath;
                    await ImageUtils[operation](options);

                    this.processedFiles.push(this.outputFilePath);
                    this.succedSpinner('Successfully completed.');
                } catch (err) {
                    this.failSpinner('Failed.');
                    process.exit();
                }
            }
                break;
        }

        const { againProcess }: any = await inquirer.prompt(Questions.againProcess);
        if (againProcess) {
            switch (this.inputType) {
                case InputType.Directory: {
                    this.inputDirPath = this.outputDirPath;
                    this.inputFiles.splice(0, this.inputFiles.length, ...this.processedFiles);
                }
                    break;
                case InputType.File: {
                    this.inputFilePath = this.processedFiles[0];
                }
                    break;
            }
            this.prefix = this.suffix = '';
            this.askImageOperations();
        }
    }

    private async askInputType(): Promise<void> {
        const { inputType }: any = await inquirer.prompt(Questions.inputType);
        this.inputType = inputType;

        switch (inputType) {
            case InputType.File:
                await this.askInputFilePath();
                await this.askOutputFilePath();
                break;
            case InputType.Directory:
                await this.askDirPath();
                await this.askSuffixOrPrefix();
                break;
        }
    }

}

new Resizer().main();
