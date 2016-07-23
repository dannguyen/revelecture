Reveal.initialize(
  {
    autoSlide: 0,
    center: true,
    embedded: false,
    fragments: true,
    hideAddressBar: true,
    history: true,
    keyboard: true,
    loop: false,
    progress: true,
    showNotes: false,
    shuffle: false,
    transition: 'default',
    transitionSpeed: 'default',
    dependencies: [
          { src: 'assets/javascript/plugins/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
    ]
  }
);
