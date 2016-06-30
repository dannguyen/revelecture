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
var srcJSPath = _path2.default.resolve(_path2.default.join('.', 'src', 'assets', 'javascript')); // FIX LATER
var srcStylesPath = _path2.default.resolve(_path2.default.join('.', 'src', 'assets', 'stylesheets')); // FIX LATER

function addMake(proggy) {
  return proggy.command('make <src> <dest>').action(function (src, dest) {
    var srcPath = _path2.default.resolve(src);
    var destPath = _path2.default.resolve(dest);
    console.log("Reading from " + srcPath + '!!');
    console.log("Writing to " + destPath + '!!');

    if (!_fsExtra2.default.existsSync(destPath)) {
      console.log('Creating dest: ' + destPath);
      _fsExtra2.default.mkdirpSync(destPath);
    }

    var destPathSlideshow = _path2.default.join(destPath, 'slideshow.html');
    var presentation = new _Presentation2.default(srcPath);
    // console.log(presentation.renderSlideshow());
    // write the slideshow.html
    _fsExtra2.default.writeFileSync(destPathSlideshow, presentation.renderSlideshow());
    console.log('Created ' + destPathSlideshow);

    // copy over assets
    var destStylesPath = _path2.default.join(destPath, 'assets', 'stylesheets');
    _fsExtra2.default.mkdirpSync(destStylesPath);
    ['reveal.css', 'slideshow.css', 'theme.css'].forEach(function (af) {
      _fsExtra2.default.copySync(_path2.default.join(srcStylesPath, af), _path2.default.join(destStylesPath, af));
    });

    var destJSPath = _path2.default.join(destPath, 'assets', 'javascript');
    _fsExtra2.default.mkdirpSync(destJSPath);
    ['reveal.js', 'reveal-initialize.js'].forEach(function (af) {
      _fsExtra2.default.copySync(_path2.default.join(srcJSPath, af), _path2.default.join(destJSPath, af));
    });
  });
};