import frontmatter from 'front-matter';
import fs from 'fs';
import path from 'path';


export let contentParser = filename => {
  let txt = fs.readFileSync(filename, 'utf8')
  let o = frontmatter(txt);
  o.attributes.filename = filename;
  return {content: o.body, meta: o.attributes};
}
