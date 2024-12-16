

var main = require("./main.js");



    // Define the custom language mode
    CodeMirror.defineMode("myLang", function(config, parserConfig) {
      var builtins = /(?:K|C|PA|GA|true)\b/;
      var keywords = /(?:VARS|THETA|AGENTS|STATE|CHECK)\b/;
      var singleLineComment = /\*\*.*/;
      var string = /\"[a-zA-Z0-9\s]*\"/
      
      return {
        token: function(stream) {
          if (stream.match(singleLineComment)) {
            return "comment";
          }
           if (stream.match(string)) {
            return "string";
          }
          if (stream.match(keywords)) {
            return "keyword";
          }
          if (stream.match(builtins)) {
            return "variable-2";
          }
          stream.next();
          return null;
        }
      };
    });

    // Initialize CodeMirror on the textarea with custom mode
    var editor = CodeMirror.fromTextArea(document.getElementById('code'), {
      lineNumbers: true,
      mode: "myLang", // Use the custom language mode
    });
    
editor.setOption('theme', 'neat');

let modelChecker = main.modelChecker

let check_button = document.getElementById("check_button")
let laod_button = document.getElementById("load_button")
let output = document.getElementById("result")
let select = document.getElementById("example_select")

check_button.onclick = (() => {
    try {
      let result = modelChecker.check(editor.getValue()).flat(Infinity).filter(x => x != 0).map(x => `result: ${x}<hr>`)
      output.innerHTML = ""
      result.forEach(x => output.innerHTML += `${x}`)
      MathJax.typeset()
    } catch (e) {
      console.error(e) 
      if (e[1][1] == "Failure")
        alert(e[2])
      else if (e[1][1] == "Dune__exe__Main.Syntax_error"){
        alert(`Syntax error at line: ${e[2]}, column ${e[3]}`)
      }
    }
})


load_button.onclick = (() => {
  fetch(`./examples/${select.value}`)
  .then((res) => res.text())
  .then((text) => {
    editor.setValue(text);
   })
  .catch((e) => console.error(e));
});
