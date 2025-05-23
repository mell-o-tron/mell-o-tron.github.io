import { TeXifier } from "./texifier.js";
import { TacticCommentator } from "./tactic_commentator.js";
import {LanguageSelector} from "./multilang.js"
import {Hinter} from "./hinter.js"
import {Uncurrifier} from "./uncurrifier.js"
import {Currifier} from "./currifier.js"
import {TheoremParser} from "./theorem_parser.js"


class Visualizer {
    constructor(observer, language_selector) {
        this.observer = observer;
        this.tacticCommentator = new TacticCommentator(language_selector, observer);
        this.texifier = new TeXifier()
        this.language_selector = language_selector;
        
        this.step_list = [];
        
        this.apply_buttons = []

        // List of tactics and terminators
        this.tactics = [
            "after", "apply", "assert", "auto", "autorewrite", "case", "change", "clear", "compute", "congruence", "constructor",
            "congr", "cut", "cutrewrite", "dependent", "destruct", "eapply", "eauto", "ecase", "econstructor", "edestruct", "ediscriminate",
            "eelim", "eenough", "eexists", "eexact", "einduction", "einjection", "eleft", "epose", "eright", "esplit", "elim", "enough",
            "exists", "field", "firstorder", "fold", "fourier", "generalize", "have", "hnf", "induction", "injection", "instantiate", "intro",
            "intros", "inversion", "left", "move", "pattern", "pose", "refine", "remember", "rename", "repeat", "replace", "revert", "rewrite",
            "right", "ring", "set", "simpl", "specialize", "split", "subst", "suff", "symmetry", "transitivity", "trivial", "try", "unfold",
            "unlock", "using", "vm_compute", "where", "wlog", "ring_simplify", "destruct_with_eqn"
        ];
        this.terminators = [
            "assumption", "eassumption", "by", "contradiction", "discriminate", "easy", "exact", "now", "lia", "omega", "reflexivity", "tauto"
        ];
        
    }

    // Method to visualize the statement
    visualize(stmt, controller) {
        if (this.is_tactic(stmt)) {
            this.visualize_goal(stmt, controller);
        }
        MathJax.typeset();
    }

