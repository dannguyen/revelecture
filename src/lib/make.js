'use strict'
import fs from 'fs';
import glob from 'glob';
import path from 'path';

import Handlebars from 'handlebars';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

// const slideTemplatePath = path.join(__dirname, '../templates/slide.html')
const slideTemplate = Handlebars.compile(`<section class="slide">{{{ content }}}</section>`);

export let markdownifyFile = filename => {
  return marked(fs.readFileSync(filename, 'utf8'));
};

export let renderSlide = htmltxt => {
  return slideTemplate({content: htmltxt.trim()}).trim();
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
