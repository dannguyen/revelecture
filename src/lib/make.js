'use strict'
import fs from 'fs';
import path from 'path';
import glob from 'glob';
import marked from 'marked';
import Handlebars from 'handlebars';

const slideTemplatePath = path.join(__dirname, '../templates/slide.html')

let markdownifyFile = fname => {
  let contents = fs.readFileSync(fname, 'utf8');
  return marked(contents);
};

let renderSlide = htmltxt => {
  let tempslide = Handlebars.compile(fs.readFileSync(slideTemplatePath, 'utf8'));
  return tempslide({content: htmltxt.trim() });
}



export default function addMake(proggy){
  return proggy.command('make <src>')
    .action(src => {
      let srcPath = path.resolve(src);
      console.log(`reading from ${srcPath}`)
      let slides = glob.sync(path.join(srcPath, '*.{html,md}'));
      slides.forEach(slideFilename => {
        // if (path.extname(slideFilename) == 'md'){
           let slideContents = markdownifyFile(slideFilename);
           let slideHTML = renderSlide(slideContents);
           console.log(slideHTML);
        // }
      });
    });
};
