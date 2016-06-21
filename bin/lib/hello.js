'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addHello;
function addHello(proggy) {
  return proggy.command('hello <name>').action(function (name) {
    return console.log("HELLO " + name + '!!');
  });
};