    // Method to visualize a goal
    visualize_goal(stmt, controller) {
        
        let vis_fun = () => {
            let uncurrifier = new Uncurrifier(controller);
            
            let comment = this.tacticCommentator.tactic_comment(stmt.text.trim().replace(/ .*/, '').replace(".", ""), stmt.text, uncurrifier);
            
            if(!this.observer.has_goals){
                let box = document.createElement("div");
                box.className = 'math-box';
                
                let header = document.createElement('div');
                header.className = `math-header theorem-header`;
                header.textContent = this.language_selector.current_language.CONCLUDED;
                
                let content = document.createElement('div');
                content.className = 'math-content';
                content.style["text-align"] = "center";
                content.innerHTML = "";
                
                const QED = new Image(300);

                let memes = ["./imgs/exactly.gif",
                             "./imgs/obiwan.png",
                             "./imgs/Q.jpg",
                             "./imgs/conte.png",
                             "./imgs/pippo.png",
                             "./imgs/gervasi.png",
                            ];

                const random = Math.floor(Math.random() * memes.length);


                QED.src = memes[random];
                content.appendChild(QED);
                
                let bottom_bar = document.createElement('div');
                bottom_bar.className = 'step-footer';
                bottom_bar.innerHTML = "";
                
                let print_button = document.createElement("button");
                print_button.className = "button-4";
                print_button.textContent = "PRINT RESULT";
                print_button.onclick = () => {
                    let url = new URL("/proof_print.html", window.location.href);
                    localStorage.setItem("goal_history", JSON.stringify(this.observer.goal_history));
                    localStorage.setItem("tactic_history", JSON.stringify(controller.coq_history));
                    

                    open(url.toString());
                }
                bottom_bar.appendChild(print_button);
                
                box.appendChild(header);
                box.appendChild(content);
                box.appendChild(bottom_bar);

                document.getElementById("latex-proof").appendChild(box);
                this.step_list[this.step_list.length - 1].bottom_bar.style.display = "none";
                return;
            }
            
            let text = ""
            if (this.observer.current_goal.hypotheses.length > 0) {
                text += this.language_selector.current_language.ASSUMING; //"Assuming the following hypotheses:";
                // Put all hypothesis in a centered LaTeX environment, so their vertical spacing is correct.
                let hps = "\\begin{gather*}\n";
                for (let h of this.observer.current_goal.hypotheses){
                    hps += `{${h.name}}` + " : " + uncurrifier.uncurrify(h.body) + " \\\\\n";
                }
                hps += "\n\\end{gather*}";
                text += this.texifier.texify(hps);
            }
            
            text += `${this.language_selector.current_language.PROVE}:` + this.texifier.texify(uncurrifier.uncurrify(this.observer.current_goal.goal));

            if (text === undefined) return;

            if (comment !== undefined) {
                text = comment + " " + text;
            }

            let bigBox = document.createElement("div");
            bigBox.className = 'goal-bigBox';
            let enumeration = document.createElement("p");
            enumeration.className = 'goal-enum';
            enumeration.innerHTML = `${(this.step_list.length /*+1*/)}.`;

            bigBox.appendChild(enumeration);
            let box = document.createElement("div");
            box.className = 'goal-box';
            
            let header = document.createElement('div');
            header.className = `math-header step-header`;
            header.textContent = this.language_selector.current_language.PROOFSTEP;
            
            let content = document.createElement('div');
            content.className = 'math-content';
            content.innerHTML = text;

            let bottom_bar = document.createElement('div');
            bottom_bar.className = 'step-footer';
            bottom_bar.innerHTML = "";

            
            let undobox = document.createElement("div");
            undobox.className = "undo-box";
            
            let hintbox = document.createElement("div");
            hintbox.className = "hint-box";
            
            bottom_bar.appendChild(hintbox);
            bottom_bar.appendChild(undobox);
            
            /* UNDO BUTTON */
            
            let undo = document.createElement("button");
//            undo.className = "button-4";
            undo.className = "btn btn-danger";
            undo.textContent = "UNDO";
            undo.onclick = () => {
                controller.rm_line();
                controller.observer.undo_goal_history();
                controller.observer.populate_hyps();
                this.step_list.pop();
                controller.coq_history.pop();
                controller.visualizer.tacticCommentator.undo_stack();

                if(this.step_list.length > 0)
                    this.step_list[this.step_list.length - 1].bottom_bar.style.display = "block";

                // If this node closed a case then we remove the closed case text box (if the node before this one is the closed case text box, then it must mean that this step was the one that closed the case, so the case uncloses when we undo it)
                let siblings = bigBox.parentNode.children;
                if (siblings[siblings.length-2] && siblings[siblings.length-2].className == "end-case") {
                    siblings[siblings.length-2].remove();
                }

                bigBox.remove();
            };

            if (this.step_list.length > 0)
                this.step_list[this.step_list.length - 1].bottom_bar.style.display = "none";

            undobox.appendChild(undo);

            /* HINTS */
            
            
            let hinter = new Hinter(controller);
            let hints = hinter.give_hints();
            
            for (let h of hints) {
                let hint_button = document.createElement("button");
//                hint_button.className = "button-4";
                hint_button.className = "btn btn-primary";
                hint_button.textContent = h.name;
                hint_button.onclick = h.func;
                controller.visualizer.apply_buttons.push(hint_button);
                
                hintbox.appendChild(hint_button);
            }
            
            box.appendChild(header);
            box.appendChild(content);
            box.appendChild(bottom_bar);
            bigBox.appendChild(box);
            document.getElementById("latex-proof").appendChild(bigBox);

            this.step_list.push({content : content, bottom_bar : bottom_bar});


            MathJax.typeset();
        }
        
        this.observer.vis_fun = vis_fun;
        
        
    }

