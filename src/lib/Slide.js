import {InvalidSlideObjectError} from './SlideErrors'
import Handlebars from 'handlebars';
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true
});


export const slideTemplate = Handlebars.compile(`<section class="slide">{{{ content }}}</section>`);


export class Slide{
  constructor(object){
    if (!(typeof object.content === 'string' && typeof object.meta === 'object' && object.meta)){
      throw new InvalidSlideObjectError();
    }
    this.content = object.content.trim();
    this._meta = object.meta;
    this.title = this._meta.title !== undefined ? this._meta.title.trim() : undefined;
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
    return marked(this.content).trim();
  }

  renderSlide(){
    return slideTemplate({content: this.renderHTML()});
  }

  renderSection(){

  }

  _render(format){ }
}
