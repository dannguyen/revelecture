import glob from 'glob';
import path from 'path';
import Handlebars from 'handlebars';
import contentParser from './contentParser';
import Anecdote from './Anecdote';
import pretty from 'pretty';
import fs from 'fs-extra';


export default class Presentation{
  constructor(srcPath){
    this.srcPath = srcPath;
    this.articleTemplatePath = path.join(this.srcPath, 'templates', 'article.html')
    this.articleTemplate = Handlebars.compile(fs.readFileSync(articleTemplatePath));
    this.slideshowTemplatePath = path.join(this.srcPath, 'templates', 'slideshow.html')
    this.slideshowTemplate = Handlebars.compile(fs.readFileSync(articleTemplatePath));


    this.title = 'Read from YAML or first slide';
    this.description = 'Get this from YAML or first slide';
    this.anecdotes = this._gather_anecdotes(this.srcPath);
  }

  _gather_anecdotes(src_path){
    console.log(`gathering from ${src_path}`)
    let fnames = glob.sync(path.join(src_path, '**', '*.md'));
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

  render(){

  }
}




// let revealjs_required_path = path.resolve(require.resolve('reveal'));

// const slideshowTemplate = Handlebars.compile(`<html>
//     <head>
//       {{#each stylesheets as |css_path|}}
//         <link rel="stylesheet" href="{{css_path}}">
//       {{/each}}
//     </head>
//     <body>
//         <div class="reveal">
//             <div class="slides">
//               {{#each slides as |slide|}}
//                  {{{slide}}}
//               {{/each}}
//             </div>
//         </div>
//         <script src="{{revealjs_path}}"></script>
//         <script>
//             Reveal.initialize();
//         </script>
//     </body>
// </html>`);


// = Handlebars.compile(`<html>
//     <head>
//         <link rel="stylesheet" href="assets/stylesheets/theme.css">
//         <link rel="stylesheet" href="assets/stylesheets/article.css">
//         <link rel="stylesheet" href="assets/stylesheets/code.css">
//         <link rel="stylesheet" href="assets/stylesheets/grid.css">
//     </head>
//     <body class="revelecture revelecture-article">
//         <article class="articles">
//           <div class="container">
//             {{#each articles as |article|}}
//                {{{article}}}
//             {{/each}}
//           </div>
//         </article>
//     </body>
// </html>`);
//
