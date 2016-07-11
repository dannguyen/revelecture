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

- [ ] Come up with project folder format, with assets/ folder and config file
  - [ ] schema for config.yaml
- [?] Make `make` and `serve` have consistent interfaces
- [ ] Make `make` command write to input directory, but not overwrite files without `-f`
- [ ] Recursively read markdown files from directories and make them subslides
- [ ] Create `new` command to initialize a scaffold
- [ ] `make` should copy assets and other ancillary files
- [ ] Refactor serve.js:runServer() into localServe() and liveServe()
