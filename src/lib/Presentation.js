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

    // configure paths
    this.slidesDir = path.join(this.srcPath, config.paths.slides);
    this.stylesheetsDir = path.join(this.srcPath, config.paths.assets.stylesheets);
    this.javascriptDir = path.join(this.srcPath, config.paths.assets.javascript);
    this.imagesDir = path.join(this.srcPath, config.paths.assets.images);

    this.articlePath = path.join(this.srcPath, config.paths.output.article);
    this.slideshowPath = path.join(this.srcPath, config.paths.output.slideshow);
    // templates
    this.articleTemplatePath = path.join(this.srcPath, config.paths.templates.article)
    this.slideshowTemplatePath = path.join(this.srcPath, config.paths.templates.slideshow)
    this.articleTemplate = Handlebars.compile(fs.readFileSync(this.articleTemplatePath, {encoding: 'utf-8'}));
    this.slideshowTemplate = Handlebars.compile(fs.readFileSync(this.slideshowTemplatePath, {encoding: 'utf-8'}));

    // configure meta
    this.title = config.title || this.srcPath;
    this.description = config.description;
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
    let html = this.slideshowTemplate({slides: this.anecdotes.map(o => o.renderSlide())})
    return pretty(html);
  }

  renderArticle(){
    let html = this.articleTemplate({articles: this.anecdotes.map(o => o.renderArticle())})
    return pretty(html);
  }
};
