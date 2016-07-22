# Revelecture


A command-line tool to turn Markdown files into [Reveal.js powered slideshows](https://github.com/hakimel/reveal.js/)


# Usage

(not done)

Quick run: this reads from examples/hello-slides, builds into build/hello-slides, and runs a livereload server.

```sh
$ npm run foo
```


Make and bake:


```sh
$ revelecture make SRC_DIRECTORY -o OUTPUT_DIR
```

Run locally

```sh
$ revelecture serve OUTPUT_DIRECTORY --project-path SOURCE_DIRECTORY
```


# TODOs

## Brokenness

- [ ] Rewrite presentation.js to require proper scaffold configuration

### Scaffolding

- [ ] Come up with project folder format, with assets/ folder and config file
- [ ] schema for config.yaml
- [ ] Create and copy base stylesheets/ and javascripts/
- [ ] Create and copy base templates/
- [ ] Add a title slide in config.yaml based on :title
- [ ] Add option to disable title slide
- [ ] Add option to disable TOC
- [ ] Create an optional cover page, cover.md that links to slides and overview, but allows the user to add arbitrary content.
  - [ ] Allow cover.md meta to overrule config.yaml
- [ ] Create `new` command to initialize a scaffold


### Presenting

= [ ] Rename `make` to `present`
- [ ] Error-checking for existence of minimum folders and files: config.yaml, templates/article.html,slideshow.html



- [?] Make `make` and `serve` have consistent interfaces
- [ ] Make `make` command write to input directory, but not overwrite files without `-f`
- [ ] Recursively read markdown files from directories and make them subslides
- [ ] `make` should copy assets and other ancillary files
- [ ] Refactor serve.js:runServer() into localServe() and liveServe()
- [ ] Add :source => {:url} attribute to Anecdote
- [ ] Figure out how to fix overlay over youtube embeds
- [ ] Add an id attribute to anecdotal elements
- [ ] Add a TOC at beginning of slides (as option in config.yaml)
- [ ] Add a end-slide (with return to first slide/article view)
- [ ] Add short code for notes
