jest.disableAutomock();
import Anecdote from '../src/lib/Anecdote';
import {InvalidAnecdotalIframe} from '../src/lib/AnecdotalErrors';

describe('iframe is a special attribute', () => {
  describe('initialization and constructing', () => {
    it(':iframe attribute should be undefined by default', () => {
      let dote = new Anecdote({content: '', meta: {}});
      expect(dote.iframe).toBeUndefined();
    });

    it(':iframe should be an object with minimum of :src key', () => {
      let stuff = {content: '', meta: {iframe: {}}}
      expect(() => {new Anecdote(stuff)}).toThrow(new InvalidAnecdotalIframe(":iframe attribute must have :src attribute pointing to URL"));
    });
  });


  describe('rendering basic iframe HTML', () => {
    it('should add iframe HTML tag to slide with lazy-loading data-src style', () => {
      let iframeobj = {src: 'http://hakim.se'}
      let dote = new Anecdote({content: '', meta: {iframe: iframeobj}})
      let html = dote.renderSlide();
      expect(html).toMatch(/<section class="anecdote slide.+?data-background-iframe="http:\/\/hakim.se">/)
    })
  })



  describe('iframe: fullscreen: true', () => {
    xit('should overlay content over iframe as a background...?', () => {

    });
  })






})
