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


function find_zero_depth_equals (s) {
    let j = 0;
    let depth = 0;
    let equal_signs = []
    while (j < s.length) {
        if (s[j] == "(") depth ++;
        if (s[j] == ")") depth --;
        if (s[j-1] != "=" && s[j] == "=" && s[j+1] != "=" && depth == 0) equal_signs.push(j);
        j++;
    }
    return equal_signs;
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
            ["listn", "L_\\mathbb{N}"],
            ["list", "L_A"],
            ["btn", "BT_\\mathbb{N}"],
            ["bte", "BT_A"],
            ["false", "\\texttt{false}"],
            ["true", "\\texttt{true}"],
            ["||", "\\vee"],
            ["lmd", "\\lambda"],
//             [" ", "\\;"],
            ["∀", "\\forall"],
            ["§", ","]
        ];
    }

    replace_ifs (text) {
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
        
        res = res.replace(/\\bigg\s*\(\s*\\begin\{cases\}/, "(\\begin{cases}")
        res = res.replace(/\\end\{cases\}\s*\\bigg\s*\)/, "\\end{cases})")
        
        res = res.replace(/\(\s*\\begin\{cases\}/, "\\bigg(\\begin{cases}")
        res = res.replace(/\\end\{cases\}\s*\)/, "\\end{cases}\\bigg)")
        
        return res;
        
    }
    
    texify_common(text){
        let res = this.replace_ifs(text);
        
        for (let r of this.replacements) {
            res = res.replaceAll(r[0], r[1]);
        }
        res = res.replaceAll(/([a-zA-Z0-9]) ([a-zA-Z0-9])/g, "$1\\;$2")
        res = res.replaceAll(/([\s\(;][a-zA-Z])([0-9]+)/g, "$1_{$2}")
        
        
        // TODO recognize stuff of form X == Y and put it into parens
        
        return res
    }
    
    texify(text) {
        let res = this.texify_common(text);
        
        return `<div class="scroll-equation">` + this.centered_math(res) + `</div>`;
    }
    
    texify_inline(text) { 
        let res = this.texify_common(text);
        
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
