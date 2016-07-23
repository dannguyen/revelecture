import glob from 'glob';
import path from 'path';
import Handlebars from 'handlebars';
import contentParser from './contentParser';
import Anecdote from './Anecdote';
import pretty from 'pretty';
import fs from 'fs-extra';
import yaml from 'yaml-js';


export default class Presentation{
  constructor(srcPath){
    this.srcPath = srcPath;
    this.configPath = path.join(this.srcPath, 'config.yaml')
    let config = this._config = yaml.load(fs.readFileSync(this.configPath))
    this.slidesDir = path.join(this.srcPath, config.slidesDir)
    this.articlePath = path.join(this.srcPath, config.output.articlePath)
    this.slideshowPath = path.join(this.srcPath, config.output.slideshowPath)

    this.articleTemplatePath = path.join(this.srcPath, config.templates.article)
    this.slideshowTemplatePath = path.join(this.srcPath, config.templates.slideshow)
    this.articleTemplate = Handlebars.compile(fs.readFileSync(this.articleTemplatePath, {encoding: 'utf-8'}));
    this.slideshowTemplate = Handlebars.compile(fs.readFileSync(this.slideshowTemplatePath, {encoding: 'utf-8'}));


    this.title = config.title || this.srcPath;
    this.description = config.description;

    console.log(`Title: ${this.title}`)
    console.log(`Description: ${this.description}`)
    console.log(`article template: ${this.articleTemplatePath}`)
    this.anecdotes = this._gather_anecdotes(this.slidesDir);
  }

  _gather_anecdotes(slidespath){
    console.log(`gathering from ${slidespath}`)
    let fnames = glob.sync(path.join(slidespath, '**', '*.md'));
    let anecdotes = []
    fnames.forEach(fname => {
      console.log(`Processing ${fname}`);
      anecdotes.push(new Anecdote(contentParser(fname)));
    })

    return anecdotes;
  }



  renderSlideshow(){
    return pretty(slideshowTemplate({
                    slides: this.anecdotes.map(o => o.renderSlide())}
                  ));
  }

  renderArticle(){
    return pretty(articleTemplate({
                    articles: this.anecdotes.map(o => o.renderArticle())}
                  ));
  }
};
