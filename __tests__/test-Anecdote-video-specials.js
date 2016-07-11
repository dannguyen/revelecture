jest.disableAutomock();
import Anecdote from '../src/lib/Anecdote';
describe('special cases', () => {
  describe('youtube special case', () => {
    it('src: youtube shortlink should be recognized', () => {
      let obj = {content: '', meta: {youtube: "https://youtu.be/Yth7O6yeZRE?t=13s"}};
      let ac = new Anecdote(obj);
      expect(ac.iframe.src).toEqual("https://www.youtube.com/embed/Yth7O6yeZRE")
    })


    xit('src: youtube?v=someid should be recognized', () => {

    })
    
    xit('should throw an error if iframe and youtube is present', () => {})


    xit('should have :source.url equal to :youtube attribute', () => {})
  });

  describe('vimeo special case', () => {
    xit('src: vimeo link should be recognized', () => {

    })
  });
})
