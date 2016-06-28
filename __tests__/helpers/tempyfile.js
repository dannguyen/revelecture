jest.disableAutomock();
let tempfile = require("temp").track();
import fs from 'fs';

let sweepfoo = () => tempfile.cleanupSync();
let createfoo = (body) => {
  let fname = tempfile.path();
  fs.writeFileSync(fname, body);
  return fname;
};

module.exports = {
  sweep: sweepfoo,
  create: createfoo
};
