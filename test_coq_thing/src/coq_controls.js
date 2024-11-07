import {Visualizer} from "./visualizer.js"

class Controller {
  constructor(manager, snippet, observer, language_selector){
    this.manager = manager;
    this.snippet = snippet;
    this.observer = observer;
    this.visualizer = new Visualizer(observer, language_selector);
    this.available_theorems = [];
    this.available_tactics = [];
    this.definitions = [];
    this.coq_history = [];
  }

  set_definitions(defs){
    this.definitions = defs;
  }

  /* writes a new coq line to the editor */
  add_line (line_text) {
      let cursor = this.snippet.editor.getCursor()
      console.log(cursor)
      var line = this.snippet.editor.getLine(cursor.line);
      var pos = {
          line: cursor.line,
          ch: line.length
      }
      this.snippet.editor.replaceRange("\n" + line_text, pos);
  }
  
  rm_line () {
      let cursor_line = this.snippet.editor.getCursor().line;
      this.snippet.editor.replaceRange("", { line: cursor_line-1, ch: this.snippet.editor.getLine(cursor_line-1).length}, { line: cursor_line, ch: this.snippet.editor.getLine(cursor_line).length});
  }

  del_line () {
    let cursor_line = this.snippet.editor.getCursor().line;
    this.snippet.editor.replaceRange("", { line: cursor_line-1, ch: this.snippet.editor.getLine(cursor_line-1).length}, { line: cursor_line + 1, ch: 0 });
  }

  /* waits for sentence to reach processed (or error) state - TODO add param to error */
  wait_for_processed(sentence, cont, on_err, depth = 0){


    if (sentence.phase != "processed" && sentence.phase != "error"){
      setTimeout(this.wait_for_processed.bind(this), 100, sentence, cont, on_err, depth + 1)
    }
    else if (sentence.phase == "processed"){
      cont()
    }
    else {
      on_err()
    }
  }

  /* waits for sentence to reach cancelling state - probly not needed. */
  wait_for_cancelled(sentence, cont, on_err, depth = 0){
    if (sentence.phase != "cancelling" && sentence.phase != "error"){
      setTimeout(this.wait_for_cancelled.bind(this), 100, sentence, cont, on_err, depth + 1)
    }
    else if (sentence.phase == "cancelling"){
      cont()
    }
    else {
      on_err()
    }
  }
  

  /* evaluates n lines of coq */
  go_next_n(n, should_vis, cont, err){
    if (n == 0) {
      cont()
    }
    else{
      const cursor = this.snippet.editor.getCursor();
      const vis_stmt = { text : this.snippet.editor.getLine(cursor.line)};

      if (should_vis) this.visualizer.visualize(vis_stmt, this);    // OPTIMISTIC VISUALIZATION - the visualizer sends a visualization function to the observer, to be executed if/when the goal changes.
      
      this.manager.goNext(true)
      
      let stmt = this.manager.doc.sentences.slice(-1)[0];

      this.wait_for_processed(stmt, () => {
        this.go_next_n(n-1, should_vis, cont, err);
      }, err)
      
    }
  }
  

  /* un-evaluates n lines of coq */
  go_prev_n(n){
    if (n == 0) {
      return;
    }
    else{
      this.manager.goPrev(true)
      this.go_prev_n(n-1)
    }
  }
  
  rewrite_theorem(theo_name, direction, occ, var_values, var_names){
    
    let var_value_string = ""
    for (let i in var_names) {
      if (var_values[i].trim() != "") {
        var_value_string += (`(${var_names[i]} := ${var_values[i]})`)
      }
    }
    
    let text = `rewrite ${direction?"->":"<-"} ${theo_name} ${var_value_string == "" ? "" : "with " + var_value_string} at ${occ}.`
    this.add_line(text, this.snippet);
    this.go_next_n(1, true, () => {
      this.coq_history.push(text);
    }, () => {/*this.go_prev_n(1);*/ alert("Cannot apply tactic or theorem"); this.rm_line()});
  
  }

  apply_tactic(tac_coq, args){
    let tactic_text = tac_coq;
    for (let i in args){
      tactic_text = tactic_text.replace(`$${i}`, args[i]);
    }
    this.add_line(`${tactic_text}`, this.snippet);
    this.go_next_n(1, true, () => {
      this.coq_history.push(tactic_text);
    }, () => {/*this.go_prev_n(1);*/ alert("Cannot apply tactic"); this.rm_line()});
  }
}

export {Controller}
