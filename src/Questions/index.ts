import * as chalkPipe from 'chalk-pipe';
import ImageOperations from "../Enums/ImageOperations";
import InputType from "../Enums/InputType";
import OutputFormats from '../Enums/OutputFormats';
import FileUtils from '../Utils/FileUtils';

export default {
    inputType: {
        type: "list",
        message: "What is your input type?",
        name: "inputType",
        choices: [{
            name: "File",
            value: InputType.File,
        }, {
            name: "Directory",
            value: InputType.Directory,
        }],
    },
    inputFilePath: {
        type: 'input',
        message: 'Input file path:',
        name: 'inputFilePath',
        validate: (path: string): boolean | string => {
            if (!FileUtils.exists(path)) {
                return 'File not exists.';
            } else if (!FileUtils.isSupportedInputFile(path)) {
                return 'File is not supported.';
            }
            return true;
        },
    },
    watermarkFilePath: {
        type: 'input',
        message: 'Watermark path:',
        name: 'watermarkFilePath',
        validate: (path: string): boolean | string => {
            if (!FileUtils.exists(path)) {
                return 'File not exists.';
            } else if (!FileUtils.isSupportedInputFile(path)) {
                return 'File is not supported.';
            }
            return true;
        },
    },
    outputFilePath: {
        type: 'input',
        message: 'Output file path:',
        name: 'outputFilePath',
        validate: (path: string): boolean | string => {
            if (!FileUtils.isSupportedOutputFile(path)) {
                return 'File is not supported.';
            }
            return true;
        },
    },
    inputDirPath: {
        type: 'input',
        message: 'Directory path:',
        name: 'inputDirPath',
        validate: (path: string): boolean | string => {
            try {
                if (!FileUtils.isDirectory(path)) {
                    return 'Not directory.';
                } else {
                    const foundImages = FileUtils.dirFiles(path, FileUtils.INPUT_FORMATS);
                    if (foundImages.length === 0) {
                        return 'Not found image.';
                    }
                }
            } catch (err) {
                return 'Invalid path.';
            }
            return true;
        },
    },
    outputDirPath: {
        type: 'input',
        message: 'Output directory path:',
        name: 'outputDirPath',
        validate: (path: string) => {
            try {
                if (!FileUtils.isDirectory(path)) {
                    return 'Not directory.';
                }
            } catch (err) {
                return 'Invalid path.';
            }
            return true;
        },
    },
    suffix: {
        type: 'input',
        message: 'Enter the suffix:',
        name: 'suffix',
    },
    prefix: {
        type: 'input',
        message: 'Enter the prefix:',
        name: 'prefix',
    },
    suffixOrPrefix: {
        type: 'list',
        message: 'Do you want suffix or prefix?',
        name: 'suffixOrPrefix',
        choices: [{
            name: 'Prefix',
            value: 'prefix',
        }, {
            name: 'Suffix',
            value: 'suffix',
        }, {
            name: 'No',
            value: 'no',
        }],
    },
    operations: {
        type: 'list',
        message: 'What do you want?',
        name: 'operation',
        choices: Object.keys(ImageOperations)
            .map((key: string) => ({
                name: key,
                value: ImageOperations[key],
            })),
    },
    autoOrient: {
        type: 'confirm',
        message: 'Auto orientate the images?',
        name: 'autoOrient',
    },
    verticalFlip: {
        type: 'confirm',
        message: 'Flip it vertical?',
        name: 'verticalFlip',
    },
    horizontalFlip: {
        type: 'confirm',
        message: 'Flip it horizontally?',
        name: 'horizontalFlip',
    },
    isSetDirection: {
        type: 'confirm',
        message: 'Would you like to set direction?',
        name: 'isSetDirection',
    },
    direction: {
        type: 'list',
        message: 'Select the direction:',
        name: 'direction',
        choices: [
            { name: 'NorthWest', value: 'NorthWest' },
            { name: 'North', value: 'North' },
            { name: 'NorthEast', value: 'NorthEast' },
            { name: 'West', value: 'West' },
            { name: 'Center', value: 'Center' },
            { name: 'East', value: 'East' },
            { name: 'SouthWest', value: 'SouthWest' },
            { name: 'South', value: 'South' },
            { name: 'SouthEast', value: 'SouthEast' },
        ],
    },
    outputType: {
        type: 'list',
        message: 'The file format to be converted:',
        name: 'outputType',
        choices: Object.keys(OutputFormats)
            .map((key): any => ({
                name: `${key} (.${OutputFormats[key]})`,
                value: `${OutputFormats[key]}`,
            })),
    },
    againProcess: {
        type: 'confirm',
        message: 'Do you want to do different processing again with processed files?',
        name: 'againProcess',
    },
    selectedFormats: {
        type: 'checkbox',
        message: 'Select the file formats you want to process:',
        name: 'selectedFormats',
        choices: [],
        validate: (values: string[]): boolean | string => {
            if (values.length === 0) {
                return 'You must choose at least one.';
            }
            return true;
        },
    },
    quality: {
        type: 'input',
        message: 'Set the output quality (1-100):',
        name: 'quality',
        default: 100,
        validate: (value: string): boolean | string => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality <= 0 || quality > 100) {
                    return 'Enter a value between 1 - 100.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
    backgroundColor: {
        type: 'input',
        message: 'Background color:',
        name: 'backgroundColor',
        transformer: (color: string): any => {
            return chalkPipe(color)(color);
        },
    },
    degrees: {
        type: 'input',
        message: 'Degrees:',
        name: 'degrees',
        validate: (value: string): boolean | string => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality <= 0 || quality > 360) {
                    return 'Enter a value between 1 - 360.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
    ignoreAspectRatio: {
        type: 'confirm',
        message: 'Ignore aspect ratio when resizing?',
        name: 'ignoreAspectRatio',
    },
    size: {
        type: 'input',
        message: 'Size e.g(48x48, x48, 48x):',
        name: 'size',
        validate: (value: string): boolean | string => {
            value = value.toLowerCase();
            // examples: 40x50, x60, 12x
            if (value.search('x') !== -1) {
                const [width, height] = value.split('x').map((v: string) => parseInt(v, 10));
                if (isNaN(width) && isNaN(height)) {
                    return 'You can only leave one value empty!';
                } else {
                    return true;
                }
            } else {
                return 'Enter in the correct format!';
            }
        },
    },
    width: {
        type: 'input',
        message: 'Width:',
        name: 'width',
        validate: (value: string): boolean | string => {
            const val: number = parseInt(value, 10);
            if (!Number.isInteger(val)) {
                return 'Type the number.';
            }
            return true;
        },
    },
    height: {
        type: 'input',
        message: 'Height:',
        name: 'height',
        validate: (value: string): boolean | string => {
            const val: number = parseInt(value, 10);
            if (!Number.isInteger(val)) {
                return 'Type the number.';
            }
            return true;
        },
    },
    horizontalOffset: {
        type: 'input',
        message: 'Horizontal offset:',
        default: 0,
        name: 'horizontalOffset',
        validate: (value: string): boolean | string => {
            const val: number = parseInt(value, 10);
            if (!Number.isInteger(val)) {
                return 'Type the number.';
            }
            return true;
        },
    },
    verticalOffset: {
        type: 'input',
        message: 'Vertical offset:',
        default: 0,
        name: 'verticalOffset',
        validate: (value: string): boolean | string => {
            const val: number = parseInt(value, 10);
            if (!Number.isInteger(val)) {
                return 'Type the number.';
            }
            return true;
        },
    },
    x: {
        type: 'input',
        message: 'Left distance of crop:',
        name: 'x',
        default: 0,
        validate: (value: string): boolean | string => {
            const val: number = parseInt(value, 10);
            if (Number.isInteger(val)) {
                if (val < 0) {
                    return 'Must be greater than 0.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
    y: {
        type: 'input',
        message: 'Top distance of crop:',
        name: 'y',
        default: 0,
        validate: (value: string): boolean | string => {
            const quality: number = parseInt(value, 10);
            if (Number.isInteger(quality)) {
                if (quality < 0) {
                    return 'Must be greater than 0.';
                }
            } else {
                return 'Type the number.';
            }
            return true;
        },
    },
};
