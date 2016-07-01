jest.disableAutomock();
import Anecdote from '../src/lib/Anecdote';
describe("Anecdote renderBody()", () => {
  let aMeta = {
    title: "  My title ",
    notes: "  # These are notes  ",
    background: {
      color: 'pink'
    },
    transition: "fade-in slide-out",
    transition_speed: "fast"
  };
  let aContent = `*Hello* [world](#goodbye)`;
  let anecdote = new Anecdote({content: aContent, meta: aMeta});
  let aHTML = anecdote.renderSlide();

  describe("notes rendering", () => {
    it("should render notes as markdown and in an <aside>", () => {
      expect(aHTML).toContain(`<aside class="notes"><h1 id="these-are-notes">These are notes</h1>\n</aside>`)
    });
  })
});
