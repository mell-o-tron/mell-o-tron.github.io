import { JsCoq } from './node_modules/jscoq/jscoq.js';
import {Controller} from "./src/coq_controls.js"
import {LanguageSelector} from "./src/multilang.js"
import {Observer} from "./src/coq_observer.js"

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



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const name = urlParams.get('theorem_name');
const topic = urlParams.get('theorem_topic');
const language = urlParams.get('language');
let history = urlParams.get('history');


// set up jscoq
var jscoq_ids  = ['coq-code'];
var jscoq_opts = {
prelude:   true,
implicit_libs: true,
editor:{ mode: { 'company-coq': true }, keyMap: 'default' },
init_pkgs: ['init'],
all_pkgs:  ['coq']
};


let language_selector = new LanguageSelector();


// Language Selection
const selectDropdown = document.getElementById('langs');

selectDropdown.value = language;
selectDropdown.addEventListener('change', function (e) {
  console.log(selectDropdown.value) 
                
  let url = new URL(window.location.href);
  url.searchParams.set("language", `${selectDropdown.value}`);

window.location.href = url.toString();
});


language_selector.select_language(language.trim()).then(() => {
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

            console.log(language_selector);

            let controller = new Controller(manager, snippet, coq_observer, language_selector);
            
            // add history to selectDropdown
            selectDropdown.addEventListener('change', function (e) {
              console.log(selectDropdown.value) 
              
              let url = new URL(window.location.href);
              url.searchParams.set("language", `${selectDropdown.value}`);
//               url.searchParams.set("history", `${controller.coq_history.join("")}`);
                
              window.location.href = url.toString();
            });

            
            
            controller.set_definitions(topic_obj.definitions);
            
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

            console.log(proof_obj.theorem);

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

            document.getElementById("loading").style.display = "none";

            controller.go_next_n(str.split("\n").length, false, () => {
              
              // TODO IMPLEMENT REPLAY OF HISTORY WHEN CHANGE LANGUAGE
              
//               if (history) {
//                 history = history.trim();
//                 controller.coq_history = history.split("\n").map(x => x + "\n");
//                 controller.add_line(history);
//                 controller.go_next_n(history.split("\n").length - 2, false, () => {
//                    controller.go_next_n(1, true, () => {}, () => {
//                     console.log("There is a mistake in the history.")
//                 });
//                 }, () => {
//                   console.log("There is a mistake in the history.")
//                 });
//               }
              
            }, () => {
              console.log("There is a mistake in the definitions or theorem statement.")
            });

          });
        });
      }

    }).catch(err => console.error("Error occurred while fetching or processing the JSON data:", err));
  }).catch(err => console.error("Error occurred while fetching or processing the JSON data:", err));


});
