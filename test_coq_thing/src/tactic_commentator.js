import { TeXifier } from "./texifier.js"; // Import the PlainTextifier class

class TacticCommentator {
    constructor(language_selector, observer) {
        this.texifier = new TeXifier(); // Create an instance of PlainTextifier for inline_math
        this.language_selector = language_selector;
        this.observer = observer;
    }

    // Method to generate a comment based on the tactic
    tactic_comment(tactic, text) {
        switch (tactic) {
            case "induction":
                let s = `${this.language_selector.current_language.BYINDUCTION} ${this.texifier.inline_math(text.replace("induction", "").replace(".", ""))}. `;
                s += `${this.language_selector.current_language.MUSTPROVEFOLLOWINGCLAUSES}:`;
                
                let new_goals = this.observer.new_goals;
                console.log("new goals are:", new_goals, new_goals.length)
                
                if(new_goals.length == 2){
                    let ng0 = this.texifier.texify(new_goals[0].goal);
                    
                    let hps1 = new_goals[1].hypotheses.map(x => `${x.name} : ${x.body}`).join(") \\wedge (")
                    
                    let ng1 = this.texifier.texify(` (${hps1}) \\implies ${new_goals[1].goal}`);
                    
                    let base_clause_text = this.language_selector.current_language.BASECLAUSE;
                    let inductive_clause_text = this.language_selector.current_language.INDUCTIVECLAUSE;
                    
                    s += `<ul style="margin : 20px;"><li>${base_clause_text}: <div class="scroll-equation">${(ng0)}</div></li>`;
                    s += `<li>${inductive_clause_text}: <div class="scroll-equation">${(ng1)}</div></li></ul>`;
                } else{
                    // WARNING NOT TESTED
                    
                    s += `<ul style="margin : 20px>`;
                    for (let i in new_goals){
                        let hpsi = new_goals[i].hypotheses.map(x => `${x.name} : ${x.body}`).join(") \\wedge (")
                        let ngi = this.texifier.texify(hpsi + "\implies" + new_goals[i].goal);
                        s += `<li><div class="scroll-equation">(${(ng0)})</div></li>`;
                    }
                    s += "</ul>";
                }
                
                s += `${this.language_selector.current_language.BEGINFIRSTBASECLAUSE}. `;
                return s;

            case "intro":
                return `${this.language_selector.current_language.INTRO}.`;

            case "intros":
                return `${this.language_selector.current_language.INTROS}.`;

            case "reflexivity":
                return `${this.language_selector.current_language.REFL}.`;

            case "rewrite":
                let direction = text.includes("<-") ? `${this.language_selector.current_language.RIGHTTOLEFT}` : `${this.language_selector.current_language.LEFTTORIGHT}`;
                return `We apply: ${this.texifier.inline_math("\\texttt{" + text.replace("rewrite", "")
                    .replace(".", "")
                    .replace("->", "")
                    .replace("<-", "")
                    // .replaceAll("_", "\\_")
                    .trim() + "}")} ${direction}.`;

            default:
                return "";
        }
    }
}

export { TacticCommentator };
