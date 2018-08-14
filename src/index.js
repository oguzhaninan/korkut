import inquirer from 'inquirer'
import fs from 'fs'
import Questions from './questions'
import gm from 'gm'
gm.subClass({imageMagick: true});


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

process.exit()

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