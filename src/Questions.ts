import ImageFormats from "./Enums/ImageFormats";
import ImageOperations from "./Enums/ImageOperations";
import InputType from "./Enums/InputType";
import FileUtils from './Utils/FileUtils';

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
        validate: (path: string ) => {
            if (!FileUtils.exists(path)) {
                return 'File not exists.';
            } else if (!FileUtils.isImage(path)) {
                return 'File is not image.';
            }
            return true;
        },
    },
    outputFilePath: {
        type: 'input',
        message: 'Output file path:',
        name: 'outputFilePath',
    },
    inputDirPath: {
        type: 'input',
        message: 'Directory path:',
        name: 'inputDirPath',
        validate: (path: string) => {
            try {
                if (! FileUtils.isDirectory(path)) {
                    return 'Not directory.';
                } else {
                    const foundImages = FileUtils.dirFiles(path, FileUtils.IMAGE_FORMATS);
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
                if (! FileUtils.isDirectory(path)) {
                    return 'Not directory.';
                }
            } catch (err) {
                return 'Invalid path.';
            }
            return true;
        },
    },
    operations: {
        type: 'list',
        message: 'What do you want?',
        name: 'operation',
        choices: [{
            name: ' Optimize',
            value: ImageOperations.Optimize,
        }, {
            name: ' Convert',
            value: ImageOperations.Convert,
        }, {
            name: ' Crop',
            value: ImageOperations.Crop,
        }, {
            name: ' Resize',
            value: ImageOperations.Resize,
        }, {
            name: ' Rotate',
            value: ImageOperations.Rotate,
        }, {
            name: ' Thumbnail',
            value: ImageOperations.Thumbnail,
        }],
    },
    autoOrient: {
        type: 'confirm',
        message: 'Auto orientate the image?',
        name: 'autoOrient',
    },
    quality: {
        type: 'input',
        message: 'Set the output quality (1-100):',
        name: 'quality',
        default: 100,
        validate: (value: string) => {
            const quality = parseInt(value);
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
};
