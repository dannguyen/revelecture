'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (filename) {
  var txt = _fs2.default.readFileSync(filename, 'utf8');
  var o = (0, _frontMatter2.default)(txt);
  o.attributes.filename = filename;
  return { content: o.body, meta: o.attributes };
};

var _frontMatter = require('front-matter');

var _frontMatter2 = _interopRequireDefault(_frontMatter);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }