open Epistemic.Ast
open Js_of_ocaml

exception Syntax_error of int * int * string


let rec string_of_del phi = match phi with
  | Id (Var x) -> "\\text{" ^ x ^ "}"
  | Neg phi1 -> "\\neg (" ^ string_of_del phi1 ^ ")"
  | And (phi1, phi2) -> "(" ^ string_of_del phi1 ^ ") \\wedge (" ^ string_of_del phi2 ^ ")"
  | K (Agent i, phi1) -> "K_{" ^ (string_of_int i) ^ "}(" ^ string_of_del phi1 ^ ")"
  | C (delta, psi) -> 
      let ilist = List.fold_left (fun x y -> (match y with Agent(i) -> (x ^ "\\; " ^ (string_of_int i)))) "" delta in
      "C_{\\{" ^ (ilist) ^ "\\;\\}}(" ^ string_of_del psi ^ ")"
  | PA(psi, phi1) -> "["^ string_of_del psi ^"]" ^ "(" ^ string_of_del phi1 ^ ")"
  | GA(delta, psi, phi1) -> let ilist = List.fold_left (fun x y -> (match y with Agent(i) -> (x ^ "\\; " ^ (string_of_int i)))) "" delta in
  "["^ string_of_del psi ^"]_{\\{" ^ ilist ^ "\\;\\}}(" ^ string_of_del phi1 ^ ")"


(* integer exponentiation: used to compute upper bound to number of states *)
let rec pow a = function
  | 0 -> 1
  | 1 -> a
  | n -> 
    let b = pow a (n / 2) in
    b * b * (if n mod 2 = 0 then 1 else a)

(* Debug printing functions *)
let _print_var_list vlist = (List.iter (fun y -> print_string ((show_var y) ^ ",\t")) vlist)
let _print_var_var_list vvlist = (List.iter (fun x -> _print_var_list x ; print_newline ()) vvlist)


(* function that transforms a boolean formula into a boolean function *)
let rec eval_bform bform =
  match bform with
  | BTrue -> fun _ -> true
  | BId (Var x) -> fun l -> List.mem (Var x) l
  | BNeg b1 -> fun l -> not ((eval_bform b1) l)
  | BAnd (b1, b2) -> fun l -> (eval_bform b1) l && (eval_bform b2) l
  | BOr (b1, b2) -> fun l -> (eval_bform b1) l || (eval_bform b2) l

let get_subsets vars =
  let rec aux vars acc =
    match vars with
    | [] -> acc
    | a :: l -> aux l (acc @ List.map (fun x -> a :: x) acc)
  in
  aux vars [ [] ]

(* Get all assignments of V that satisfies theta *)
let all_states (f : ks) =
  match f with
  | vars, theta, _ ->
      let res = List.filter (eval_bform theta) (get_subsets vars) in
(*      print_endline "All states: ";
         _print_var_var_list res; *)
      res

(* utilities for removing duplicates *)
let uniq_cons x xs = if List.mem x xs then xs else x :: xs
let remove_from_right xs = List.fold_right uniq_cons xs []

(*function for taking intersection of lists*)
let intersection l1 l2 = List.filter (fun e -> List.mem e l2) l1

(* function that checks if l1 contains l2 as sets (sorting and removing repetitions) *)
let contains l1 l2 =
  let inters =
    List.sort compare
      (intersection (remove_from_right l1) (remove_from_right l2))
  in
  inters = List.sort compare l2

let setminus l1 l2 = remove_from_right (List.sort compare (List.filter (fun e -> not (List.mem e l2)) l1))
  
let same_observables s s1 oi =
(*  print_string "Observables: ";
  _print_var_list oi;
  print_string "State: ";
  _print_var_list s;
  print_string "and state: ";
  _print_var_list s1;*)
  let res = List.sort compare (intersection s oi) = List.sort compare (intersection s1 oi) in 
(*   (if res then print_endline "observably equivalent" else print_endline "NOT observably equivalent"); *)
  res

(* function for obtaining all states s' s.t. s E s' *)
(* actually pass subset of os based on Delta *)
let all_E states s os =
  remove_from_right
    (List.flatten
       (List.map
          (fun oi -> List.filter (fun s1 -> same_observables s s1 oi) states)
          os))

          

