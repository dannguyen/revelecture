import {InvalidAnecdotalError, InvalidAnecdotalIframe} from './AnecdotalErrors'
import Handlebars from 'handlebars';
import marked from 'marked';
import _ from 'lodash';
import urlparse from 'url-parse';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});


export const htmlTemplate = Handlebars.compile(`<div class="content">{{{ content }}}</div>`)
export const slideTemplate = Handlebars.compile(`
<section class="anecdote slide" {{#if iframe}}data-background-iframe="{{iframe.src}}"{{/if}}>
  {{{ slideContent }}}
  {{#if notes}}<aside class="notes">{{{ notes }}}</aside>{{/if}}
</section>`);

export const articleTemplate = Handlebars.compile(`
<section class="anecdote article">
  <section class="row">
    <div class="col-sm-8">
      {{#if notes}}<div class="notes">{{{ notes }}}</div>{{/if}}
      <br>
    </div>
    <div class="col-sm-4">
      {{{ slideContent }}}
    </div>
  </section>
</section>`);



export default class Anecdote{
  constructor(object){
    if (!(_.isString(object.content) && _.isPlainObject(object.meta))){
      throw new InvalidAnecdotalError();
    }
    let meta = object.meta;
    this.content = _.trim(object.content);
    this.title = _.isEmpty(meta.title) ? undefined : _.trim(meta.title);
    this.sectionTitle = meta.section === true ? true : false;
    this.notes = _.isEmpty(meta.notes) ? undefined : _.trim(meta.notes);
    this.transition = meta.transition;
    this.transition_speed = meta.transition_speed;

    // iframe stuff
    this.iframe = meta.iframe;
    if (!_.isUndefined(this.iframe)){
      if (_.isUndefined(this.iframe.src)){
        throw new InvalidAnecdotalIframe(":iframe attribute must have :src attribute pointing to URL");
      }
    }
    // youtube stuff
    if (!_.isUndefined(meta.youtube)){
        // hijack this.iframe (this is dangerous btw)
        let yurl = urlparse(meta.youtube);
        this.iframe = {src: `https://www.youtube.com/embed${yurl.pathname}`};
    }
  }



  renderBody(){
    let content = "";
    content += this._mdTitle();
    content += this._mkIframe();
    content += `<div class="content-body">${marked(this.content)}</div>`;

    return htmlTemplate({ content: content });
  }

  renderArticle(){
    let _slidecontent = this.renderBody();
    let _notes = this.htmlNotes();
    return articleTemplate({slideContent: _slidecontent, notes: _notes});
  }

  renderSlide(){
    let _slidecontent = this.renderBody();
    let _notes = this.htmlNotes();
    return slideTemplate({
      slideContent: _slidecontent,
      notes: _notes,
      iframe: this.iframe
    });
  }


  htmlNotes(){
    if (_.isEmpty(this.notes)){ return ""; }
    return `${marked(this.notes)}`
  }


  _mdTitle(){
    if (_.isEmpty(this.title)){ return ""; }
    let tslug = this.title.toLowerCase().replace(/[^\w]+/g, '-'); // this comes from marked
    if (this.sectionTitle === true){
      return `<h1 class="section-title content-title" id="${tslug}">${this.title}</h1>`
    }else{
      return `<h2 class="content-title" id="${tslug}">${this.title}</h2>`;
    }
  }

  _mkIframe(){
    if (this.iframe){
      // return `<iframe data-src="${this.iframe.src}"></iframe>`
      return ``
    }else{
      return "";
    }
  }
}



//
// attributes:
// - title: text
// - section: true/false
// - notes: markdown text
// - transition
// - background:
//     color:
//     image:
//     image-repeat:
//     video:
//     video-loop:
//     video-muted:
//     iframe:
