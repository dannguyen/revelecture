'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addMake;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Presentation = require('./Presentation');

var _Presentation2 = _interopRequireDefault(_Presentation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var revealPath = _path2.default.dirname(require.resolve('reveal'));
var srcJSPath = _path2.default.resolve(_path2.default.join('.', 'src', 'assets', 'javascript', 'reveal.js')); // FIX LATER
var srcCSSPath = _path2.default.resolve(_path2.default.join('.', 'src', 'assets', 'stylesheets', 'reveal.css')); // FIX LATER

function addMake(proggy) {
  return proggy.command('make <src> <dest>').action(function (src, dest) {
    console.log("Reading from " + srcPath + '!!');
    var srcPath = _path2.default.resolve(src);
    var destPath = _path2.default.resolve(dest);
    if (!_fsExtra2.default.existsSync(destPath)) {
      console.log('Creating dest: ' + destPath);
      _fsExtra2.default.mkdirSync(destPath);
    }

    var destPathSlideshow = _path2.default.join(destPath, 'slideshow.html');
    var presentation = new _Presentation2.default(srcPath);
    console.log(presentation.renderSlideshow());
    _fsExtra2.default.writeFileSync(destPathSlideshow, presentation.renderSlideshow());
    console.log('Created ' + destPathSlideshow);
    // copy over assets
    var srcStylePath = _path2.default.join(revealPath, 'theme', 'sky.css');
    var destStylePath = _path2.default.join(destPath, 'assets', 'stylesheets');
    _fsExtra2.default.mkdirpSync(destStylePath);
    _fsExtra2.default.copySync(srcStylePath, _path2.default.join(destStylePath, 'slideshow.css'));
    _fsExtra2.default.copySync(srcCSSPath, _path2.default.join(destStylePath, 'reveal.css'));

    var destJSPath = _path2.default.join(destPath, 'assets', 'javascript', 'reveal.js');
    _fsExtra2.default.mkdirpSync(_path2.default.dirname(destJSPath));
    _fsExtra2.default.copySync(srcJSPath, destJSPath);
  });
};