(* Function for checking if s, s1 is in the transitive closure of E - performs fixpoint computation

  For each oi in os, check inters(s, oi) = inters(s1, oi).
   - If holds return true
   - Otherwise generate all states s.t. s E s' and call recursively trans_clos_E s s' os

   Stop all new generated states have already been checked
*)
let trans_clos_E states s s1 os =
  let rec aux s s1 checked_states =
    let condition = List.map (fun oi -> same_observables s s1 oi) os in
    if List.fold_left ( || ) false condition then true
    else
      let all_e = all_E states s os in
      if contains checked_states all_e then false
      else
        List.fold_left ( || ) false
          (List.map (fun s2 -> aux s2 s1 (all_e @ checked_states)) all_e)
  in
  aux s s1 []

  
(* substitutes p with psi in bform *)
let rec subst bform p psi =match bform with 
  | BTrue -> BTrue
  | BId (Var x) -> if (Var x) = p then psi else BId (Var x)
  | BNeg b1 -> BNeg (subst b1 p psi)
  | BAnd (b1, b2) -> BAnd (subst b1 p psi, subst b2 p psi)
  | BOr (b1, b2) -> BOr (subst b1 p psi, subst b2 p psi)
  
(* substitutes all vars in list with psi in bform *)
let rec _subst_varlist bform varlist psi = match varlist with
  | []      -> bform
  | a :: l  -> _subst_varlist (subst bform a psi) l psi
  
 (* generates formula that holds iff phi is true forall assignments of p *)
let forall bform p = BAnd(subst bform p BTrue, subst bform p (BNeg BTrue))

 (* generates formula that holds iff phi is true forall assignments of all the vars in list *)
let rec forall_varlist bform varlist = match varlist with 
  | []      -> bform
  | a :: l  -> forall_varlist (forall bform a) l


(* generates fresh variable *)
let gen_var =
  let counter = ref 0 in
  fun () -> incr counter; "fresh_var" ^ string_of_int !counter

  
(* Generates O* for the semantics of GA *)
let compute_os_star os delta p_psi =
    let rec aux os i = match os with
      | [] -> []
      | a :: l -> if List.mem (Agent(i)) delta then (Var(p_psi) :: a) :: (aux l (i+1)) 
                  else a :: (aux l (i+1))
    in aux os 0;;
  

  
(* generates a boolean formula that holds true in assignment s iff (F,s) |= phi *)
let rec truth_value (f, phi) = (match f with 
  | vars, theta, os -> (
    match phi with 
    | Id (Var x) -> BId(Var x)
    | Neg phi1 -> BNeg(truth_value (f, phi1))
    | And (phi1, phi2) -> BAnd(truth_value (f, phi1), truth_value (f, phi2))
    | K (Agent i, phi1) -> let varlist = setminus vars (List.nth os i) in
        forall_varlist (BOr(BNeg(theta), truth_value (f, phi1))) varlist
    | C (delta, psi) -> fix_Lambda psi delta f (pow 2 (List.length vars))
    | PA(psi, phi1) -> let truth_psi = truth_value(f, psi) in
        let f_psi = (vars, BAnd(theta, truth_psi), os) in
          BOr(BNeg(truth_psi), truth_value (f_psi, phi1))
    | GA(delta, psi, phi1) ->
          let truth_psi = truth_value(f, psi) in 
          let p_psi = gen_var () in
          let os_star = (compute_os_star os delta p_psi) in
          let f_psi_delta = ((Var(p_psi)) :: vars, BAnd(theta, (BOr(BNeg (BId(Var(p_psi))), truth_psi))), os_star) in
          BOr(BNeg(truth_psi), subst (truth_value (f_psi_delta, phi1)) (Var p_psi) BTrue)
      
  ))
 and fix_Lambda psi delta f n =
    if n = 0 then BTrue else
    (match f with vars, theta, os -> (
    let conjunction = List.fold_left ( fun x y -> BAnd(x, y) ) BTrue  (List.map (fun ai -> 
      (match ai with Agent i ->
        let varlist = setminus vars (List.nth os i) in
            forall_varlist (BOr(BNeg(theta), fix_Lambda psi delta f (n-1))) varlist)
        ) delta)
    in BAnd(truth_value (f, psi), conjunction)))
  
