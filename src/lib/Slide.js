import {InvalidSlideObjectError} from './SlideErrors'
import Handlebars from 'handlebars';
import marked from 'marked';
import _ from 'lodash';
import pretty from 'pretty';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});


export const htmlTemplate = Handlebars.compile(`
<div class="content">{{{ content }}}</div>
{{#if notes}}<div class="notes">{{{ notes }}}</div>{{/if}}`)

export const slideTemplate = Handlebars.compile(`
<section class="section slide">
  {{{ slideContent }}}
</section>`);


export default class Slide{
  constructor(object){
    if (!(_.isString(object.content) && _.isPlainObject(object.meta))){
      throw new InvalidSlideObjectError();
    }
    this.content = _.trim(object.content);
    this._meta = object.meta;
    this.title = _.isEmpty(this._meta.title) ? undefined : _.trim(this._meta.title);
    this.sectionTitle = this._meta.section === true ? true : false;
    this.notes = _.isEmpty(this._meta.notes) ? undefined : _.trim(this._meta.notes);
    this.transition = this._meta.transition;
    this.transition_speed = this._meta.transition_speed;
  }
  //
  // attributes:
  // - title
  // - cover_slide: true
  // - notes
  // - transition
  // - background:
  //     color:
  //     image:
  //     image-repeat:
  //     video:
  //     video-loop:
  //     video-muted:
  //     iframe:




  renderHTML(){
    let notes = this._htmlNotes(),
        content = "";
    content += this._mdTitle();
    content += marked(this.content);

    return _.trim(htmlTemplate({content: content, notes: notes}));
  }

  renderArticle(){

  }

  renderSlide(){
    return pretty(slideTemplate({slideContent: this.renderHTML()}));
  }


  _render(format){ }

  _mdTitle(){
    if (_.isEmpty(this.title)){ return ""; }
    let tslug = this.title.toLowerCase().replace(/[^\w]+/g, '-'); // this comes from marked
    if (this.sectionTitle === true){
      return `<h1 class="section-title title" id="${tslug}">${this.title}</h1>`
    }else{
      return `<h2 class="content-title title" id="${tslug}">${this.title}</h2>`;
    }
  }

  _htmlNotes(){
    if (_.isEmpty(this.notes)){ return ""; }
    return `\n<aside class="notes">${marked(this.notes)}</aside>`
  }

}
