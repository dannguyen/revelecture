import fs from 'fs-extra';
import path from 'path';
import Presentation from './../Presentation'

export default function addPresentCommand(proggy){
  return proggy.command('present <src>')
    .alias('p')
    .description('Makes a complete presentation, including slideshow and article form from a <src> directory that follows the base scaffold template')
    .option('-o, --output-dir <dest>', 'Output directory. By default, the presentation is added to the <dest>')
    .action((src, options) => {
      let srcPath = path.resolve(src);
      let destPath = path.resolve(options.outputDir || srcPath);
      console.log("Reading from " + srcPath + '!!');
      console.log("Writing to " + destPath + '!!');

      if (!fs.existsSync(destPath)) {
          console.log(`Creating dest: ${destPath}`)
          fs.mkdirpSync(destPath)
      }

      buildPresentation(srcPath, destPath);
    });
};


export function buildPresentation(srcPath, destPath){
  let presentation = new Presentation(srcPath);

  fs.writeFileSync(presentation.slideshowPath, presentation.renderSlideShow());
  console.log(`Created ${presentation.slideshowPath}`);

  fs.writeFileSync(presentation.articlePath, presentation.renderArticle());
  console.log(`Created ${presentation.articlePath}`);
}
