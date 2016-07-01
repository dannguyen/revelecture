jest.disableAutomock();
import Anecdote from '../src/lib/Anecdote';

describe("Anecdote renderBody()", () => {
  xit("should render Markdown :content as HTML", () => {
    let anecdote = new Anecdote({content: '### Hello *world*', meta: {}})
    expect(anecdote.renderBody()).toMatch(/<div class="content"><h3 id="hello-world-">Hello <em>world<\/em><\/h3>\n<\/div>/);
  });

  describe("rendering of meta elements as HTML", () => {
    let anecdoteMeta = {
      title: "  My title ",
      notes: "  # These are notes  ",
      background: {
        color: 'pink'
      },
      transition: "fade-in slide-out",
      transition_speed: "fast"
    };
    let anecdoteContent = `*Hello* [world](#goodbye)`;
    let anecdote = new Anecdote({content: anecdoteContent, meta: anecdoteMeta});
    let anecdoteHTML = anecdote.renderBody();
    let htmlLines = anecdoteHTML.split("\n")

    describe("title rendering", () => {
      it("should render set title as h2 tags", () => {
        expect(htmlLines[0]).toMatch(/<h2 class="content-title" id="my-title">My title<\/h2>/);
      })

      it("should render as H1 if section: true", () => {
          let secAnecdote = new Anecdote({content: '', meta: {title: "new section", section: true}})
          expect(secAnecdote.renderBody()).toMatch(/<h1 class="section-title content-title" id="new-section">new section<\/h1>/)
      })
    });



  });
});
