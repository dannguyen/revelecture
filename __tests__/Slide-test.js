jest.disableAutomock();
import Slide from '../src/lib/Slide';
import {InvalidSlideObjectError} from '../src/lib/SlideErrors';

describe('Slide constructor', () => {
  describe("minimal object", () => {
    let error_message = "Argument must be an Object: { content: [String], meta: [Object] }";
    it('accepts an object, exclusively', () => {
      expect(() => { new Slide("Boo") }).toThrow(new InvalidSlideObjectError);
    });

    it('requires a :content String', () => {
      let obj = {meta: {}}
      expect(() => { new Slide(obj) }).toThrow(new InvalidSlideObjectError);
    });

    it('requires a :meta object', () => {
      let obj = {content: "hello"}
      expect(() => { new Slide(obj) }).toThrow(new InvalidSlideObjectError);
    });

    it('can have meta and content be blank/empty', () => {
      let obj = {content: '', meta: {}};
      let slide = new Slide(obj)
      expect(slide.content).toEqual('');
      expect(slide._meta).toEqual({});
      expect(slide.title).toBeUndefined();
    })
  })

  describe("meta attributes", () => {
    let meta = {
      title: "  My title ",
      notes: "  # These notes  ",
      background: {
        color: 'pink'
      },
      transition: "fade-in slide-out",
      transition_speed: "fast"
    };
    let slide = new Slide({content: "This is regular text", meta: meta})

    it('should derive a title, trimmed of white space', () => {
      expect(slide.title).toEqual("My title");
    });

    it('should derive notes but not render them yet as HTML via markdown', () => {
      expect(slide.notes).toEqual("  # These notes  ");
    });

    it('should derive transition data as literal strings', () => {
      expect(slide.transition).toEqual('fade-in slide-out');
      expect(slide.transition_speed).toEqual('fast');
    });
  });


  describe("renderHTML()", () => {
    it("should render Markdown :content as HTML", () => {
      let slide = new Slide({content: '### Hello *world*', meta: {}})
      expect(slide.renderHTML()).toEqual('<h3 id="hello-world-">Hello <em>world</em></h3>');
    });
  });

  describe("renderSlide()", () => {
    it(`should contain a section class="slide"`, () => {
      let slide = new Slide({content: '### Hello *world*', meta: {}})
      let html = slide.renderSlide();
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
