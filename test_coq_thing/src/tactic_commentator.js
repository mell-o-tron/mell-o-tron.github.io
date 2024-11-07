import { TeXifier } from "./texifier.js"; // Import the PlainTextifier class


/* checks whether two goals are the same */
function same_goal (g1, g2){
  if (g1.goal != g2.goal){
    return false;
  }
  
  if (g1.hypotheses.length != g2.hypotheses.length){
    return false;
  }
  
  let hg1 = g1.hypotheses.sort((x, y) => `${x.name}${x.body}` > `${y.name}${y.body}`);
  let hg2 = g2.hypotheses.sort((x, y) => `${x.name}${x.body}` > `${y.name}${y.body}`);
  
  for (let i in hg1){
    let h1 = hg1[i];
    let h2 = hg2[i];
    if (h1.name != h2.name || h1.body != h2.body){
      return false
    }
  }
  return true;
  
}


class TacticCommentator {
    constructor(language_selector, observer) {
        this.texifier = new TeXifier(); // Create an instance of PlainTextifier for inline_math
        this.language_selector = language_selector;
        this.observer = observer;
        
        this.inductive_goal = {};
    }

    // Method to generate a comment based on the tactic
    tactic_comment(tactic, text, uncurrifier) {
        switch (tactic) {
            case "induction":
                let s = `${this.language_selector.current_language.BYINDUCTION} ${this.texifier.inline_math(text.replace("induction", "").replace(".", ""))}. `;
                s += `${this.language_selector.current_language.MUSTPROVEFOLLOWINGCLAUSES}:`;
                
                let new_goals = this.observer.new_goals;
                console.log("new goals are:", new_goals, new_goals.length)
                
                if(new_goals.length == 2){
                    this.inductive_goal = new_goals[1]; // save inductive case goal
                    
                    let ng0 = this.texifier.texify(uncurrifier.uncurrify(new_goals[0].goal));
                    
                    let hps1 = new_goals[1].hypotheses.map(x => `${x.name} : ${uncurrifier.uncurrify(x.body)}`).join(" \\\\")
                    
                    let ng1 = this.texifier.texify(`\\begin{gather*}${hps1} \\\\ \\Downarrow \\\\ ${uncurrifier.uncurrify(new_goals[1].goal)}\\end{gather*}`);
                    
                    let base_clause_text = this.language_selector.current_language.BASECLAUSE;
                    let inductive_clause_text = this.language_selector.current_language.INDUCTIVECLAUSE;
                    
                    s += `<ul style="margin : 20px;"><li>${base_clause_text}: <div class="scroll-equation">${(ng0)}</div></li>`;
                    s += `<li>${inductive_clause_text}: <div class="scroll-equation">${(ng1)}</div></li></ul>`;
                } else{
                    // WARNING NOT TESTED
                    
                    s += `<ul style="margin : 20px>`;
                    for (let i in new_goals){
                        let hpsi = new_goals[i].hypotheses.map(x => `${x.name} : ${uncurrifier.uncurrify(x.body)}`).join(" \\\\ \\wedge \\;\\; &")
                        let ngi = this.texifier.texify(`\\begin{aligned}&${hpsi} \\\\ \\implies &${uncurrifier.uncurrify(new_goals[i].goal)}\\end{aligned}`);
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
                let res = "";
                
                console.log("INDUCTIVE", this.inductive_goal)
                console.log("CURRENT", this.observer.current_goal)
                res += `${this.language_selector.current_language.REFL}.`;
                
                if(this.inductive_goal && same_goal(this.inductive_goal, this.observer.current_goal)){
                    res += `<br><div style="text-align: center;"><b>` + this.language_selector.current_language.END_OF_BASE_CASE + "</b></div><br>"
                    this.inductive_goal = {};
                    
                }
                return res;

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
