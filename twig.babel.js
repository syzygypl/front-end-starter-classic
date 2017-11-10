import { Sierotki } from 'sierotki';

export default {
  functions: [{}],
  filters: [{
    name: "sierotki",
    func: function (text) {
      return Sierotki.orphansFix(text);
    }
  }]
};
