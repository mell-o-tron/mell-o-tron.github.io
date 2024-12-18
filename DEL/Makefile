all: main.js
	npx browserify test.js > out.js

ocaml: clean all
	
clean:
	echo cleaning
	rm -f main.bc
	rm -f main.js
	make -C ./ocaml clean
	
main.js:
	echo ocamling
	make -C ./ocaml build
	cp ./ocaml/_build/default/bin/main.bc ./main.bc
	js_of_ocaml main.bc -o main.js
