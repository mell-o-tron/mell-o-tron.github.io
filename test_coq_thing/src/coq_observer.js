
import { FormatPrettyPrint } from '../node_modules/jscoq/jscoq.js';

/* checks whether two goals are the same */
function same_goal (g1, g2){
  if (g1.goal != g2.goal){
    return false;
  }
  
  if (g1.hypotheses.length != g2.hypotheses.length){
    return false;
  }
  
  for (let i in g1.hypotheses){
    let h1 = g1.hypotheses[i];
    let h2 = g2.hypotheses[i];
    if (h1.name != h2.name || h1.body != h2.body){
      return false
    }
  }
  return true;
  
}

/* given two lists of goals, return the goals that are in the first list but not in the second */
function goal_set_difference (gs1, gs2) {
  let res = [];
  
  for (let g1 of gs1) {
    let present = false;
    for (let g2 of gs2) {
      if( same_goal(g1, g2) ){
        present = true;
        break;
      }
    }
    if (!present) res.push(g1)
  }
  return res;
  
}

// Observer class: gathers current goal and receives goal display function

class Observer {
  constructor() {
    this.when_ready = new Promise(resolve => this._ready = resolve);
    this.pprint = new FormatPrettyPrint();
    this.current_goal = {};
    this.all_goals = [];
    this.old_goals = [];
    this.goal_history = [[]];
    this.new_goals = [];
    this.vis_fun = (() => {});
    this.has_goals = false;   // used to check if proof is finished.
  }
  
  undo_goal_history() {
    this.all_goals = this.goal_history.pop();
    this.old_goals = this.goal_history[this.goal_history.length - 1]
    this.current_goal = this.all_goals[0];
  }
  
  coqReady() {  this._ready(); }
  coqGoalInfo(sid, goals) {
    // Save goals in history and reset all_goals
    this.old_goals = this.all_goals;
    this.goal_history.push(this.old_goals);
    this.all_goals = [];
    
    if (!goals) {
      console.log("There are no current goals")
      this.has_goals = false;
      return
    }
    if (!goals.goals) {
      this.has_goals = false;
      console.log("There are no current goals")
      return
    }
    var bar = `\n${"-".repeat(60)}\n`
    console.log(`current goals:`);
    console.log(bar, goals, bar);
    
    if (goals.goals[0]) {
      this.has_goals = true;
      
      for (let g of goals.goals){
        let goal_obj = {hypotheses : [], goal : ""};
        
        for (let h of g.hyp) {
          
          let hp_names = []
          for (let hpn of h[0]){
            hp_names.push(hpn[1]);
          }
            
          let hp_body = this.pprint.pp2Text(h[2])
          
          for (let hp_name of hp_names)
            goal_obj.hypotheses.push({name: hp_name, body: hp_body})
        }
        
        goal_obj.goal = this.pprint.pp2Text(g.ty)
        console.log(goal_obj);
        
        this.all_goals.push(goal_obj);
      }
      
      this.current_goal = this.all_goals[0];
      this.new_goals = goal_set_difference(this.all_goals, this.old_goals);
      
      console.log("new goals", this.new_goals)
      
      console.log("all goals", this.all_goals);
      
      /* populate hypothesis dropdowns */
      const dropdowns = document.querySelectorAll(".hyp-dropdown");
      
      dropdowns.forEach(dropdown => {
        dropdown.innerHTML = "";
        
        for (let h of this.current_goal.hypotheses){
          let hopt = document.createElement('option');
          hopt.value = h.name;
          hopt.textContent = h.name;
          dropdown.appendChild(hopt);
        }
        
      });
        
    } else {
     this.has_goals = false; 
    }
    this.vis_fun();
    
  }
} 

export {Observer}
