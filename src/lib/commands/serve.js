import fs from 'fs';
import http from 'http';
import path from 'path';
import open from 'open';
import url from 'url';

import connect from 'connect';
// import connectLr from 'connect-livereload';
import filewatch from "watch";
import minimatch from 'minimatch';
import serveIndex from 'serve-index';
import serveStatic from 'serve-static';
import tinyLr from 'tiny-lr';


const defaultPortNumber = 8888;
const defaultLiveReloadPortNumber = 35729;
const watchedFilePatterns = ['*.md'];



export default function addServeCommand(proggy) {
  return proggy.command('serve <src>')
    .alias('s')
    .description("Start up a server to serve up reveals")
    .option('-p, --port <portnumber>', `Port number. Default is ${defaultPortNumber}`)
    .action((src, options) => {
      let srcPath = path.resolve(src),
          portnum = options.port || defaultPortNumber,
          url = `http://127.0.0.1:${portnum}`;
      console.log(`Attempting to run server at: ${url}`);
      runServer(srcPath, portnum);
      console.log("Press Ctrl-C to quit.")
//      open(url);
    });
}




export function runServer(src='.', portNumber=defaultPortNumber){
  let srcPath = path.resolve(src),
      port = Number(String(portNumber)),
      livereloadPort = defaultLiveReloadPortNumber;
  // set up app
  let app = connect();


  // set up live reload server
  // let livereloadServer = tinyLr();
  // livereloadServer.listen(livereloadPort, () => {
  //   console.log(`LiveReload server listening on port ${livereloadPort}`);
  // });
  // set up node-watcher

  filewatch.createMonitor(srcPath,
    { filter: fname => watchedFilePatterns.some(pattern => minimatch(fname, path.join('**', pattern))) },
    monitor => {
      monitor.on("changed", fname => onFileChange(fname, livereloadServer));
      monitor.on("created", fname => onFileChange(fname, livereloadServer));
    }
  );

  app.use(serveStatic(srcPath)).
      use(serveIndex(srcPath)).
      use(tinyLr.middleware({ app: app }));

// use(connectLr({port: livereloadPort}))


  // set up static web server
  let server = http.createServer(app);
  server
    .on('clientError', (err, socket) => server.end('HTTP 400 Bad Request\n\n'))
    .listen(port, () => {
      console.log(`Listening to ${port}`);
    });

}



function onFileChange(fname, xserver){
  console.log(`!!! File changed: ${fname}`);
  xserver.changed(fname);
}



// 'use strict';
// const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
// const config = require('./webpack.config');
// // todo fix later
// const defaultSettings = {port: 8080};
//
// const open = require('open');
// let target_entry = 'http://localhost:' + defaultSettings.port + '/';
// config.entry.unshift("webpack-dev-server/client?" + target_entry);
//
// new WebpackDevServer(webpack(config), {contentBfrome: 'src', hot: true, stats: { colors: true }, publicPath: '/fromsets/'})
// .listen(defaultSettings.port , 'localhost' , (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening at localhost:' + defaultSettings.port );
//   console.log('Opening your system browser...');
//   open(target_entry);
// });
