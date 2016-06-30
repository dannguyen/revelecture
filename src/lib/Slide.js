import {InvalidSlideObjectError} from './SlideErrors'
import Handlebars from 'handlebars';
import marked from 'marked';
import _ from 'lodash';
import pretty from 'pretty';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});


export const slideTemplate = Handlebars.compile(`<section class="slide">{{{ content }}}</section>`);


export default class Slide{
  constructor(object){
    if (!(_.isString(object.content) && _.isPlainObject(object.meta))){
      throw new InvalidSlideObjectError();
    }
    this.content = object.content.trim();
    this._meta = object.meta;
    this.title = _.isEmpty(this._meta.title) ? undefined : _.trim(this._meta.title);
    this.notes = this._meta.notes;
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
    let html = "";
    html += this._HTMLtitle();
    html += marked(this.content).trim();
    return html;
  }

  renderSlide(){
    return pretty(slideTemplate({content: this.renderHTML()}));
  }

  renderSection(){

  }

  _render(format){ }

  _HTMLtitle(){
    return _.isEmpty(this.title) ? "" : marked(`## ${this.title}`) + '\n';
  }

}
