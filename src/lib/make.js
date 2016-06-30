'use strict'
import fs from 'fs-extra';
import path from 'path';
import Presentation from './Presentation'

let revealPath = path.dirname(require.resolve('reveal'))
let srcJSPath = path.resolve(path.join('.', 'src', 'assets', 'javascript')); // FIX LATER
let srcStylesPath = path.resolve(path.join('.', 'src', 'assets', 'stylesheets')); // FIX LATER



export default function addMake(proggy){
  return proggy.command('make <src> <dest>')
    .action((src, dest) => {
      let srcPath = path.resolve(src);
      let destPath = path.resolve(dest);
      console.log("Reading from " + srcPath + '!!');
      console.log("Writing to " + destPath + '!!');

      if (!fs.existsSync(destPath)) {
          console.log(`Creating dest: ${destPath}`)
          fs.mkdirpSync(destPath)
      }

      let destPathSlideshow = path.join(destPath, 'slideshow.html');
      let presentation = new Presentation(srcPath);
      // console.log(presentation.renderSlideshow());
      // write the slideshow.html
      fs.writeFileSync(destPathSlideshow, presentation.renderSlideshow());
      console.log(`Created ${destPathSlideshow}`);

      // copy over assets
      let destStylesPath = path.join(destPath, 'assets', 'stylesheets');
      fs.mkdirpSync(destStylesPath);
      ['reveal.css', 'slideshow.css', 'theme.css'].forEach(af => {
        fs.copySync(path.join(srcStylesPath, af), path.join(destStylesPath, af))
      });


      let destJSPath = path.join(destPath, 'assets', 'javascript');
      fs.mkdirpSync(destJSPath);
      ['reveal.js', 'reveal-initialize.js'].forEach(af => {
        fs.copySync(path.join(srcJSPath, af), path.join(destJSPath, af))
      });


    });
};
