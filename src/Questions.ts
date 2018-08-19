import { InputType, ImageOperations, ImageFormats } from './Types'
import FileUtils from './FileUtils'

export default {
    input_type: {
        type: "list",
        message: "What is your input type?",
        name: "input_type",
        choices: [{
            name: "File",
            value: InputType.File
        }, {
            name: "Directory",
            value: InputType.Directory
        }]
    },
    input_file_name: {
        type: 'input',
        message: 'Input file path:',
        name: 'input_file_name',
        validate: (path: string ) => {
            if (!FileUtils.exists(path)) {
                return 'File not exists.'
            } else if (!FileUtils.isImage(path)) {
                return 'File is not image.'
            }
            return true;
        }
    },
    output_file_name: {
        type: 'input',
        message: 'Output file path:',
        name: 'output_file_name'
    },
    dir_path: {
        type: 'input',
        message: 'Directory path:',
        name: 'dir_path',
        validate: (path: string) => {
            try {
                if (! FileUtils.isDirectory(path)) {
                    return 'Not directory.'
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
        },]
    }
}