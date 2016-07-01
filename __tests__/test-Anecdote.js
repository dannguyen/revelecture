jest.disableAutomock();
import Anecdote from '../src/lib/Anecdote';
import {InvalidAnecdotalError} from '../src/lib/AnecdotalErrors';

describe('Slide constructor', () => {
  describe("minimal object", () => {
    let error_message = "Argument must be an Object: { content: [String], meta: [Object] }";
    it('accepts an object, exclusively', () => {
      expect(() => { new Anecdote("Boo") }).toThrow(new InvalidAnecdotalError);
    });

    it('requires a :content String', () => {
      let obj = {meta: {}}
      expect(() => { new Anecdote(obj) }).toThrow(new InvalidAnecdotalError);
    });

    it('requires a :meta object', () => {
      let obj = {content: "hello"}
      expect(() => { new Anecdote(obj) }).toThrow(new InvalidAnecdotalError);
    });

    it('can have meta and content be blank/empty', () => {
      let obj = {content: '', meta: {}};
      let a = new Anecdote(obj)
      expect(a.content).toEqual('');
      expect(a._meta).toEqual({});
      expect(a.title).toBeUndefined();
    })
  })

  describe("passing of meta attributes to Anecdote constructor", () => {
    let meta = {
      title: "  My title ",
      notes: "  # These notes  ",
      background: {
        color: 'pink'
      },
      transition: "fade-in slide-out",
      transition_speed: "fast"
    };
    let a = new Anecdote({content: "This is regular text", meta: meta})

    it('should derive a title, trimmed of white space', () => {
      expect(a.title).toEqual("My title");
    });

    it('should not be a sectionTitle unless section: true', () => {
      expect(a.sectionTitle).toBe(false);
    })

    it('should derive notes but not render them yet as HTML via markdown', () => {
      expect(a.notes).toEqual("# These notes");
    });

    it('should derive transition data as literal strings', () => {
      expect(a.transition).toEqual('fade-in slide-out');
      expect(a.transition_speed).toEqual('fast');
    });
  });


  describe("renderSlide()", () => {
    it(`should contain a section class="slide"`, () => {
      let a = new Anecdote({content: '### Hello *world*', meta: {}})
      let html = a.renderSlide().replace(/\s+/g, ' ');
      expect(html).toContain('<h3 id="hello-world-">Hello <em>world</em></h3>');
      expect(html).toMatch(/<section class=".*?slide.*?"/);
    });
  });


})

//
//
// describe('renderSlide(slide)', () => {
//   let error_message = "Argument must be an Object with {content: '', data: {}}"
//   describe('slide object validation', () => {
//     it('should crash if slide is not an Object', () => {
//        expect(() => { renderSlide("boo") }).toThrow(new InvalidSlideObjectError)
//     })
//     it('should crash if :content is not a string', () => {
//       let slide = {data: {}, content: {}};
//       expect(() => { renderSlide(slide) }).toThrow(new InvalidSlideObjectError)
//     })
//     it('should crash if :data is not an object', () => {
//       let slide = {data: "hi", content: "hello"}
//        expect(() => { renderSlide(slide) }).toThrow(new InvalidSlideObjectError)
//     })
//   });
//
//
//   describe('how the contents get rendered', () => {
//     it('should return the expected slide Template tag with unescaped, trimmed HTML', () => {
//       const slide = {content: '\n<h1>Hello</h1> <p>there</p>\n  \n', data: {}};
//       expect(renderSlide(slide)).toEqual(`<section class="slide"><h1>Hello</h1> <p>there</p></section>`)
//     })
//   });
// });
//


// describe('options for slides', () => {
//
//
// })
