import fs from 'fs';
import http from 'http';
import path from 'path';
import open from 'open';
import url from 'url';

import _ from 'lodash'
import connect from 'connect';
import connectLr from 'connect-livereload';
import filewatch from "watch";
import minimatch from 'minimatch';
import serveIndex from 'serve-index';
import serveStatic from 'serve-static';
import tinyLr from 'tiny-lr';
import {buildPresentation} from './make';


const defaultPortNumber = 8888;
const defaultLiveReloadPortNumber = 35729;
const watchedFilePatterns = ['*.md', '*.txt'];



export default function addServeCommand(proggy) {
  return proggy.command('serve <srcPath>')
    .alias('s')
    .description("Build (and watch, via livereload) a presentation from <srcpath> and view it from a local web server.")
    .option('-p, --port <portnumber>', `Port number. Default is ${defaultPortNumber}`)
    .option('-o, --output-dir <outputdir>', `Build the presentation in a directory other than <srcpath>`)
    .action((srcpath, options) => {
      let srcPath = path.resolve(srcpath),
          portnum = options.port || defaultPortNumber,
          url = `http://127.0.0.1:${portnum}`;
      let outputPath = _.isUndefined(options.outputDir) ? wpath : path.resolve(options.outputDir);
      console.log(`Attempting to run server at: ${url}
      - Building project from: ${srcPath}
      - Serving project from: ${outputPath}`);
      runServer(outputPath, srcPath, portnum);
      console.log("Press Ctrl-C to quit.")
      open(url);
    });
}




export function runServer(serverpath, sourcepath, portNumber=defaultPortNumber){
  let serverPath = path.resolve(serverpath),
      sourcePath = path.resolve(sourcepath),
      port = Number(String(portNumber)),
      livereloadPort = defaultLiveReloadPortNumber;
  // set up app
  let app = connect();

  // set up live reload server
  let livereloadServer = tinyLr();
  livereloadServer.listen(livereloadPort, () => {
    console.log(`LiveReload server listening on port ${livereloadPort}`);
  });

  // set up node-watcher to watch the project directory for changes to .md and other assets
  filewatch.createMonitor(
    sourcePath,
    { filter: fname => watchedFilePatterns.some(
      pattern => minimatch(fname, path.join('**', pattern)
    ))},
    monitor => {
      monitor.on("changed", fname => onFileChange(fname, livereloadServer, sourcePath, serverPath));
      monitor.on("created", fname => onFileChange(fname, livereloadServer, sourcePath, serverPath));
    }
  );

  // note that connect-livereload needs to be registered to `app` before the serve-static
  // and serve-index middleware
  app.use(connectLr({port: livereloadPort})).
      use(serveStatic(serverPath)).
      use(serveIndex(serverPath));

  // set up static web server
  let server = http.createServer(app);
  server.on('clientError', (err, socket) => server.end('HTTP 400 Bad Request\n\n'))
        .listen(port, () => {
          console.log(`Listening to ${port}`);
        });

}


function onFileChange(fname, livereloadServer, srcPath, serverPath){
  console.log(`!!! File changed: ${fname}`);
  console.log("Rebuilding...")
  buildPresentation(srcPath, serverPath);
  livereloadServer.changed({"body": {"files": [fname] }});
}
