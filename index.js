#!/usr/bin/env node
'use strict';
const pkg = require('./package.json');
import program from 'commander';
import addHelloCommand from './src/lib/commands/hello';
import addScaffoldCommand from './src/lib/commands/scaffold';
import addMakeCommand from './src/lib/commands/make';
import addPresentCommand from './src/lib/commands/present';
import addServeCommand from './src/lib/commands/serve';

program.version(pkg.version)
       .usage("Use me lose me.");

addHelloCommand(program);
addScaffoldCommand(program);
addMakeCommand(program);
addPresentCommand(program);
addServeCommand(program);


program.parse(process.argv);
if(program.args.length < 2){
  program.help();
}
