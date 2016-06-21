#!/usr/bin/env node

'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _hello = require('./lib/hello');

var _hello2 = _interopRequireDefault(_hello);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pkg = require('../package.json');


_commander2.default.version(pkg.version).usage("Use me lose me.");

(0, _hello2.default)(_commander2.default);

_commander2.default.parse(process.argv);
if (_commander2.default.args.length < 2) {
  _commander2.default.help();
}
