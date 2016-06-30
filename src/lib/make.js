'use strict'
import fs from 'fs-extra';
import path from 'path';
import Presentation from './Presentation'

let revealPath = path.dirname(require.resolve('reveal'))
let srcJSPath = path.resolve(path.join('.', 'src', 'assets', 'javascript', 'reveal.js')); // FIX LATER
let srcCSSPath = path.resolve(path.join('.', 'src', 'assets', 'stylesheets', 'reveal.css')); // FIX LATER



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
      // copy over assets
      let srcStylePath = path.join(revealPath, 'theme', 'sky.css');
      let destStylePath = path.join(destPath, 'assets', 'stylesheets');
      fs.mkdirpSync(destStylePath);
      fs.copySync(srcStylePath, path.join(destStylePath, 'slideshow.css'));
      fs.copySync(srcCSSPath, path.join(destStylePath, 'reveal.css'))


      let destJSPath = path.join(destPath, 'assets', 'javascript', 'reveal.js');
      fs.mkdirpSync(path.dirname(destJSPath));
      fs.copySync(srcJSPath, destJSPath);


    });
};
