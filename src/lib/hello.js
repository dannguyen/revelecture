'use strict'

export default function addHello(proggy){
  return proggy.command('hello <name>')
    .action(name => console.log("HELLO " + name + '!!') );
};
