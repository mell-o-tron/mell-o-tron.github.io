import { JsCoq } from './node_modules/jscoq/jscoq.js';
import {Controller} from "./src/coq_controls.js"

// set up jscoq
var jscoq_ids  = ['coq-code'];
var jscoq_opts = {
prelude:   true,
implicit_libs: true,
editor:{ mode: { 'company-coq': true }, keyMap: 'default' },
init_pkgs: ['init'],
all_pkgs:  ['coq']
};

// returns the coq manager
let manager_promise = JsCoq.start(jscoq_ids, jscoq_opts);

manager_promise.then(function(manager) {

  // waits for coq to be ready
  manager.when_ready.then(function (result){

    let controller = new Controller(manager);

    console.log("COQ READY")
    console.log(manager.coq.query(1, 0, ['Mode']));
    
    // gathers the current code snippet - this is used for manipulating the code (e.g. adding lines).
    let snippet = manager.provider.snippets[0]
    console.log(snippet)
    controller.add_line("Lemma thing : forall (x : nat), 2 * x = x + x.\nProof.", snippet)
    
    manager.provider.focus();
    controller.go_next_n(2, true, () => {
      let a = manager.layout.proof;
      console.log(a);
      console.log(a.outerText);
      controller.add_line('induction x.', snippet);
      controller.add_line('rewrite <- plus_n_O.', snippet);
      controller.add_line('rewrite <- mult_n_O.', snippet);
      controller.add_line('reflexivity.', snippet);
      
      controller.go_next_n(4, true, () => {}, () => {})

    }, () => {
      console.log("There was an error with the proof")
    });

  });
});
