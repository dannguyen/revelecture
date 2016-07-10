#!/usr/bin/env node
'use strict';
const pkg = require('../package.json');
import program from 'commander';
import addHello from './lib/commands/hello';
import addMake from './lib/commands/make';
import addServeCommand from './lib/commands/serve';

program
  .version(pkg.version)
  .usage("Use me lose me.");

addHello(program);
addMake(program);
addServeCommand(program);


program.parse(process.argv);
if(program.args.length < 2){
  program.help();
}
