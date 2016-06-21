#!/usr/bin/env node
'use strict';

var program = require('commander'),
    pkg = require('../package.json');

program
  .version(pkg.version)
  .usage("what up dude!")
  .command('hello [name]')
  .option('-n', '--name', 'Someone to say hi to')
  .action(name => console.log("HELLO " + name + '!!'));

program.parse(process.argv);

if(program.args.length < 2){
  program.help();
}