(* function that checks if a formula phi is satisfied by a frame (F, s) *)
let rec sat (f, s, phi) =
  let every_state = all_states f in
  match f with
  | vars, theta, os -> (
      match phi with
      | Id (Var x) -> List.mem (Var x) s
      | Neg phi1 -> not (sat (f, s, phi1))
      | And (phi1, phi2) -> sat (f, s, phi1) && sat (f, s, phi2)
      | K (Agent i, phi1) ->
          let oi = List.nth os i in
          let implication =
            List.map
              (fun s1 -> (not (same_observables s s1 oi)) || sat (f, s1, phi1))
              every_state
          in
          List.fold_left ( && ) true implication
      | C (agents, phi1) ->
          let delta =
            List.map (fun i -> match i with Agent i -> List.nth os i) agents
          in
          let implication =
            List.map
              (fun s1 ->
                (not (trans_clos_E every_state s s1 delta)) || sat (f, s1, phi1))
              every_state
          in
          List.fold_left ( && ) true implication
          
      | PA(psi, phi1) -> let f_psi = (vars, BAnd(theta, truth_value(f, psi)), os) in
          not (sat (f, s, psi)) || (sat (f_psi, s, phi1))
          
      | GA(delta, psi, phi1) -> let p_psi = gen_var () in
          let os_star = (compute_os_star os delta p_psi) in
          let f_psi_delta = ((Var(p_psi)) :: vars, BAnd(theta, (BOr(BNeg (BId(Var(p_psi))), truth_value(f, psi)))), os_star) in
          not (sat (f, s, psi)) || (sat (f_psi_delta, Var (p_psi)::s, phi1))
      )
  
(* get argv as input channel and feed it to the tokenizer-parser pipeline *)
  
(*let inchn = open_in Sys.argv.(1)

let ast_of_channel inchn =
  let lexbuf = Sedlexing.Latin1.from_channel inchn in
  let lexer = Sedlexing.with_tokenizer Epistemic.Lexer.token lexbuf in
  let parser =
    MenhirLib.Convert.Simplified.traditional2revised Epistemic.Parser.main
  in
  try parser lexer
  with Epistemic.Parser.Error ->
    raise
      (Syntax_error
         ( (fst (Sedlexing.lexing_positions lexbuf)).pos_lnum,
           (fst (Sedlexing.lexing_positions lexbuf)).pos_cnum
           - (fst (Sedlexing.lexing_positions lexbuf)).pos_bol,
           "Syntax error" ))*)
           
let _ast_of_string str =
  let lexbuf = Sedlexing.Latin1.from_string str in
  let lexer = Sedlexing.with_tokenizer Epistemic.Lexer.token lexbuf in
  let parser =
    MenhirLib.Convert.Simplified.traditional2revised Epistemic.Parser.main
  in
  try parser lexer
  with Epistemic.Parser.Error ->
    raise
      (Syntax_error
         ( (fst (Sedlexing.lexing_positions lexbuf)).pos_lnum,
           (fst (Sedlexing.lexing_positions lexbuf)).pos_cnum
           - (fst (Sedlexing.lexing_positions lexbuf)).pos_bol,
           "Syntax error" ))


(* prints the result of the computation *)
(*let main () =
  match ast_of_channel inchn with
  | vars, theta, os, state, form_list ->
      let f : ks = (vars, theta, os) in
      List.iter (fun form -> 
          let res = sat (f, state, form) in
          print_endline (if res then "True" else "False")
      ) form_list
;;*)

(*let _main () =
  match ast_of_channel inchn with
  | vars, theta, os, state, form_list ->
      let f : ks = (vars, theta, os) in
      List.iter (fun form -> 
          let res = sat (f, state, form) in
          print_endline (if res then "True" else "False")
      ) form_list
;;*)

(* _main () *)

let _model_check str =
  match _ast_of_string str with
  | vars, theta, os, state, form_list ->
      let f : ks = (vars, theta, os) in
      List.map (fun form -> 
          let res = sat (f, state, form) in
          "$$" ^ (string_of_del form) ^ "$$ " ^ (if res then "True" else "False")
      ) form_list
      
      
let _ =
  Js.export "modelChecker"
    (object%js
       method check str = _model_check str
     end)

