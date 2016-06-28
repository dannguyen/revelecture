jest.disableAutomock();
import tempyfile from './helpers/tempyfile';
import contentParser from '../src/lib/contentParser';


describe('contentParser()', () => {
  afterEach(function() {
    tempyfile.sweep();
  });

  it('should set meta.filename at a minimum', () => {
    let tname = tempyfile.create("");
    let data = contentParser(tname);
    expect(data.meta.filename).toEqual(tname);
    expect(data.content).toEqual("");
  })

  it('should have a content value even if no frontmatter is set', () => {
    let tname = tempyfile.create("hello world");
    let data = contentParser(tname);
    expect(data.content).toEqual("hello world");
  })


  describe("frontmatter parsing", () => {
    let tname = tempyfile.create("---\ntitle: Hello\nbackground:\n  color: pink\n---\n## Goodbye world\n");
    let stuff = contentParser(tname);

    it('should parse frontmatter as yaml and store in meta Object', () => {
      expect(stuff.meta.title).toEqual('Hello')
      expect(stuff.meta.background.color).toEqual('pink')
    });

    it('should preserve non-frontmatter exactly', () => {
      expect(stuff.content).toEqual('## Goodbye world\n');
    });
  })
})

// import {markdownifyFile} from '../src/lib/make';
//
//
// describe('markdownifyFile()', () => {
//   afterEach(function() {
//     tempyfile.sweep();
//   });
//
//   describe('parsing of frontmatter data and content', () => {
//     it('should have an empty data structure if no front matter exists', () => {
//       let slide = markdownifyFile(tempyfile.create('hi'));
//       expect(slide.data).toEqual({});
//     })
//
//     it('should have front matter if specified', () => {
//       let slide = markdownifyFile(tempyfile.create('---\ntitle: dan\n---\n'));
//       expect(slide.data).toEqual({title: 'dan'});
//     })
//
//     it('should not have content if nothing after the front matter', () => {
//       let slide = markdownifyFile(tempyfile.create('---\ntitle: dan\n---\n'));
//       expect(slide.content).toEqual("");
//     })
//   })
//
//   describe('markdown to HTML rendering', () => {
//     it('should open a file and return txt formatted as HTML', () => {
//       let tmpPath = tempyfile.create('# hey\n## You?');
//       let slide = markdownifyFile(tmpPath);
//       expect(slide.content).toEqual('<h1 id="hey">hey</h1>\n<h2 id="you-">You?</h2>\n');
//     })
//
//     it('should leave HTML well enough alone', () => {
//       let tmpPath = tempyfile.create('hi there\n<iframe width="800" height="500" src="http://example.com"></iframe>');
//       let slide = markdownifyFile(tmpPath);
//       expect(slide.content).toEqual('<p>hi there</p>\n<iframe width="800" height="500" src="http://example.com"></iframe>')
//     })
//   })
// })
