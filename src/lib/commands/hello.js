'use strict'

export default function addHelloCommand(proggy){
  return proggy.command('hello <name>')
    .action(name => console.log("HELLO " + name + '!!') );
};
