#!/usr/bin/env node
'use strict';
const pkg = require('../package.json');
import program from 'commander';
import addHello from './lib/hello';
import addMake from './lib/make';

program
  .version(pkg.version)
  .usage("Use me lose me.");

addHello(program);
addMake(program)


program.parse(process.argv);
if(program.args.length < 2){
  program.help();
}
