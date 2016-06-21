#!/usr/bin/env node
'use strict';
const pkg = require('../package.json');
import program from 'commander';
import addHello from './lib/hello';

program
  .version(pkg.version)
  .usage("Use me lose me.");

addHello(program);

program.parse(process.argv);
if(program.args.length < 2){
  program.help();
}
