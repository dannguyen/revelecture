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
  return proggy.command('serve <workingPath>')
    .alias('s')
    .description("Start up a server to serve up reveals")
    .option('-p, --port <portnumber>', `Port number. Default is ${defaultPortNumber}`)
    .option('--project-path <srcdir>', 'The directory in which the project files live. By default, it is assumed to be <workingPath>')
    .action((workingPath, options) => {
      let wpath = path.resolve(workingPath),
          portnum = options.port || defaultPortNumber,
          url = `http://127.0.0.1:${portnum}`;
      let srcPath = _.isUndefined(options.projectPath) ? wpath : path.resolve(options.projectPath);
      console.log(`Attempting to run server at: ${url}`);
      runServer(wpath, srcPath, portnum);
      console.log("Press Ctrl-C to quit.")
      open(url);
    });
}




export function runServer(workingPath, sourcePath, portNumber=defaultPortNumber){
  let wpath = path.resolve(workingPath),
      srcPath = path.resolve(sourcePath),
      port = Number(String(portNumber)),
      livereloadPort = defaultLiveReloadPortNumber;
  // set up app
  let app = connect();


  // set up live reload server
  let livereloadServer = tinyLr();
  livereloadServer.listen(livereloadPort, () => {
    console.log(`LiveReload server listening on port ${livereloadPort}`);
  });
  // set up node-watcher

  filewatch.createMonitor(srcPath,
    { filter: fname => watchedFilePatterns.some(pattern => minimatch(fname, path.join('**', pattern))) },
    monitor => {
      monitor.on("changed", fname => onFileChange(fname, livereloadServer, srcPath, wpath));
      monitor.on("created", fname => onFileChange(fname, livereloadServer, srcPath, wpath));
    }
  );

  app.use(connectLr({port: livereloadPort})).
      use(serveStatic(wpath)).
      use(serveIndex(wpath));

  // set up static web server
  let server = http.createServer(app);
  server
    .on('clientError', (err, socket) => server.end('HTTP 400 Bad Request\n\n'))
    .listen(port, () => {
      console.log(`Listening to ${port}`);
    });

}


function onFileChange(fname, xserver, srcPath, workingPath){
  console.log(`!!! File changed: ${fname}`);
  console.log("Rebuilding...")
  buildPresentation(srcPath, workingPath);
  xserver.changed({"body": {"files": [fname] }});
}
