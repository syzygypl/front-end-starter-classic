import { Sierotki } from 'sierotki';

export default {
  functions: [{}],
  filters: [{
    name: "sierotki",
    func: text => {
      return Sierotki.orphansFix(text);
    }
  }]
};
