/* eslint-disable */

import del from 'del';

module.exports = function (done) {
  const CONFIG = this.context.CONFIG;

  return del(CONFIG.paths.dist).then(() => {
    done();
  });
};
