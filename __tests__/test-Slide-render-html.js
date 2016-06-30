jest.disableAutomock();
import Slide from '../src/lib/Slide';

describe("Slide renderHTML()", () => {
  it("should render Markdown :content as HTML", () => {
    let slide = new Slide({content: '### Hello *world*', meta: {}})
    expect(slide.renderHTML()).toEqual('<h3 id="hello-world-">Hello <em>world</em></h3>');
  });

  describe("rendering of meta elements as HTML", () => {
    let slideMeta = {
      title: "  My title ",
      notes: "  # These notes  ",
      background: {
        color: 'pink'
      },
      transition: "fade-in slide-out",
      transition_speed: "fast"
    };
    let slideContent = `*Hello* [world](#goodbye)`;
    let slide = new Slide({content: slideContent, meta: slideMeta});
    let slideHTML = slide.renderHTML();
    let htmlLines = slideHTML.split("\n")

    describe("title rendering", () => {
      it("should render set title as h2 tags", () => {
        expect(htmlLines[0]).toEqual(`<h2 id="my-title">My title</h2>`);
      })
    })

  });
});