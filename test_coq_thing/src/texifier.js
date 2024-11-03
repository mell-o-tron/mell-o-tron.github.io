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
            [" ", "\\;"],
            ["∀", "\\forall"],
        ];
    }

    texify(text) {
        let res = text;
        for (let r of this.replacements) {
            res = res.replaceAll(r[0], r[1]);
        }
        res = res.replace(/([a-zA-Z]) ([a-zA-Z])/g, "$1\\;$2")
        return this.centered_math(res);
    }
    
    texify_inline(text) {
        let res = text;
        for (let r of this.replacements) {
            res = res.replaceAll(r[0], r[1]);
        }
        res = res.replace(/([a-zA-Z]) ([a-zA-Z])/g, "$1\\;$2")
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
