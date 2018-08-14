export default {
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
        message: 'Input file path: ',
        name: 'input_file_name'
    },
    output_file_name: {
        type: 'input',
        message: 'Output file path: ',
        name: 'output_file_name'
    },
    options: {
        type: 'checkbox',
        message: 'What do you want?',
        name: 'options',
        choices: [{
            name: ' Blur',
            value: 'blur'
        }, {
            name: ' Resize',
            value: 'resize'
        }, {
            name: ' Backdrop',
            value: 'backdrop'
        }, {
            name: ' Blur',
            value: 'blur'
        }, {
            name: ' Backdrop',
            value: 'backdrop'
        }, {
            name: ' Blur',
            value: 'blur'
        }, {
            name: ' Resize',
            value: 'resize'
        }, {
            name: ' Backdrop',
            value: 'backdrop'
        }]
    }
}