    // Check if the statement is a tactic
    is_tactic(stmt) {
        let stripped = stmt.text.trim().replace(/ .*/, '').replace(".", "");
        return this.tactics.includes(stripped) || this.terminators.includes(stripped);
    }
    
    visualize_math(d, type, controller){
        let local_langsel = new LanguageSelector();

        let text = (d.text[`${local_langsel.current_language.language_name}`]);
        let box = document.createElement("div");
        box.className = 'math-box';
        
        let header = document.createElement('div');
        header.className = `math-header ${type}-header`;
        header.textContent = local_langsel.current_language[`${type}`]
        
        let content = document.createElement('div');
        content.className = 'math-content scroll-equation';
        content.innerHTML = text;
        
        let bottom_bar = document.createElement('div');
        bottom_bar.className = 'step-footer';
        bottom_bar.innerHTML = "";
        
        let hint_button = document.createElement("button");
        
        let hintbox = document.createElement("div");
        hintbox.className = "hint-box";
            
        bottom_bar.appendChild(hintbox)
        
        if(type == "theorem" && d.initial_hint) {
                hint_button.className = "btn btn-primary";
                hint_button.textContent = d.initial_hint.text[`${local_langsel.current_language.language_name}`];
                hint_button.onclick = (() => {
                    controller.apply_tactic(d.initial_hint.coq);
                }).bind(controller);
                
                controller.visualizer.apply_buttons.push(hint_button);
                
                hintbox.appendChild(hint_button);
        }
        
        box.appendChild(header);
        box.appendChild(content);
        
        if(type == "theorem" && d.initial_hint){
            box.appendChild(bottom_bar);
        }

        if(type == "theorem") {
            this.step_list.push({content : "", bottom_bar : bottom_bar});
        }

        document.getElementById("latex-proof").appendChild(box);
        MathJax.typeset();

    }

    add_theo_card(at, controller, type_id = "available_theorems") {
        let local_langsel = new LanguageSelector();
        let theorem_parser = new TheoremParser();
        
        let theorem_variables = theorem_parser.get_variables(at.coq);
        
        if (!theorem_variables) {           // TODO ugly hack, fix properly
            theorem_variables = [];
        }
        
        let theobox = document.createElement("div");
        theobox.className = 'theorem-card';
        
        let theodesc_container = document.createElement("div");
        theodesc_container.className = 'math-content-container';
        
        let theodesc = document.createElement("div");
        theodesc.className = 'math-content scroll-equation';

        theodesc.textContent = at.text[`${local_langsel.current_language.language_name}`];

        let header = document.createElement('div');
        header.className = "math-header theorem-header";
        header.textContent = at.display_name[`${local_langsel.current_language.language_name}`];
        
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
            });

        
        let occ_container = document.createElement('div');
        occ_container.className = "tbox-container";
        occ_container.textContent = `${local_langsel.current_language.OCCURRENCE}:`
        let occ = document.createElement("INPUT");
        occ.setAttribute("type", "number");
        occ.value = 1;
        occ_container.appendChild(occ);
        
        let var_containers = [];
        let var_inputs = [];
        
        for (let v of theorem_variables) {
            let var_container = document.createElement('div');
            var_container.className = "tbox-container";
            var_container.textContent = `${local_langsel.current_language.VALUEOF} ${v}: `
            let var_input = document.createElement("INPUT");
            var_input.setAttribute("type", "text");
            var_container.appendChild(var_input);
            
            var_containers.push(var_container);
            var_inputs.push(var_input);
        }
        
        let currifier = new Currifier(controller);
        
        let rw_lr = document.createElement("button");
        rw_lr.className = "button-4";
        rw_lr.textContent = `${local_langsel.current_language.APPLY} (→)`;
        rw_lr.onclick = () => {controller.rewrite_theorem(at.name, true, occ.value, var_inputs.map(x => currifier.currify(x.value)), theorem_variables)};
        
        controller.visualizer.apply_buttons.push(rw_lr);
        
        let rw_rl = document.createElement("button");
        rw_rl.className = "button-4";
        
        
        rw_rl.onclick = () => {controller.rewrite_theorem(at.name, false, occ.value, var_inputs.map(x => currifier.currify(x.value)), theorem_variables)};
        rw_rl.textContent = `${local_langsel.current_language.APPLY} (←)`;
        
        controller.visualizer.apply_buttons.push(rw_rl);
        
        let hidden_section = document.createElement('div');
        hidden_section.style.display = "none";
        for (let c of var_containers) {
            hidden_section.appendChild(c);
        }
        
        
        hidden_section.appendChild(occ_container);
        
        let show_controls = document.createElement("button");
        show_controls.className = "button-4";
        show_controls.onclick = () => {hidden_section.style.display == "block" ? hidden_section.style.display = "none" : hidden_section.style.display = "block"};
        show_controls.textContent = `${local_langsel.current_language.MORECONTROLS}`;
        
        let show_controls_container = document.createElement('div');
        show_controls_container.appendChild(show_controls);
        
        document.getElementById(type_id).appendChild(theobox);
        theobox.appendChild(header);
        theodesc_container.appendChild(theodesc);
        theodesc_container.appendChild(show_controls_container);
        theodesc_container.appendChild(hidden_section);
        theodesc_container.appendChild(rw_lr);
        theodesc_container.appendChild(rw_rl);
        theobox.appendChild(theodesc_container);
        MathJax.typeset();
    }

    add_tactic_card(at, controller) {
        let local_langsel = new LanguageSelector();

        let theobox = document.createElement("div");
        theobox.className = 'theorem-card';
        
        let theodesc_container = document.createElement("div");
        theodesc_container.className = 'math-content-container';
        
        let theodesc = document.createElement("div");
        theodesc.className = 'math-content scroll-equation';

        theodesc.textContent = at.text[`${local_langsel.current_language.language_name}`];
        document.getElementById("available_tactics").appendChild(theobox);

        let header = document.createElement('div');
        header.className = "math-header theorem-header";

        if (at.display_name)
            header.textContent = at.display_name[`${local_langsel.current_language.language_name}`];
        else
            header.textContent = at.name;

        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
            });
        
        let tboxes = []

        for (let i = 0; i < at.n_params; i++){
            
            switch (at.param_types[i]){
                case "definitions": {
                    let tbox = document.createElement("select");
                    
                    for (let def of controller.definitions) {
                        let defop = document.createElement("option");
                        defop.value = def.name;
                        defop.textContent = def.display_name;
                        tbox.appendChild(defop);
                    }
                    
                    tboxes.push(tbox);
                    break;
                }
                default: {
                    let tbox = document.createElement("INPUT");
                    tbox.setAttribute("type", "text");
                    tboxes.push(tbox);
                    break;
                }
            }
            
            
        }

        let apply_button = document.createElement("button");
        apply_button.className = "button-4";
        apply_button.textContent = local_langsel.current_language.APPLY;
        apply_button.onclick = () => {
            let args = tboxes.map(x => {return x.value});
            controller.apply_tactic(at.coq, args)
        };
        
        controller.visualizer.apply_buttons.push(apply_button);


        theobox.appendChild(header);
        theodesc_container.appendChild(theodesc);
        for (let tbox of tboxes) {
            let tbox_container = document.createElement("div");
            tbox_container.className = "tbox-container";
            theodesc_container.appendChild(tbox_container);
            tbox_container.appendChild(tbox);
        }
        theodesc_container.appendChild(apply_button);
        theobox.appendChild(theodesc_container);
        MathJax.typeset();
    }
    
    add_hp_application_card (controller) {

        let local_langsel = new LanguageSelector();
        let theorem_parser = new TheoremParser();
        
        let hypbox = document.createElement("div");
        hypbox.className = 'theorem-card';
        let theodesc = document.createElement("div");
        theodesc.className = 'math-content scroll-equation';
        theodesc.textContent = `${local_langsel.current_language.CHOOSEHYP}:`;
        document.getElementById("hypman").appendChild(hypbox);

        let header = document.createElement('div');
        header.className = "math-header hypothesis-header";
        header.textContent = local_langsel.current_language.APPLYHYP;
        
        let currifier = new Currifier(controller);
        
        let tbox_container = document.createElement("div");
        tbox_container.className = "tbox-container";
        
        let tbox = document.createElement("select");
        tbox.className = "hyp-dropdown"
        

        let hidden_section = document.createElement('div');
        let occ_container = document.createElement('div');
        occ_container.className = "tbox-container";
        occ_container.textContent = `${local_langsel.current_language.OCCURRENCE}: `;
        
        let show_controls = document.createElement("button");
        show_controls.className = "button-4";
        show_controls.onclick = () => {hidden_section.style.display == "block" ? hidden_section.style.display = "none" : hidden_section.style.display = "block"};
        show_controls.textContent = `${local_langsel.current_language.MORECONTROLS}`;

        let show_controls_container = document.createElement('div');
        show_controls_container.appendChild(show_controls);

        let more_controls_container = document.createElement('div');
        
        hidden_section.appendChild(more_controls_container);
        hidden_section.appendChild(occ_container);
        hidden_section.style.display = "none";
        
        let occ = document.createElement("INPUT");
        occ.setAttribute("type", "number");
        occ.value = 1;
        occ_container.appendChild(occ);
        
        let var_containers = [];
        let var_inputs = [];
        let hypothesis_variables = [];
        
        tbox.onchange = (() => {
            more_controls_container.innerHTML = "";
            let hp_body = controller.observer.get_hp_body(tbox.value);
            hypothesis_variables = theorem_parser.get_variables(hp_body);
            
            var_inputs = []
            
            for (let v of hypothesis_variables) {
                let var_container = document.createElement('div');
                var_container.className = "tbox-container";
                var_container.textContent = `${local_langsel.current_language.VALUEOF} ${v}: `
                let var_input = document.createElement("INPUT");
                var_input.setAttribute("type", "text");
                var_container.appendChild(var_input);

                more_controls_container.appendChild(var_container);
                var_inputs.push(var_input);
            }
            
        });
        
        
        let rw_lr = document.createElement("button");
        rw_lr.className = "button-4";
        rw_lr.textContent = `${local_langsel.current_language.APPLY} (→)`;
        rw_lr.onclick = () => {controller.rewrite_theorem(tbox.value, true, occ.value, var_inputs.map(x => currifier.currify(x.value)), hypothesis_variables)};

        controller.visualizer.apply_buttons.push(rw_lr);
        
        let rw_rl = document.createElement("button");
        rw_rl.className = "button-4";
        rw_rl.onclick = () => {controller.rewrite_theorem(tbox.value, false, occ.value, var_inputs.map(x => currifier.currify(x.value)), hypothesis_variables)};
        rw_rl.textContent = `${local_langsel.current_language.APPLY} (←)`;
        
        controller.visualizer.apply_buttons.push(rw_rl);
        
        hypbox.appendChild(header);
        hypbox.appendChild(theodesc);
        tbox_container.appendChild(tbox);
        hypbox.appendChild(tbox_container);
        hypbox.appendChild(show_controls_container);
        hypbox.appendChild(hidden_section);
        hypbox.appendChild(rw_lr);
        hypbox.appendChild(rw_rl);
        MathJax.typeset();
    }
        
        
    
    add_hp_handlers(controller) {
        this.add_hp_application_card(controller)
        
        
        // TODO Rewrite Hypothesis within Other Hypothesis
    }
}

export { Visualizer };
