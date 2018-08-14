'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_gm2.default.subClass({ imageMagick: true });

(0, _gm2.default)('/home/oguzhan/Pictures/foto.jpg')
// .blur(10,5)
// .chop(500, 500, 100, 10)
.borderColor('#444').border(20, 20)
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
.stroke('red', 25).fill('yellow').drawRectangle(10, 20, 200, 200).fontSize(64).fill('red').drawText(20, 30, 'TEXT', 'CENTER').write('/home/oguzhan/Pictures/foto2.jpg', function (err) {
    return console.log(err);
});

process.exit();

_inquirer2.default.prompt([_questions2.default.input_type]).then(function (_ref) {
    var input_type = _ref.input_type;

    switch (input_type) {
        case 'f':
            _inquirer2.default.prompt([_questions2.default.input_file_name, _questions2.default.output_file_name]).then(function (_ref2) {
                var input_file_name = _ref2.input_file_name,
                    output_file_name = _ref2.output_file_name;

                _fs2.default.exists(input_file_name, function (exists) {
                    if (exists) {
                        (0, _gm2.default)(input_file_name).resize(500, 240, '!').backdrop().write(output_file_name, function (err) {
                            return console.log(err);
                        });
                    } else {
                        console.log('File not exists.');
                    }
                });
            });
            break;
        case 'd':
            _inquirer2.default.prompt([_questions2.default.options]).then(function (ans) {
                console.log(ans);
            });
            break;
    }
});