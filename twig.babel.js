import { Sierotki } from 'sierotki';

export default {
  functions: [{
    name: "asset",
    func: path => {
      let revs;
      try {
        revs = require('./web/rev-manifest');
      }
      catch (e) {
        return path;
      }

      return revs[path];
    },
  }],
  filters: [{
    name: "sierotki",
    func: text => {
      return Sierotki.orphansFix(text);
    },
  }],
};
