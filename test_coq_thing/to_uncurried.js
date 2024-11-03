
// 1) find match of fun_name
// 2) skip spaces until next character
// 3) if paren, find matching paren and call recursively on paren content
// 4) if not paren, scan rest of word

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

function to_uncurried (s, fun) {
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
                fargs.push(to_uncurried(s1.slice(j+1, mpar_pos), fun));

                i = mpar_pos + 1
            } else {
                let eow_pos = end_of_word(s1, j);
                fargs.push(to_uncurried(s1.slice(j, eow_pos+1), fun))
                i = eow_pos + 1
            }
        }
        return (`${s1.slice(0, m.index)}${fun_name}(${fargs.join(" , ")})${to_uncurried(s1.slice(i, s1.length), fun)}`)
        
    }
    else return s1;
}

let funs = [{name : "mapp", arity : 2}, {name : "len", arity : 1}]

let s = "forall (B : Type) (l1 l2 : list B) , len (mapp l1 l2) = len l1 + len l2"
for (fun of funs) {
    s = to_uncurried(s, fun)
}
console.log(s)
