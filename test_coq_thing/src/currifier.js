function find_matching_paren (s, i) {
    let j = i;
    let depth = 1;
    while (j < s.length - 1 && depth != 0) {
        j++;
        if (s[j] == "(") depth ++;
        if (s[j] == ")") depth --;
    }
    if (depth == 0) return j;
    else return null;
}

function find_zero_depth_commas (s) {
    let j = 0;
    let depth = 0;
    let commas = []
    while (j < s.length) {
        if (s[j] == "(") depth ++;
        if (s[j] == ")") depth --;
        if (s[j] == "," && depth == 0) commas.push(j);
        j++;
    }
    return commas;
}

class Currifier {
    constructor (controller){
        this.functions = []
        
        for (let d of controller.definitions){
            if(d.is_function == "true") {
                this.functions.push({name : d.name, arity : d.arity});
            }
        }
    }
    to_curried(s, fun){
        let re = new RegExp(`${fun.name}\\s*\\(`);
        let m = s.match(re)
        
        if(m) {
            let m0_i = s.indexOf(m[0]);
            let mpar_i = find_matching_paren(s, m0_i + m[0].length);
            let par_contents = s.slice(m0_i + m[0].length, mpar_i);
            let commas = find_zero_depth_commas(par_contents);
            
            
            let fargs = []
            
            for (let i in commas) {
                if (i == 0) {
                    fargs.push((par_contents.slice(0, commas[i])));
                }
                if (i == commas.length - 1) {
                    fargs.push(par_contents.slice(commas[i] + 1, par_contents.length));
                }
                
                if (i > 0) {
                    fargs.push(par_contents.slice(commas[i-1] + 1, commas[i]));
                }
            }
            
            if (commas.length == 0){
                fargs.push(par_contents);
            }
            
            fargs = fargs.map(x => x.trim()).map(x => this.to_curried(x, fun));
            
            let arg_string = fun.name;
            
            for (let fa of fargs) {
                arg_string += ` (${fa})`
            }
            

            return s.slice(0, m0_i) + arg_string + this.to_curried(s.slice(mpar_i + 1, s.length), fun);
        }
        return s;
    }
    
    currify(s) {
        let res = s;
        for (let fun of this.functions) {
            res = this.to_curried(res, fun);
        }
        return res
    }
    
    
}
 
export {Currifier}
