import {InvalidAnecdotalError} from './AnecdotalErrors'
import Handlebars from 'handlebars';
import marked from 'marked';
import _ from 'lodash';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});


export const htmlTemplate = Handlebars.compile(`<div class="content">{{{ content }}}</div>`)

export const slideTemplate = Handlebars.compile(`
<section class="anecdote slide">
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
    this.content = _.trim(object.content);
    this._meta = object.meta;
    this.title = _.isEmpty(this._meta.title) ? undefined : _.trim(this._meta.title);
    this.sectionTitle = this._meta.section === true ? true : false;
    this.notes = _.isEmpty(this._meta.notes) ? undefined : _.trim(this._meta.notes);
    this.transition = this._meta.transition;
    this.transition_speed = this._meta.transition_speed;
    this.children = this._buildChildren(this._meta.children);
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




  renderBody(){
    let content = "";
    content += this._mdTitle();
    content += `<div class="content-body">${marked(this.content)}</div>`;

    return htmlTemplate({ content: content });
  }

  renderArticle(){
    let _slidecontent = this.renderBody();
    let _notes = this._htmlNotes();
    return articleTemplate({slideContent: _slidecontent, notes: _notes});
  }

  renderSlide(){
    let _slidecontent = this.renderBody();
    let _notes = this._htmlNotes();
    return slideTemplate({slideContent: _slidecontent, notes: _notes});
  }


  _render(format){ }

  _mdTitle(){
    if (_.isEmpty(this.title)){ return ""; }
    let tslug = this.title.toLowerCase().replace(/[^\w]+/g, '-'); // this comes from marked
    if (this.sectionTitle === true){
      return `<h1 class="section-title content-title" id="${tslug}">${this.title}</h1>`
    }else{
      return `<h2 class="content-title" id="${tslug}">${this.title}</h2>`;
    }
  }

  _htmlNotes(){
    if (_.isEmpty(this.notes)){ return ""; }
    return `${marked(this.notes)}`
  }

  _buildChildren(childrenDir){
    if (_.isEmpty(childrenDir)){ return [] }
    return [];
  }

}
