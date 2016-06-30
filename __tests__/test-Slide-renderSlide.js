jest.disableAutomock();
import Slide from '../src/lib/Slide';
describe("Slide renderBody()", () => {
  let slideMeta = {
    title: "  My title ",
    notes: "  # These are notes  ",
    background: {
      color: 'pink'
    },
    transition: "fade-in slide-out",
    transition_speed: "fast"
  };
  let slideContent = `*Hello* [world](#goodbye)`;
  let slide = new Slide({content: slideContent, meta: slideMeta});
  let slideHTML = slide.renderSlide();

  describe("notes rendering", () => {
    it("should render notes as markdown and in an <aside>", () => {
      expect(slideHTML).toContain(`<aside class="notes"><h1 id="these-are-notes">These are notes</h1>\n</aside>`)
    });
  })
});
