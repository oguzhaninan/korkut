"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    input_type: {
        type: "list",
        message: "What is your input type?",
        name: "input_type",
        choices: [{
            name: "File",
            value: "f"
        }, {
            name: "Directory",
            value: "d"
        }]
    },
    input_file_name: {
        type: 'input',
        message: 'Input file path:',
        name: 'input_file_name'
    },
    output_file_name: {
        type: 'input',
        message: 'Output file path:',
        name: 'output_file_name'
    },
    dir_path: {
        type: 'input',
        message: 'Directory path:',
        name: 'dir_path'
    },
    options: {
        type: 'checkbox',
        message: 'What do you want?',
        name: 'options',
        choices: [{
            name: ' Convert',
            value: 'blur'
        }, {
            name: ' Crop',
            value: 'resize'
        }, {
            name: ' Resize',
            value: 'backdrop'
        }, {
            name: ' Resize & Crop',
            value: 'blur'
        }, {
            name: ' Crop & Resize',
            value: 'backdrop'
        }, {
            name: ' Rotate',
            value: 'blur'
        }, {
            name: ' Create Thumbnail',
            value: 'resize'
        }]
    }
};