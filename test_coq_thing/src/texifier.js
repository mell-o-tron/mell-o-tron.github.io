function end_or_first_unmatched_rpar (s, i) {
    let j = i;
    
    let nesting_level = 1;
    
    while (j < s.length && nesting_level >= 1) {
        let c = s[j];
        if (c == "("){
            nesting_level ++;
        } else if(c == ")"){
            nesting_level --;
        }
        
        j++;
    }
    
    return j-1;
    
}

class TeXifier {
    constructor() {
        this.replacements = [
            ["forall", "\\forall"],
            ["exists", "\\exists"],
            ["->", "\\to"],
            ["nat", "\\mathbb{N}"],
            [",", " ."],
            ["→", "\\to"],
            ["ℕ", "\\mathbb{N}"],
            ["list", "L_A"],
            ["false", "\\texttt{false}"],
            ["true", "\\texttt{true}"],
            ["||", "\\vee"],
//             [" ", "\\;"],
            ["∀", "\\forall"],
            ["§", ","]
        ];
    }

    texify(text) {
        let res = text;
        
        let m = res.match(/if\s+(.+?)\s+then\s+(.+?)\s+else/);
        
        if(m && !m[1].includes("if") && !m[1].includes("then") && !m[1].includes("else") && !m[2].includes("if") && !m[2].includes("then") && !m[2].includes("else")) {
            let beginning_index = res.indexOf("if");
            let beginning_of_end = res.indexOf("else");
            let end_index = end_or_first_unmatched_rpar(res, beginning_of_end);
            
            let else_branch = res.slice(beginning_of_end, end_index).replace("else", "");
            
            // TODO does not work for nested ifs
            // TODO does not work for more than one if in an expression: could call recursively but would break comma-placeholder - maybe do separate function to be called recursively before texify.
            
            res = res.replace(res.slice(beginning_index, end_index), `\\begin{cases} ${m[2]} & \\text{ if }${m[1]}\\\\${else_branch} & \\text{ otherwise}\\end{cases}`)
        }
        
        for (let r of this.replacements) {
            res = res.replaceAll(r[0], r[1]);
        }
        res = res.replaceAll(/([a-zA-Z0-9]) ([a-zA-Z0-9])/g, "$1\\;$2")
        res = res.replaceAll(/([a-zA-Z])([0-9]+)/g, "$1_{$2}")
        
        return this.centered_math(res);
    }
    
    texify_inline(text) {
        let res = text;
        
        let m = res.match(/if\s+(.+?)\s+then\s+(.+?)\s+else/);
        if(m) {
            let beginning_index = res.indexOf("if");
            let beginning_of_end = res.indexOf("else");
            let end_index = end_or_first_unmatched_rpar(res, beginning_of_end);
            
            let else_branch = res.slice(beginning_of_end, end_index).replace("else", "");
            
            // TODO does not work for nested ifs
            
            res = res.replace(res.slice(beginning_index, end_index), `\\begin{cases} ${m[2]} & \\text{ if }${m[1]}\\\\${else_branch} & \\text{ otherwise}\\end{cases}`)
        }
        
        for (let r of this.replacements) {
            res = res.replaceAll(r[0], r[1]);
        }
        res = res.replaceAll(/([a-zA-Z0-9]) ([a-zA-Z0-9])/g, "$1\\;$2")
        res = res.replaceAll(/([a-zA-Z])([0-9]+)/g, "$1_{$2}")
        
        
    
        
        return this.inline_math(res);
    }

    inline_math(t) {
        return `\\(${t}\\)`;
    }

    centered_math(t) {
        return `\\[${t}\\]`;
    }

}

export {TeXifier};
