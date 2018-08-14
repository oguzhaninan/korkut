import inquirer from 'inquirer'
import fs from 'fs'
import Questions from './questions'
import gm from 'gm'
gm.subClass({imageMagick: true});



inquirer.prompt([Questions.input_type])
    .then(({input_type}) => {
        switch (input_type) {
            case 'f':
                inquirer.prompt([Questions.input_file_name, Questions.output_file_name])
                    .then(({input_file_name, output_file_name}) => {
                        fs.exists(input_file_name, exists => {
                            if (exists) {
                                gm(input_file_name)
                                    .resize(500, 240, '!')
                                    .backdrop()
                                    .write(output_file_name, err => console.log(err))
                            } else {
                                console.log('File not exists.')
                            }
                        })
                    })
                break;
            case 'd':
                inquirer.prompt([Questions.options])
                    .then(ans => {
                        console.log(ans)
                    })
                break;
        }
    })