import { InputType, ImageOperations, ImageFormats } from './Types'
import FileUtils from './FileUtils'

export default {
    inputType: {
        type: "list",
        message: "What is your input type?",
        name: "inputType",
        choices: [{
            name: "File",
            value: InputType.File
        }, {
            name: "Directory",
            value: InputType.Directory
        }]
    },
    inputFilePath: {
        type: 'input',
        message: 'Input file path:',
        name: 'inputFilePath',
        validate: (path: string ) => {
            if (!FileUtils.exists(path)) {
                return 'File not exists.'
            } else if (!FileUtils.isImage(path)) {
                return 'File is not image.'
            }
            return true;
        }
    },
    outputFilePath: {
        type: 'input',
        message: 'Output file path:',
        name: 'outputFilePath'
    },
    dirPath: {
        type: 'input',
        message: 'Directory path:',
        name: 'dirPath',
        validate: (path: string) => {
            try {
                if (! FileUtils.isDirectory(path)) {
                    return 'Not directory.'
                } else {
                    let foundImages = FileUtils.dirFiles(path, FileUtils.IMAGE_FORMATS);
                    if (foundImages.length == 0) {
                        return 'Not found image.'
                    }
                }
            } catch (err) {
                return 'Invalid path.'
            }
            return true;
        }
    },
    operations: {
        type: 'checkbox',
        message: 'What do you want?',
        name: 'operations',
        choices: [{
            name: ' Convert',
            value: ImageOperations.Convert
        }, {
            name: ' Crop',
            value: ImageOperations.Crop
        }, {
            name: ' Resize',
            value: ImageOperations.Resize
        }, {
            name: ' Resize & Crop',
            value: 'blur'
        }, {
            name: ' Crop & Resize',
            value: 'backdrop'
        }, {
            name: ' Rotate',
            value: ImageOperations.Rotate
        }, {
            name: ' Create Thumbnail',
            value: ImageOperations.Thumbnail
        }]
    }
}