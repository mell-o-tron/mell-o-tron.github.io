function next_nonspace (s, i) {
    let j = i;
    while (j < s.length && s[j] == " ") {
        j++;
    }
    if (j < s.length) return j;
    else return null;
}

function end_of_word (s, i) {
    let j = i;
    while (j < s.length && s[j] != " ") {
        j++;
    }
    
    j--;
    
    // REMOVE ILLEGAL ENDING CHARS
    while (s[j] == ")" || s[j] == ",") {
        j--;
    }
    
    
    return j;
}

function find_matching_paren (s, i) {
    let j = i;
    let depth = 1;
    while (j < s.length && depth != 0) {
        j++;
        if (s[j] == "(") depth ++;
        if (s[j] == ")") depth --;
    }
    if (depth == 0) return j;
    else return null;
}


class Uncurrifier {
    constructor (controller){
        this.functions = []
        
//         console.log(controller.definitions)
        
        for (let d of controller.definitions){
            if(d.is_function == "true") {
                this.functions.push({name : d.name, arity : d.arity});
            }
        }
//         console.log("THIS DOT FUNCTIONS", this.functions)
    }
    
    to_uncurried (s, fun) {
        let s1 = s.replace (/\s/, " ");
        
        let fun_name = fun.name;
        let arity = fun.arity;
        
        let m = s1.match(fun_name)
        if (m != null) {
            let i = m.index + fun_name.length;
            
            let fargs = []
            
            for (let k = 0; k < arity; k++) {
                let j = next_nonspace(s1, i);
                if (s1[j] == "("){
                    let mpar_pos = find_matching_paren (s1, j);
                    fargs.push(this.to_uncurried(s1.slice(j+1, mpar_pos), fun));

                    i = mpar_pos + 1
                } else {
                    let eow_pos = end_of_word(s1, j);
                    fargs.push(this.to_uncurried(s1.slice(j, eow_pos+1), fun))
                    i = eow_pos + 1
                }
            }
//             console.log(fargs)
            // WARNING join must be with " , ", if the spaces are not there everything breaks.
            // actually we replace , with § to avoid the texifier's action
            return (`${s1.slice(0, m.index)}${fun_name}(${fargs.join(" § ")})${this.to_uncurried(s1.slice(i, s1.length), fun)}`)
            
        }
        else return s1;
    }
    
    uncurrify(t){
        let s = t
        for (let fun of this.functions) {
            s = this.to_uncurried(s, fun)
            s = s.replaceAll(fun.name, `\\texttt{${fun.name}}`)
        }
        
        return s;
    }
}



export {Uncurrifier}
