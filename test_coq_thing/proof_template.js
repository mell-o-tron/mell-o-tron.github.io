import { JsCoq } from './node_modules/jscoq/jscoq.js';
import { FormatPrettyPrint } from './node_modules/jscoq/jscoq.js';
import {Controller} from "./src/coq_controls.js"


async function readJsonFile(url) {
    try {
        // Fetch the JSON file
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the JSON data
        const jsonData = await response.json();

        // Return the parsed data
        return jsonData;

    } catch (err) {
        console.error("Error fetching or parsing the file:", err);
        return null; // Return null in case of an error
    }
}


class Observer {
  constructor() {
    this.when_ready = new Promise(resolve => this._ready = resolve);
    this.pprint = new FormatPrettyPrint();
    this.current_goal = {};
    this.vis_fun = (() => {});
    this.has_goals = false;
  }
  coqReady() {  this._ready(); }
  coqGoalInfo(sid, goals) {
    if (!goals) {
      console.log("There are no current goals")
      this.has_goals = false;
      return
    }
    if (!goals.goals) {
      this.has_goals = false;
      console.log("There are no current goals")
      return
    }
    var bar = `\n${"-".repeat(60)}\n`
    console.log(`current goals:`);
    console.log(bar, goals, bar);
    
    if (goals.goals[0]) {
      this.has_goals = true;
      let g = goals.goals[0]
      
      this.current_goal.hypotheses = []
      for (let h of g.hyp) {
        let hp_name = h[0][0][1]
        let hp_body = this.pprint.pp2Text(h[2])
        this.current_goal.hypotheses.push({name: hp_name, body: hp_body})
      }
      
        
      this.current_goal.goal = this.pprint.pp2Text(g.ty)
    } else {
     this.has_goals = false; 
    }
    this.vis_fun();
    
    console.log(this.current_goal);
  }
}


// set up jscoq
var jscoq_ids  = ['coq-code'];
var jscoq_opts = {
prelude:   true,
implicit_libs: true,
editor:{ mode: { 'company-coq': true }, keyMap: 'default' },
init_pkgs: ['init'],
all_pkgs:  ['coq']
};



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const name = urlParams.get('theorem_name');
const topic = urlParams.get('theorem_topic');

readJsonFile(`./theorems/${name}.json`).then(function (proof_obj) {
  readJsonFile(`./topics/${topic}.json`).then(function (topic_obj) {
  
    console.log(proof_obj);
    console.log(topic_obj);
    
    if (proof_obj == null || topic_obj == null){
        throw new Error ("proof environment is invalid");
    }
    else {
      // returns the coq manager
      let manager_promise = JsCoq.start(jscoq_ids, jscoq_opts);

      manager_promise.then(function(manager) {
        
        // waits for coq to be ready
        manager.when_ready.then(function (result){
          
          let coq_observer = new Observer;
          manager.coq.observers.push(coq_observer);
          
          console.log("COQ READY")
          console.log(manager.coq.query(1, 0, ['Mode']));
          
          // gathers the current code snippet - this is used for manipulating the code (e.g. adding lines).
          let snippet = manager.provider.snippets[0]
          
          let controller = new Controller(manager, snippet, coq_observer);
          
          // adds definitions and theorem to coq code
          let str = "";
          
          for (let d of topic_obj.definitions) {
            str += d.coq + "\n";
            controller.visualizer.visualize_math(d, "definition");
          }
          
          // adds theorems to the controller's available theorem list
          for (let d of topic_obj.theorems) {
            str += d.coq + "\n";
            controller.available_theorems.push(d);
          }

          // adds tactics to the controller's available tactics list
          for (let t of topic_obj.tactics) {
            controller.available_tactics.push(t);
          }
          
          // the definitions are visualized TODO maybe add a flag in the json to decide whether to visualize a definition
          for (let d of proof_obj.definitions) {
            str += d.coq + "\n";
            controller.visualizer.visualize_math(d, "definition");
          }
          
          str += proof_obj.theorem.coq + "\nProof.\n";
          
          controller.visualizer.visualize_math(proof_obj.theorem, "theorem");
          controller.add_line(str);
          
          // Add the available theorems to the menu on the right
          for (let at of controller.available_theorems){ 
            controller.visualizer.add_theo_card(at, controller);
          }
          
          // Add the available tactics to the menu on the right
          for (let tac of controller.available_tactics){
            controller.visualizer.add_tactic_card(tac, controller)
          }
          
          controller.visualizer.add_hp_handlers(controller)


          controller.go_next_n(str.split("\n").length, false, () => {}, () => {
            console.log("There is a mistake in the definitions or theorem statement.")
          });
          


        });
      });
    }
    
  }).catch(err => console.error("Error occurred while fetching or processing the JSON data:", err));
}).catch(err => console.error("Error occurred while fetching or processing the JSON data:", err));


