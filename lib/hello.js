'use strict';

export default function addHello(proggy){
  return proggy.command('hello [name]')
    .option('-n', '--name', 'Someone to say hi to')
    .action(function (name) {
      console.log("HELLO " + name + '!!');
    });
};
