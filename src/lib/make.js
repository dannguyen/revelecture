'use strict'
import path from 'path';
import Presentation from './Presentation'

export default function addMake(proggy){
  return proggy.command('make <src>')
    .action(src => {
      let srcPath = path.resolve(src);
      console.log("Reading from " + srcPath + '!!');
      let presentation = new Presentation(srcPath);
      console.log(presentation.renderSlideshow());
    });
};
