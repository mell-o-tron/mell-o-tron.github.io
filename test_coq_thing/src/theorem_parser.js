class TheoremParser {
    constructor () {}
    
    get_variables(theo_text) {
        console.log("THEO PARSER TEXT", theo_text)
        
        if (!theo_text) return [];
        
        let res = [];
        
        let m = theo_text.match(/forall\s+(.+?),/);
        
        if (!m) return [];
        
        let var_string = m[1];
        
        if(var_string.includes("(")) {
            let vars = var_string.match(/\((([a-zA-Z0-9]+\s*)+) : .+?\)/);
            
            while (vars != null) {
                res = res.concat(vars[1].split(" "));
                let rest = var_string.slice(var_string.indexOf(vars[0]) + vars[0].length, var_string.length);
                vars = rest.match(/\((([a-zA-Z0-9]+\s*)+) : .+?\)/);
            }
        } else {
            let vars = var_string.match(/(([a-zA-Z0-9]+\s*)+) : .+?/);
            res = res.concat(res, vars[1].split(" "));
        }
        
        return res;
    }
}

export {TheoremParser}
