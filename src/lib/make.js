'use strict'
import fs from 'fs';
import path from 'path';
import Presentation from './Presentation'

export default function addMake(proggy){
  return proggy.command('make <src> <dest>')
    .action((src, dest) => {
      console.log("Reading from " + srcPath + '!!');
      let srcPath = path.resolve(src);
      let destPath = path.resolve(dest);
      if (!fs.existsSync(destPath)) {
          console.log(`Creating dest: ${destPath}`)
          fs.mkdirSync(destPath)
      }

      let destPathSlideshow = path.join(destPath, 'slideshow.html');
      let presentation = new Presentation(srcPath);
      console.log(presentation.renderSlideshow());
      fs.writeFileSync(destPathSlideshow, presentation.renderSlideshow());
      console.log(`Created ${destPathSlideshow}`);
    });
};
