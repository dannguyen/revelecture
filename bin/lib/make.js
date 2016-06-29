'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMake;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Presentation = require('./Presentation');

var _Presentation2 = _interopRequireDefault(_Presentation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addMake(proggy) {
  return proggy.command('make <src> <dest>').action(function (src, dest) {
    console.log("Reading from " + srcPath + '!!');
    var srcPath = _path2.default.resolve(src);
    var destPath = _path2.default.resolve(dest);
    if (!_fs2.default.existsSync(destPath)) {
      console.log('Creating dest: ' + destPath);
      _fs2.default.mkdirSync(destPath);
    }

    var destPathSlideshow = _path2.default.join(destPath, 'slideshow.html');
    var presentation = new _Presentation2.default(srcPath);
    console.log(presentation.renderSlideshow());
    _fs2.default.writeFileSync(destPathSlideshow, presentation.renderSlideshow());
    console.log('Created ' + destPathSlideshow);
  });
};