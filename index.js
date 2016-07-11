#!/usr/bin/env node
'use strict';
const pkg = require('./package.json');
import program from 'commander';
import addHelloCommand from './src/lib/commands/hello';
import addMakeCommand from './src/lib/commands/make';
import addServeCommand from './src/lib/commands/serve';

program.version(pkg.version)
       .usage("Use me lose me.");

addHelloCommand(program);
addMakeCommand(program);
addServeCommand(program);


program.parse(process.argv);
if(program.args.length < 2){
  program.help();
}
