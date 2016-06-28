import contentParser from './contentParser';
import glob from 'glob';
import path from 'path';
import Slide from './Slide';

export default class Presentation{
  constructor(srcPath){
    this.srcPath = srcPath;
    this.title = 'Read from YAML or first slide';
    this.description = 'Get this from YAML or first slide';
    this.slides = this._gather_files(this.srcPath);
  }

  _gather_files(src_path){
    console.log(`gathering from ${src_path}`)
    let fnames = glob.sync(path.join(src_path, '*.md'));
    let slides = []
    fnames.forEach(fname => {
      console.log(`Processing ${fname}`);
      slides.push(new Slide(contentParser(fname)));
    })

    return slides;
  }



  renderSlideshow(){
    return this.slides.map(slide => {
       return slide.renderSlide();
    }).join("\n\n");
  }

  renderOverview(){

  }

  render(){

  }

}
