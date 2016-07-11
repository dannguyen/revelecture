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


- [ ] Make `make` command write to input directory, but not overwrite files without `-f`
- [ ] Recursively read markdown files from directories and make them subslides
