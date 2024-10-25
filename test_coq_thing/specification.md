# Specification

## Goals
The tool should allow the user to interact with a mathematical proof in a visual way. 

The user should interact with the proof by:

- Manipulating the hypothesis of the current goal
- Rewriting the goal using theorems and rules from a list
- Applying tactics to the goal


The proofs should regard:

- Structural Induction
- Relations

In the first iteration, we shall focus on structural induction. 

## Tool structure

The tool should provide:

- A home page
- A tutorial page
- A template page to be used for proofs, to be populated using JSON files

### Home Page
The home page should allow the user to choose a subject and start a proof. 

### Tutorial Page
The tutorial page should consist of a simple guided proof, that should effectively illustrate the usage of the interface.

### Proof Template
The proof template should be divided into two portions. On the left, a wider scrollable panel for the definitions and proof statement, and on the right a panel consisting of three accordions, each containing controls to interact with the proof in the three ways described above.

## JsCoq interaction
The JsCoq library provides an interface with a js-compiled version of the coq proof assistant. The user writes coq into a CodeMirror text area, and use a sidebar to read the goal and messages, and interpret lines of code through arrow buttons (that also have keyboard bindings).

The main object we interact with is the `CoqManager`. This is obtained as follows:

```js
import { JsCoq } from './node_modules/jscoq/jscoq.js';

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
	// [...]
}
```

Then we must wait for coq to be ready. This is done as follows:

```js
 // waits for coq to be ready
 manager.when_ready.then(function (result){
	// [...]
 }
```

### Adding lines to the CodeMirror snippet

Given a snippet, obtained as:

```js
let snippet = manager.provider.snippets[0]
```

we can write a line using the following method:

```js
 add_line (line_text, snippet) {
      let cursor = snippet.editor.getCursor()
      console.log(cursor)
      var line = snippet.editor.getLine(cursor.line);
      var pos = {
          line: cursor.line,
          ch: line.length
      }
      snippet.editor.replaceRange("\n" + line_text, pos);
  }
```

This method is featured in the `Controller` class.

### Interpreting a line
Once a line has been written, we interpret it with:

```js
this.manager.goNext(true)
```

After this, we must wait for the line to be processed. We do this by using this method from the `Controller` class:

```js
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
```

Similarly, there is a `goPrev` method in the manager, and a `wait_for_cancelled` method in `Controller`.

### Parsing the goal
[...]

## Class Structure

I'm not a big fan of classes, but I guess I should try to write this in the most idio(ma)tic way possible. The following classes are defined:

- Controller
- GoalParser
- Visualizer
- PlainTextifier
- TacticCommentator