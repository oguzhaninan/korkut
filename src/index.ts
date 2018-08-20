import * as inquirer from 'inquirer';
import * as Ora from 'ora';
import * as path from 'path';

import ImageOperations from "./Enums/ImageOperations";
import InputType from "./Enums/InputType";
import Questions from './Questions';
import ConvertQuestions from './Questions/ConvertQuestions';
import OptimizeQuestions from './Questions/OptimizeQuestions';
import ResizeQuestions from './Questions/ResizeQuestions';
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

    private spinner: any;

    constructor() {
        this.spinner = new Ora({ spinner: "bouncingBar" });
    }

    public async main(): Promise<void> {
        await this.askInputType();

        await this.askImageOperations();
    }

    private async askInputFilePath(): Promise<void> {
        const { inputFilePath }: any = await inquirer.prompt([Questions.inputFilePath]);
        this.inputFilePath = inputFilePath;
    }

    private async askOutputFilePath(): Promise<void> {
        const { outputFilePath }: any = await inquirer.prompt([Questions.outputFilePath]);
        this.outputFilePath = outputFilePath;
    }

    private async askSuffixOrPrefix(): Promise<void> {
        const { suffixOrPrefix }: any = await inquirer.prompt([Questions.suffixOrPrefix]);

        switch (suffixOrPrefix) {
            case 'suffix':
                const { suffix }: any = await inquirer.prompt([Questions.suffix]);
                this.suffix = suffix;
                break;
            case 'prefix':
                const { prefix }: any = await inquirer.prompt([Questions.prefix]);
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

        const foundImages = FileUtils.dirFiles(inputDirPath, FileUtils.IMAGE_FORMATS);

        this.inputDirPath = inputDirPath;
        this.outputDirPath = outputDirPath;
        this.inputFiles = foundImages;

        console.log(`Number of image found: ${foundImages.length}`);
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
        const { operation }: any = await inquirer.prompt([Questions.operations]);

        switch (operation) {
            // Optimize
            case ImageOperations.Optimize: {
                const options: any = await inquirer.prompt(OptimizeQuestions);
                options.quality = parseInt(options.quality, 10);

                this.startSpinner('Processing...');

                if (this.inputType === InputType.Directory) {
                    const inputCount: number = this.inputFiles.length;
                    let isFail: boolean = false;

                    for (let i = 0; i < this.inputFiles.length; ++i) {
                        const fileName: string = this.inputFiles[i];
                        const outputFileName: string =
                            FileUtils.addPrefixOrSuffix(fileName, this.prefix, this.suffix);
                        try {
                            await ImageUtils.optimize({
                                src: path.join(this.inputDirPath, fileName),
                                dst: path.join(this.outputDirPath, outputFileName),
                                ...options,
                            });
                            this.spinner.text = `Processing... (${i + 1}/${inputCount})`;
                        } catch (err) {
                            isFail = true;
                            this.failSpinner('Failed.');
                        }
                    }
                    if (!isFail) { this.succedSpinner('Successfully completed.'); }
                } else if (this.inputType === InputType.File) {
                    try {
                        await ImageUtils.convert({
                            src: this.inputFilePath,
                            dst: this.outputFilePath,
                            ...options,
                        });
                        this.succedSpinner('Successfully completed.');
                    } catch (err) {
                        this.failSpinner('Failed.');
                    }
                }
            }
            break;
            // Convert
            case ImageOperations.Convert: {
                const options: any = await inquirer.prompt(ConvertQuestions);
                options.quality = parseInt(options.quality, 10);

                this.startSpinner('Processing...');

                if (this.inputType === InputType.Directory) {
                    const inputCount: number = this.inputFiles.length;
                    let isFail: boolean = false;

                    for (let i = 0; i < this.inputFiles.length; ++i) {
                        const fileName: string = this.inputFiles[i];
                        const outputFileName: string =
                            FileUtils.addPrefixOrSuffix(fileName, this.prefix, this.suffix);
                        try {
                            await ImageUtils.convert({
                                src: path.join(this.inputDirPath, fileName),
                                dst: path.join(this.outputDirPath, outputFileName),
                                ...options,
                            });
                            this.spinner.text = `Processing... (${i + 1}/${inputCount})`;
                        } catch (err) {
                            isFail = true;
                            this.failSpinner('Failed.');
                        }
                    }
                    if (!isFail) { this.succedSpinner('Successfully completed.'); }
                } else if (this.inputType === InputType.File) {
                    try {
                        await ImageUtils.convert({
                            src: this.inputFilePath,
                            dst: this.outputFilePath,
                            ...options,
                        });
                        this.succedSpinner('Successfully completed.');
                    } catch (err) {
                        this.failSpinner('Failed.');
                    }
                }
            }
            break;
            // Resize
            case ImageOperations.Resize: {
                const options: any = await inquirer.prompt(ResizeQuestions);
                options.quality = parseInt(options.quality, 10);

                this.startSpinner('Processing...');

                if (this.inputType === InputType.Directory) {
                    const inputCount: number = this.inputFiles.length;
                    let isFail: boolean = false;

                    for (let i = 0; i < this.inputFiles.length; ++i) {
                        const fileName: string = this.inputFiles[i];
                        const outputFileName: string =
                            FileUtils.addPrefixOrSuffix(fileName, this.prefix, this.suffix);
                        try {
                            await ImageUtils.resize({
                                src: path.join(this.inputDirPath, fileName),
                                dst: path.join(this.outputDirPath, outputFileName),
                                ...options,
                            });
                            this.spinner.text = `Processing... (${i + 1}/${inputCount})`;
                        } catch (err) {
                            isFail = true;
                            this.failSpinner('Failed.');
                        }
                    }
                    if (!isFail) { this.succedSpinner('Successfully completed.'); }
                } else if (this.inputType === InputType.File) {
                    try {
                        await ImageUtils.resize({
                            src: this.inputFilePath,
                            dst: this.outputFilePath,
                            ...options,
                        });
                        this.succedSpinner('Successfully completed.');
                    } catch (err) {
                        this.failSpinner('Failed.');
                    }
                }
            }
            break;
        }
    }

    private async askInputType(): Promise<void> {
        const { inputType }: any = await inquirer.prompt([Questions.inputType]);
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
