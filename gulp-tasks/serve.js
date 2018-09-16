/* eslint-disable */

import browserSync from 'browser-sync';

let overrides = {};
try {
  overrides = require("../browsersync");
}
catch (e) {
  if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
    console.log("You can overwrite BrowserSync setting in `browsersync.json` file in project root");
  }
}

module.exports = function (done) {
  const gulp = this.gulp;
  const CONFIG = this.context.CONFIG;

  browserSync
    .init({
      files: [
        `${CONFIG.paths.dist}*/**`,
        `${CONFIG.paths.templates}*/**`,
      ],
      proxy: process.env.BACKEND_URL || 'front-end-starter.dev',
      open: true,
      notify: true,
      ...overrides,
    });

  gulp.series('watch')(done);
};
