'use strict'
import fs from 'fs-extra';
import path from 'path';
import Presentation from './../Presentation'

let revealPath = path.dirname(require.resolve('reveal'))
let srcJSPath = path.resolve(path.join('.', 'src', 'assets', 'javascript')); // FIX LATER
let srcStylesPath = path.resolve(path.join('.', 'src', 'assets', 'stylesheets')); // FIX LATER



export default function addMake(proggy){
  return proggy.command('make <src>')
    .alias('m')
    .description('Makes a complete presentation, including slideshow and article form of <src> directory')
    .option('-o, --output-dir <dest>', 'Output directory. By default, the presentation is added to the <dest>')
    .action((src, options) => {
      let srcPath = path.resolve(src);
      let destPath = path.resolve(options.outputDir);
      console.log("Reading from " + srcPath + '!!');
      console.log("Writing to " + destPath + '!!');

      if (!fs.existsSync(destPath)) {
          console.log(`Creating dest: ${destPath}`)
          fs.mkdirpSync(destPath)
      }

      let presentation = new Presentation(srcPath);

      // write the slideshow.html
      let destPathSlideshow = path.join(destPath, 'slideshow.html');
      fs.writeFileSync(destPathSlideshow, presentation.renderSlideshow());
      console.log(`Created ${destPathSlideshow}`);

      // write the article.html
      let destPathArticle = path.join(destPath, 'article.html');
      fs.writeFileSync(destPathArticle, presentation.renderArticle());
      console.log(`Created ${destPathArticle}`);

      // copy over assets
      let destStylesPath = path.join(destPath, 'assets', 'stylesheets');
      fs.mkdirpSync(destStylesPath);
      ['article.css', 'reveal.css', 'slideshow.css', 'theme.css', 'code.css', 'grid.css'].forEach(af => {
        fs.copySync(path.join(srcStylesPath, af), path.join(destStylesPath, af))
      });

      // copy reveal JS
      let destJSPath = path.join(destPath, 'assets', 'javascript');
      fs.mkdirpSync(destJSPath);
      ['reveal.js', 'reveal-initialize.js', 'plugins'].forEach(af => {
        fs.copySync(path.join(srcJSPath, af), path.join(destJSPath, af))
      });
    });
};
