import {LanguageSelector} from "./multilang.js"

class Hinter {
    constructor(controller){
        this.controller = controller
        this.observer = controller.observer
        this.langsel = new LanguageSelector();
    }
    
    give_hints() {
        let res = []
        let cur_goal = this.observer.current_goal.goal;
        
        {/* HINT FORALL */
            let m = cur_goal.match(/^forall (\w)/);
            console.log("HINT".repeat(10))
            console.log(m)
            if (m) {
                res.push ({
                    name : `${this.langsel.current_language.CHOOSEARBITRARY} ${m[1]}`,
                    func : () => {
                        this.controller.apply_tactic("intro.\n");
                    }
                });
            }
        }
        
        {/* HINT SYMMETRY */
            if(cur_goal.includes("=")){
                let s = cur_goal.split("=").map(x => x.trim())
                if (s[0] == s[1]){
                    res.push ({
                    name : `${this.langsel.current_language.APPLYREFLEXIVITY}`,
                    func : () => {
                        this.controller.apply_tactic("reflexivity.\n");
                    }
                });
                }
                else{
                 console.log("different: ", s[0], s[1])   
                }
            }
        }
        
        return res;
    }
    
}


export { Hinter };
