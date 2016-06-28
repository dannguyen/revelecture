import fs from 'fs';
import glob from 'glob';
import path from 'path';
import frontmatter from 'front-matter';

export let markdownifyFile = filename => {
  let thing = {content: "", data: {}};
  let txt = fs.readFileSync(filename, 'utf8')
  let o = frontmatter(txt);
  thing.content = marked(o.body)
  thing.data = o.attributes
  return thing;
};


export let gatherFiles = src => {
  let srcPath = path.resolve(src);
  console.log(`reading from ${srcPath}`)
  let slides = glob.sync(path.join(srcPath, '*.{html,md}'));
  slides.forEach(slideFilename => {
    let slideContents = markdownifyFile(slideFilename);
    //let slideHTML = renderSlide(slideContents);
    //console.log(slideHTML);
  });
}



'use strict'
import fs from 'fs';
import glob from 'glob';
import path from 'path';

import frontmatter from 'front-matter';
import Handlebars from 'handlebars';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});

// const slideTemplatePath = path.join(__dirname, '../templates/slide.html')
const slideTemplate = Handlebars.compile(`<section class="slide">{{{ content }}}</section>`);

export let renderSlide = slide => {
  if (!(typeof slide.content === 'string' && typeof slide.data === 'object' && slide.data)){
          throw new InvalidSlideObjectError();
  }

  let htmltxt = slide.content;
  let data = slide.data;
  return slideTemplate({content: htmltxt.trim(), data: data}).trim();
}


export default function addMake(proggy){
  return proggy.command('make <src>')
    .action(src => {

    });
};


export class InvalidSlideObjectError extends Error {
  constructor(message = `Argument must be an Object with {content: 'string', data: {}}`){
    super(message)
    this.message = message;
    this.name = 'InvalidSlideObjectError'
  }
}
