jest.disableAutomock();
import {renderSlide, InvalidSlideObjectError} from '../src/lib/make';

// TODO: make slide a class


describe('renderSlide(slide)', () => {
  let error_message = "Argument must be an Object with {content: '', data: {}}"
  describe('slide object validation', () => {
    it('should crash if slide is not an Object', () => {
       expect(() => { renderSlide("boo") }).toThrow(new InvalidSlideObjectError)
    })
    it('should crash if :content is not a string', () => {
      let slide = {data: {}, content: {}};
      expect(() => { renderSlide(slide) }).toThrow(new InvalidSlideObjectError)
    })
    it('should crash if :data is not an object', () => {
      let slide = {data: "hi", content: "hello"}
       expect(() => { renderSlide(slide) }).toThrow(new InvalidSlideObjectError)
    })
  });


  describe('how the contents get rendered', () => {
    it('should return the expected slide Template tag with unescaped, trimmed HTML', () => {
      const slide = {content: '\n<h1>Hello</h1> <p>there</p>\n  \n', data: {}};
      expect(renderSlide(slide)).toEqual(`<section class="slide"><h1>Hello</h1> <p>there</p></section>`)
    })
  });


});



// describe('options for slides', () => {
//
//
// })
