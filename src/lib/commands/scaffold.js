// Scaffold creates a project folder that copies base template assets
import fs from 'fs-extra';
import path from 'path';
const baseScaffoldDir = './src/scaffolds/base';  // todo: figure out relative path



export default function addScaffoldCommand(proggy){
  return proggy.command('scaffold <dest>')
    .alias('new')
    .description('Creates a project skeleton at <dest> directory.')
    .option('--source-dir <src>', 'Point to a custom scaffold directory. By default, the scaffold at scaffolds/base is used')
    .option('--overwrite', 'Overwrite existing paths in the destination directory')
    .action((dest, options) => {
      let destPath = path.resolve(dest);
      let srcPath = path.resolve(options.sourceDir || baseScaffoldDir);
      console.log(`Reading scaffold: ${srcPath}`);
      console.log(`Writing to: ${destPath}`);
      if (!fs.existsSync(destPath)) {
          console.log(`Created destination directory: ${destPath}`)
          fs.mkdirpSync(destPath)
      }

      buildScaffold(destPath, srcPath, options.overwrite);
    });
};





export function buildScaffold(destPath, scaffoldPath, overwriteExistingFiles=false){
  let slidesDir = path.join(destPath, 'slides');
  if(!fs.existsSync(slidesDir)){
    let fillerSlidePath = path.join(slidesDir, '00001-hello.md');
    fs.mkdirpSync(slidesDir);
    fs.writeFileSync(
      fillerSlidePath,
`---
title: This is your first non-title slide
notes: |
  This is where you can put notes.
---

- Add Markdown files into the \`slides/\` directory.
- Add metadata in \`config.yaml\``)
    console.log(`Created: ${fillerSlidePath}`);

    // TODO: move out later
    fs.writeFileSync(path.join(slidesDir, '00002-goodbye.md'),
`---
title: Have fun!
---

![Brunswick, MD Pontoon Bridge - via The Library of Congress](images/loc-brunswick-md-pontoon-bridge-potomac-opt.jpg)

Image source: [Brunswick, MD Pontoon Bridge - via The Library of Congress](https://www.flickr.com/photos/library_of_congress/5597849001)
`);


  }

  if (!fs.existsSync(destPath)) {
      console.log(`Created destination directory: ${destPath}`)
      fs.mkdirpSync(destPath)
  }

  ['config.yaml', 'stylesheets/', 'javascript/', 'images/', 'templates/article.html', 'templates/slideshow.html'].forEach(
    fpath => {
      let dpath = path.join(destPath, fpath)
      if (!fs.existsSync(dpath) || overwriteExistingFiles == true){
        fs.copySync(path.join(scaffoldPath, fpath), dpath);
        console.log(`Created: ${dpath}`);
      } else{
        console.log(`Exists: ${dpath}; use --overwrite to force an overwrite`);
      }
    }
  )

}
