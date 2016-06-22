jest.disableAutomock();
import {markdownifyFile, renderSlide} from '../src/lib/make';
import fs from 'fs';
let tempfile = require("temp").track();

let createTempfile = body => {
  let fname = tempfile.path();
  fs.writeFileSync(fname, body);
  return fname;
}




describe('markdownifyFile()', () => {
  afterEach(function() {
    tempfile.cleanupSync();
  });

  it('should open a file and return txt formatted as HTML', () => {
    let tmpPath = createTempfile('# hey\n## You?');
    expect(markdownifyFile(tmpPath)).toEqual('<h1 id="hey">hey</h1>\n<h2 id="you-">You?</h2>\n');
  })

  it('should leave HTML well enough alone', () => {
    let tmpPath = createTempfile('hi there\n<iframe width="800" height="500" src="http://example.com"></iframe>');
    expect(markdownifyFile(tmpPath)).toEqual('<p>hi there</p>\n<iframe width="800" height="500" src="http://example.com"></iframe>')
  })
})


describe('renderSlide()', () => {
  it('should return the expected slide Template tag with unescaped, trimmed HTML', () => {
    const htxt = `<h1>Hello</h1> <p>there</p>
          `;

    expect(renderSlide(htxt)).toEqual(`<section class="slide"><h1>Hello</h1> <p>there</p></section>`)
  });
})


describe('options for slides', () => {


})
