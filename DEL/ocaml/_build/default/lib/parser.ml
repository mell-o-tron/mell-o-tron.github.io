
module MenhirBasics = struct
  
  exception Error
  
  let _eRR =
    fun _s ->
      raise Error
  
  type token = 
    | VARDECL
    | VAR
    | TRUE
    | THETADECL
    | STRING of (
# 8 "lib/parser.mly"
       (string)
# 19 "lib/parser.ml"
  )
    | STATEDECL
    | SEMICOLON
    | RPAREN
    | RBRACKET
    | PA
    | OR
    | NOT
    | LPAREN
    | LBRACKET
    | K
    | INT of (
# 9 "lib/parser.mly"
       (int)
# 34 "lib/parser.ml"
  )
    | GA
    | EOF
    | Character of (
# 10 "lib/parser.mly"
       (char)
# 41 "lib/parser.ml"
  )
    | COMMA
    | COLON
    | CHECK
    | C
    | AND
    | AGENTSDECL
  
end

include MenhirBasics

# 2 "lib/parser.mly"
  
  open Ast (* Define the abstract syntax tree in Ast.ml *)

# 58 "lib/parser.ml"

type ('s, 'r) _menhir_state = 
  | MenhirState02 : ('s, _menhir_box_main) _menhir_state
    (** State 02.
        Stack shape : .
        Start symbol: main. *)

  | MenhirState03 : (('s, _menhir_box_main) _menhir_cell1_LBRACKET, _menhir_box_main) _menhir_state
    (** State 03.
        Stack shape : LBRACKET.
        Start symbol: main. *)

  | MenhirState05 : (('s, _menhir_box_main) _menhir_cell1_STRING, _menhir_box_main) _menhir_state
    (** State 05.
        Stack shape : STRING.
        Start symbol: main. *)

  | MenhirState13 : ('s _menhir_cell0_var_declaration, _menhir_box_main) _menhir_state
    (** State 13.
        Stack shape : var_declaration.
        Start symbol: main. *)

  | MenhirState19 : (('s, _menhir_box_main) _menhir_cell1_NOT, _menhir_box_main) _menhir_state
    (** State 19.
        Stack shape : NOT.
        Start symbol: main. *)

  | MenhirState20 : (('s, _menhir_box_main) _menhir_cell1_LPAREN, _menhir_box_main) _menhir_state
    (** State 20.
        Stack shape : LPAREN.
        Start symbol: main. *)

  | MenhirState23 : (('s, _menhir_box_main) _menhir_cell1_bool_form, _menhir_box_main) _menhir_state
    (** State 23.
        Stack shape : bool_form.
        Start symbol: main. *)

  | MenhirState25 : (('s, _menhir_box_main) _menhir_cell1_bool_form, _menhir_box_main) _menhir_state
    (** State 25.
        Stack shape : bool_form.
        Start symbol: main. *)

  | MenhirState32 : ('s _menhir_cell0_var_declaration _menhir_cell0_theta_declaration, _menhir_box_main) _menhir_state
    (** State 32.
        Stack shape : var_declaration theta_declaration.
        Start symbol: main. *)

  | MenhirState37 : (('s, _menhir_box_main) _menhir_cell1_var_list, _menhir_box_main) _menhir_state
    (** State 37.
        Stack shape : var_list.
        Start symbol: main. *)

  | MenhirState41 : ('s _menhir_cell0_var_declaration _menhir_cell0_theta_declaration _menhir_cell0_agent_declaration, _menhir_box_main) _menhir_state
    (** State 41.
        Stack shape : var_declaration theta_declaration agent_declaration.
        Start symbol: main. *)

  | MenhirState43 : ('s _menhir_cell0_var_declaration _menhir_cell0_theta_declaration _menhir_cell0_agent_declaration _menhir_cell0_state_declaration, _menhir_box_main) _menhir_state
    (** State 43.
        Stack shape : var_declaration theta_declaration agent_declaration state_declaration.
        Start symbol: main. *)

  | MenhirState45 : (('s, _menhir_box_main) _menhir_cell1_CHECK, _menhir_box_main) _menhir_state
    (** State 45.
        Stack shape : CHECK.
        Start symbol: main. *)

  | MenhirState51 : (('s, _menhir_box_main) _menhir_cell1_PA, _menhir_box_main) _menhir_state
    (** State 51.
        Stack shape : PA.
        Start symbol: main. *)

  | MenhirState52 : (('s, _menhir_box_main) _menhir_cell1_NOT, _menhir_box_main) _menhir_state
    (** State 52.
        Stack shape : NOT.
        Start symbol: main. *)

  | MenhirState53 : (('s, _menhir_box_main) _menhir_cell1_LPAREN, _menhir_box_main) _menhir_state
    (** State 53.
        Stack shape : LPAREN.
        Start symbol: main. *)

  | MenhirState57 : (('s, _menhir_box_main) _menhir_cell1_K _menhir_cell0_INT, _menhir_box_main) _menhir_state
    (** State 57.
        Stack shape : K INT.
        Start symbol: main. *)

  | MenhirState59 : (('s, _menhir_box_main) _menhir_cell1_GA, _menhir_box_main) _menhir_state
    (** State 59.
        Stack shape : GA.
        Start symbol: main. *)

  | MenhirState60 : (('s, _menhir_box_main) _menhir_cell1_LBRACKET, _menhir_box_main) _menhir_state
    (** State 60.
        Stack shape : LBRACKET.
        Start symbol: main. *)

  | MenhirState63 : (('s, _menhir_box_main) _menhir_cell1_INT, _menhir_box_main) _menhir_state
    (** State 63.
        Stack shape : INT.
        Start symbol: main. *)

  | MenhirState68 : ((('s, _menhir_box_main) _menhir_cell1_GA, _menhir_box_main) _menhir_cell1_agentlist, _menhir_box_main) _menhir_state
    (** State 68.
        Stack shape : GA agentlist.
        Start symbol: main. *)

  | MenhirState70 : (('s, _menhir_box_main) _menhir_cell1_C, _menhir_box_main) _menhir_state
    (** State 70.
        Stack shape : C.
        Start symbol: main. *)

  | MenhirState72 : ((('s, _menhir_box_main) _menhir_cell1_C, _menhir_box_main) _menhir_cell1_agentlist, _menhir_box_main) _menhir_state
    (** State 72.
        Stack shape : C agentlist.
        Start symbol: main. *)

  | MenhirState75 : (('s, _menhir_box_main) _menhir_cell1_formula, _menhir_box_main) _menhir_state
    (** State 75.
        Stack shape : formula.
        Start symbol: main. *)

  | MenhirState77 : (('s, _menhir_box_main) _menhir_cell1_formula, _menhir_box_main) _menhir_state
    (** State 77.
        Stack shape : formula.
        Start symbol: main. *)

  | MenhirState80 : (((('s, _menhir_box_main) _menhir_cell1_GA, _menhir_box_main) _menhir_cell1_agentlist, _menhir_box_main) _menhir_cell1_formula, _menhir_box_main) _menhir_state
    (** State 80.
        Stack shape : GA agentlist formula.
        Start symbol: main. *)

  | MenhirState89 : ((('s, _menhir_box_main) _menhir_cell1_PA, _menhir_box_main) _menhir_cell1_formula, _menhir_box_main) _menhir_state
    (** State 89.
        Stack shape : PA formula.
        Start symbol: main. *)

  | MenhirState93 : ((('s, _menhir_box_main) _menhir_cell1_CHECK, _menhir_box_main) _menhir_cell1_formula, _menhir_box_main) _menhir_state
    (** State 93.
        Stack shape : CHECK formula.
        Start symbol: main. *)


and 's _menhir_cell0_agent_declaration = 
  | MenhirCell0_agent_declaration of 's * (Ast.var list list)

and ('s, 'r) _menhir_cell1_agentlist = 
  | MenhirCell1_agentlist of 's * ('s, 'r) _menhir_state * (Ast.agent list)

and ('s, 'r) _menhir_cell1_bool_form = 
  | MenhirCell1_bool_form of 's * ('s, 'r) _menhir_state * (Ast.bform)

and ('s, 'r) _menhir_cell1_formula = 
  | MenhirCell1_formula of 's * ('s, 'r) _menhir_state * (Ast.formula)

and 's _menhir_cell0_state_declaration = 
  | MenhirCell0_state_declaration of 's * (Ast.var list)

and 's _menhir_cell0_theta_declaration = 
  | MenhirCell0_theta_declaration of 's * (Ast.bform)

and 's _menhir_cell0_var_declaration = 
  | MenhirCell0_var_declaration of 's * (Ast.var list)

and ('s, 'r) _menhir_cell1_var_list = 
  | MenhirCell1_var_list of 's * ('s, 'r) _menhir_state * (Ast.var list)

and ('s, 'r) _menhir_cell1_C = 
  | MenhirCell1_C of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_CHECK = 
  | MenhirCell1_CHECK of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_GA = 
  | MenhirCell1_GA of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_INT = 
  | MenhirCell1_INT of 's * ('s, 'r) _menhir_state * (
# 9 "lib/parser.mly"
       (int)
# 239 "lib/parser.ml"
)

and 's _menhir_cell0_INT = 
  | MenhirCell0_INT of 's * (
# 9 "lib/parser.mly"
       (int)
# 246 "lib/parser.ml"
)

and ('s, 'r) _menhir_cell1_K = 
  | MenhirCell1_K of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_LBRACKET = 
  | MenhirCell1_LBRACKET of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_LPAREN = 
  | MenhirCell1_LPAREN of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_NOT = 
  | MenhirCell1_NOT of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_PA = 
  | MenhirCell1_PA of 's * ('s, 'r) _menhir_state

and ('s, 'r) _menhir_cell1_STRING = 
  | MenhirCell1_STRING of 's * ('s, 'r) _menhir_state * (
# 8 "lib/parser.mly"
       (string)
# 268 "lib/parser.ml"
)

and _menhir_box_main = 
  | MenhirBox_main of (Ast.env) [@@unboxed]

let _menhir_action_01 =
  fun () ->
    (
# 55 "lib/parser.mly"
                                       ([])
# 279 "lib/parser.ml"
     : (Ast.var list list))

let _menhir_action_02 =
  fun _4 ->
    (
# 56 "lib/parser.mly"
                                                     (_4)
# 287 "lib/parser.ml"
     : (Ast.var list list))

let _menhir_action_03 =
  fun () ->
    (
# 78 "lib/parser.mly"
                        ([])
# 295 "lib/parser.ml"
     : (Ast.agent list))

let _menhir_action_04 =
  fun _2 ->
    (
# 79 "lib/parser.mly"
                                        (_2)
# 303 "lib/parser.ml"
     : (Ast.agent list))

let _menhir_action_05 =
  fun _1 ->
    (
# 74 "lib/parser.mly"
                                  ([Agent(_1)])
# 311 "lib/parser.ml"
     : (Ast.agent list))

let _menhir_action_06 =
  fun _1 _3 ->
    (
# 75 "lib/parser.mly"
                                        (Agent(_1)::_3)
# 319 "lib/parser.ml"
     : (Ast.agent list))

let _menhir_action_07 =
  fun _2 ->
    (
# 46 "lib/parser.mly"
                            (_2)
# 327 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_08 =
  fun _3 ->
    (
# 47 "lib/parser.mly"
                            ( BId(Var _3) )
# 335 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_09 =
  fun _2 ->
    (
# 48 "lib/parser.mly"
                  ( BNeg _2 )
# 343 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_10 =
  fun _1 _3 ->
    (
# 49 "lib/parser.mly"
                            ( BAnd (_1, _3) )
# 351 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_11 =
  fun _1 _3 ->
    (
# 50 "lib/parser.mly"
                            ( BOr (_1, _3) )
# 359 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_12 =
  fun () ->
    (
# 51 "lib/parser.mly"
         (BTrue)
# 367 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_13 =
  fun _2 ->
    (
# 82 "lib/parser.mly"
                          (_2)
# 375 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_14 =
  fun _3 ->
    (
# 83 "lib/parser.mly"
                            ( Id(Var _3) )
# 383 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_15 =
  fun _2 ->
    (
# 84 "lib/parser.mly"
                ( Neg _2 )
# 391 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_16 =
  fun _1 _3 ->
    (
# 85 "lib/parser.mly"
                        ( And (_1, _3) )
# 399 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_17 =
  fun _1 _3 ->
    (
# 86 "lib/parser.mly"
                       ( Neg (And (Neg _1, Neg _3)) )
# 407 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_18 =
  fun _3 _5 ->
    (
# 87 "lib/parser.mly"
                                      ( K (Agent(_3), _5) )
# 415 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_19 =
  fun _3 _5 ->
    (
# 88 "lib/parser.mly"
                                            ( C (_3, _5) )
# 423 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_20 =
  fun _3 _5 ->
    (
# 89 "lib/parser.mly"
                                           ( PA (_3, _5) )
# 431 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_21 =
  fun _3 _5 _7 ->
    (
# 90 "lib/parser.mly"
                                                           ( GA (_3, _5, _7) )
# 439 "lib/parser.ml"
     : (Ast.formula))

let _menhir_action_22 =
  fun _3 ->
    (
# 36 "lib/parser.mly"
                                   ([_3])
# 447 "lib/parser.ml"
     : (Ast.formula list))

let _menhir_action_23 =
  fun _3 _5 ->
    (
# 37 "lib/parser.mly"
                                               (_3 :: _5)
# 455 "lib/parser.ml"
     : (Ast.formula list))

let _menhir_action_24 =
  fun _1 _2 _3 _4 _5 ->
    (
# 33 "lib/parser.mly"
  ( _1, _2, _3, _4, _5 )
# 463 "lib/parser.ml"
     : (Ast.env))

let _menhir_action_25 =
  fun () ->
    (
# 111 "<standard.mly>"
    ( None )
# 471 "lib/parser.ml"
     : (unit option))

let _menhir_action_26 =
  fun x ->
    (
# 114 "<standard.mly>"
    ( Some x )
# 479 "lib/parser.ml"
     : (unit option))

let _menhir_action_27 =
  fun _3 ->
    (
# 40 "lib/parser.mly"
                             (_3)
# 487 "lib/parser.ml"
     : (Ast.var list))

let _menhir_action_28 =
  fun _3 ->
    (
# 43 "lib/parser.mly"
                              (_3)
# 495 "lib/parser.ml"
     : (Ast.bform))

let _menhir_action_29 =
  fun _3 ->
    (
# 63 "lib/parser.mly"
                           (_3)
# 503 "lib/parser.ml"
     : (Ast.var list))

let _menhir_action_30 =
  fun () ->
    (
# 66 "lib/parser.mly"
                      ([])
# 511 "lib/parser.ml"
     : (Ast.var list))

let _menhir_action_31 =
  fun _2 ->
    (
# 67 "lib/parser.mly"
                                    (_2)
# 519 "lib/parser.ml"
     : (Ast.var list))

let _menhir_action_32 =
  fun _1 ->
    (
# 59 "lib/parser.mly"
             ([_1])
# 527 "lib/parser.ml"
     : (Ast.var list list))

let _menhir_action_33 =
  fun _1 _3 ->
    (
# 60 "lib/parser.mly"
                                 (_1 :: _3)
# 535 "lib/parser.ml"
     : (Ast.var list list))

let _menhir_action_34 =
  fun _1 ->
    (
# 70 "lib/parser.mly"
                                         ([Var(_1)])
# 543 "lib/parser.ml"
     : (Ast.var list))

let _menhir_action_35 =
  fun _1 _3 ->
    (
# 71 "lib/parser.mly"
                                         (Var(_1)::_3)
# 551 "lib/parser.ml"
     : (Ast.var list))

let _menhir_print_token : token -> string =
  fun _tok ->
    match _tok with
    | AGENTSDECL ->
        "AGENTSDECL"
    | AND ->
        "AND"
    | C ->
        "C"
    | CHECK ->
        "CHECK"
    | COLON ->
        "COLON"
    | COMMA ->
        "COMMA"
    | Character _ ->
        "Character"
    | EOF ->
        "EOF"
    | GA ->
        "GA"
    | INT _ ->
        "INT"
    | K ->
        "K"
    | LBRACKET ->
        "LBRACKET"
    | LPAREN ->
        "LPAREN"
    | NOT ->
        "NOT"
    | OR ->
        "OR"
    | PA ->
        "PA"
    | RBRACKET ->
        "RBRACKET"
    | RPAREN ->
        "RPAREN"
    | SEMICOLON ->
        "SEMICOLON"
    | STATEDECL ->
        "STATEDECL"
    | STRING _ ->
        "STRING"
    | THETADECL ->
        "THETADECL"
    | TRUE ->
        "TRUE"
    | VAR ->
        "VAR"
    | VARDECL ->
        "VARDECL"

let _menhir_fail : unit -> 'a =
  fun () ->
    Printf.eprintf "Internal failure -- please contact the parser generator's developers.\n%!";
    assert false

include struct
  
  [@@@ocaml.warning "-4-37"]
  
  let _menhir_run_96 : type  ttv_stack. ttv_stack _menhir_cell0_var_declaration _menhir_cell0_theta_declaration _menhir_cell0_agent_declaration _menhir_cell0_state_declaration -> _ -> _menhir_box_main =
    fun _menhir_stack _v ->
      let MenhirCell0_state_declaration (_menhir_stack, _4) = _menhir_stack in
      let MenhirCell0_agent_declaration (_menhir_stack, _3) = _menhir_stack in
      let MenhirCell0_theta_declaration (_menhir_stack, _2) = _menhir_stack in
      let MenhirCell0_var_declaration (_menhir_stack, _1) = _menhir_stack in
      let _5 = _v in
      let _v = _menhir_action_24 _1 _2 _3 _4 _5 in
      MenhirBox_main _v
  
  let rec _menhir_goto_formula_list : type  ttv_stack. ttv_stack -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _v _menhir_s ->
      match _menhir_s with
      | MenhirState43 ->
          _menhir_run_96 _menhir_stack _v
      | MenhirState93 ->
          _menhir_run_94 _menhir_stack _v
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_94 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_CHECK, _menhir_box_main) _menhir_cell1_formula -> _ -> _menhir_box_main =
    fun _menhir_stack _v ->
      let MenhirCell1_formula (_menhir_stack, _, _3) = _menhir_stack in
      let MenhirCell1_CHECK (_menhir_stack, _menhir_s) = _menhir_stack in
      let _5 = _v in
      let _v = _menhir_action_23 _3 _5 in
      _menhir_goto_formula_list _menhir_stack _v _menhir_s
  
  let _menhir_goto_option_SEMICOLON_ : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_CHECK, _menhir_box_main) _menhir_cell1_formula -> _menhir_box_main =
    fun _menhir_stack ->
      let MenhirCell1_formula (_menhir_stack, _, _3) = _menhir_stack in
      let MenhirCell1_CHECK (_menhir_stack, _menhir_s) = _menhir_stack in
      let _v = _menhir_action_22 _3 in
      _menhir_goto_formula_list _menhir_stack _v _menhir_s
  
  let rec _menhir_run_44 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_CHECK (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | COLON ->
          let _menhir_s = MenhirState45 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VAR ->
              _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PA ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOT ->
              _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | LPAREN ->
              _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | K ->
              _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | GA ->
              _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | C ->
              _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_46 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | LPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | STRING _v ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | RPAREN ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  let _3 = _v in
                  let _v = _menhir_action_14 _3 in
                  _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_goto_formula : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState45 ->
          _menhir_run_92 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState89 ->
          _menhir_run_90 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState51 ->
          _menhir_run_88 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState52 ->
          _menhir_run_87 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | MenhirState53 ->
          _menhir_run_85 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState57 ->
          _menhir_run_83 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState80 ->
          _menhir_run_81 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState68 ->
          _menhir_run_79 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState77 ->
          _menhir_run_78 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState75 ->
          _menhir_run_76 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | MenhirState72 ->
          _menhir_run_73 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_92 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_CHECK as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | SEMICOLON ->
          let _menhir_s = MenhirState93 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | CHECK ->
              _menhir_run_44 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | EOF ->
              let x = () in
              let _ = _menhir_action_26 x in
              _menhir_goto_option_SEMICOLON_ _menhir_stack
          | _ ->
              _eRR ())
      | OR ->
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | EOF ->
          let _ = _menhir_action_25 () in
          _menhir_goto_option_SEMICOLON_ _menhir_stack
      | _ ->
          _eRR ()
  
  and _menhir_run_75 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_formula -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState75 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PA ->
          _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | K ->
          _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | GA ->
          _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | C ->
          _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_50 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_PA (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | LPAREN ->
          let _menhir_s = MenhirState51 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VAR ->
              _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PA ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOT ->
              _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | LPAREN ->
              _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | K ->
              _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | GA ->
              _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | C ->
              _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_52 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_NOT (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState52 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PA ->
          _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | K ->
          _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | GA ->
          _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | C ->
          _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_53 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_LPAREN (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState53 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PA ->
          _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | K ->
          _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | GA ->
          _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | C ->
          _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_54 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_K (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | LPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | INT _v ->
              let _menhir_stack = MenhirCell0_INT (_menhir_stack, _v) in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | COMMA ->
                  let _menhir_s = MenhirState57 in
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  (match (_tok : MenhirBasics.token) with
                  | VAR ->
                      _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | PA ->
                      _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | NOT ->
                      _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | LPAREN ->
                      _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | K ->
                      _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | GA ->
                      _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | C ->
                      _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
                  | _ ->
                      _eRR ())
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_58 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_GA (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | LPAREN ->
          let _menhir_s = MenhirState59 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | LBRACKET ->
              _menhir_run_60 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_60 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | RBRACKET ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_03 () in
          _menhir_goto_agentlist _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | INT _v ->
          let _menhir_stack = MenhirCell1_LBRACKET (_menhir_stack, _menhir_s) in
          _menhir_run_62 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState60
      | _ ->
          _eRR ()
  
  and _menhir_goto_agentlist : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState70 ->
          _menhir_run_71 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState59 ->
          _menhir_run_67 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_71 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_C as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_agentlist (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | COMMA ->
          let _menhir_s = MenhirState72 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VAR ->
              _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PA ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOT ->
              _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | LPAREN ->
              _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | K ->
              _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | GA ->
              _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | C ->
              _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_69 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_C (_menhir_stack, _menhir_s) in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | LPAREN ->
          let _menhir_s = MenhirState70 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | LBRACKET ->
              _menhir_run_60 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_67 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_GA as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_agentlist (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | COMMA ->
          let _menhir_s = MenhirState68 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VAR ->
              _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PA ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOT ->
              _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | LPAREN ->
              _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | K ->
              _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | GA ->
              _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | C ->
              _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_62 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | COMMA ->
          let _menhir_stack = MenhirCell1_INT (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState63 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | INT _v ->
              _menhir_run_62 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | RBRACKET ->
          let _1 = _v in
          let _v = _menhir_action_05 _1 in
          _menhir_goto_agentlist_items _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_agentlist_items : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      match _menhir_s with
      | MenhirState60 ->
          _menhir_run_65 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | MenhirState63 ->
          _menhir_run_64 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_65 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_LBRACKET -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_LBRACKET (_menhir_stack, _menhir_s) = _menhir_stack in
      let _2 = _v in
      let _v = _menhir_action_04 _2 in
      _menhir_goto_agentlist _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_64 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_INT -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let MenhirCell1_INT (_menhir_stack, _menhir_s, _1) = _menhir_stack in
      let _3 = _v in
      let _v = _menhir_action_06 _1 _3 in
      _menhir_goto_agentlist_items _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
  
  and _menhir_run_77 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_formula -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState77 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | PA ->
          _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | K ->
          _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | GA ->
          _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | C ->
          _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_90 : type  ttv_stack. (((ttv_stack, _menhir_box_main) _menhir_cell1_PA, _menhir_box_main) _menhir_cell1_formula as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | RPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_formula (_menhir_stack, _, _3) = _menhir_stack in
          let MenhirCell1_PA (_menhir_stack, _menhir_s) = _menhir_stack in
          let _5 = _v in
          let _v = _menhir_action_20 _3 _5 in
          _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OR ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_88 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_PA as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | OR ->
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | COMMA ->
          let _menhir_s = MenhirState89 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VAR ->
              _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PA ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOT ->
              _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | LPAREN ->
              _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | K ->
              _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | GA ->
              _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | C ->
              _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | AND ->
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_87 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_NOT -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let MenhirCell1_NOT (_menhir_stack, _menhir_s) = _menhir_stack in
      let _2 = _v in
      let _v = _menhir_action_15 _2 in
      _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_85 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_LPAREN as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | RPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_LPAREN (_menhir_stack, _menhir_s) = _menhir_stack in
          let _2 = _v in
          let _v = _menhir_action_13 _2 in
          _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OR ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_83 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_K _menhir_cell0_INT as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | RPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell0_INT (_menhir_stack, _3) = _menhir_stack in
          let MenhirCell1_K (_menhir_stack, _menhir_s) = _menhir_stack in
          let _5 = _v in
          let _v = _menhir_action_18 _3 _5 in
          _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OR ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_81 : type  ttv_stack. ((((ttv_stack, _menhir_box_main) _menhir_cell1_GA, _menhir_box_main) _menhir_cell1_agentlist, _menhir_box_main) _menhir_cell1_formula as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | RPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_formula (_menhir_stack, _, _5) = _menhir_stack in
          let MenhirCell1_agentlist (_menhir_stack, _, _3) = _menhir_stack in
          let MenhirCell1_GA (_menhir_stack, _menhir_s) = _menhir_stack in
          let _7 = _v in
          let _v = _menhir_action_21 _3 _5 _7 in
          _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OR ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_79 : type  ttv_stack. (((ttv_stack, _menhir_box_main) _menhir_cell1_GA, _menhir_box_main) _menhir_cell1_agentlist as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
      match (_tok : MenhirBasics.token) with
      | OR ->
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | COMMA ->
          let _menhir_s = MenhirState80 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | VAR ->
              _menhir_run_46 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | PA ->
              _menhir_run_50 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | NOT ->
              _menhir_run_52 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | LPAREN ->
              _menhir_run_53 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | K ->
              _menhir_run_54 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | GA ->
              _menhir_run_58 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | C ->
              _menhir_run_69 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | AND ->
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_78 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_formula as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OR ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND | COMMA | EOF | RPAREN | SEMICOLON ->
          let MenhirCell1_formula (_menhir_stack, _menhir_s, _1) = _menhir_stack in
          let _3 = _v in
          let _v = _menhir_action_16 _1 _3 in
          _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_76 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_formula -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let MenhirCell1_formula (_menhir_stack, _menhir_s, _1) = _menhir_stack in
      let _3 = _v in
      let _v = _menhir_action_17 _1 _3 in
      _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_73 : type  ttv_stack. (((ttv_stack, _menhir_box_main) _menhir_cell1_C, _menhir_box_main) _menhir_cell1_agentlist as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | RPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_agentlist (_menhir_stack, _, _3) = _menhir_stack in
          let MenhirCell1_C (_menhir_stack, _menhir_s) = _menhir_stack in
          let _5 = _v in
          let _v = _menhir_action_19 _3 _5 in
          _menhir_goto_formula _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OR ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_75 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_formula (_menhir_stack, _menhir_s, _v) in
          _menhir_run_77 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  let _menhir_run_42 : type  ttv_stack. ttv_stack _menhir_cell0_var_declaration _menhir_cell0_theta_declaration _menhir_cell0_agent_declaration -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let _3 = _v in
      let _v = _menhir_action_27 _3 in
      let _menhir_stack = MenhirCell0_state_declaration (_menhir_stack, _v) in
      match (_tok : MenhirBasics.token) with
      | CHECK ->
          _menhir_run_44 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState43
      | _ ->
          _eRR ()
  
  let rec _menhir_run_03 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | STRING _v ->
          let _menhir_stack = MenhirCell1_LBRACKET (_menhir_stack, _menhir_s) in
          _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer _v MenhirState03
      | RBRACKET ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let _v = _menhir_action_30 () in
          _menhir_goto_var_list _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_04 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | COMMA ->
          let _menhir_stack = MenhirCell1_STRING (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState05 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | STRING _v ->
              _menhir_run_04 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
          | _ ->
              _eRR ())
      | RBRACKET ->
          let _1 = _v in
          let _v = _menhir_action_34 _1 in
          _menhir_goto_varlist_items _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_varlist_items : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      match _menhir_s with
      | MenhirState03 ->
          _menhir_run_08 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | MenhirState05 ->
          _menhir_run_06 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_08 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_LBRACKET -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let MenhirCell1_LBRACKET (_menhir_stack, _menhir_s) = _menhir_stack in
      let _2 = _v in
      let _v = _menhir_action_31 _2 in
      _menhir_goto_var_list _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_goto_var_list : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState41 ->
          _menhir_run_42 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | MenhirState37 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState32 ->
          _menhir_run_36 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState02 ->
          _menhir_run_10 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_36 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | COMMA ->
          let _menhir_stack = MenhirCell1_var_list (_menhir_stack, _menhir_s, _v) in
          let _menhir_s = MenhirState37 in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | LBRACKET ->
              _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
          | _ ->
              _eRR ())
      | RBRACKET ->
          let _1 = _v in
          let _v = _menhir_action_32 _1 in
          _menhir_goto_var_list_list _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_goto_var_list_list : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s ->
      match _menhir_s with
      | MenhirState37 ->
          _menhir_run_38 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | MenhirState32 ->
          _menhir_run_34 _menhir_stack _menhir_lexbuf _menhir_lexer _v
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_38 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_var_list -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let MenhirCell1_var_list (_menhir_stack, _menhir_s, _1) = _menhir_stack in
      let _3 = _v in
      let _v = _menhir_action_33 _1 _3 in
      _menhir_goto_var_list_list _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
  
  and _menhir_run_34 : type  ttv_stack. ttv_stack _menhir_cell0_var_declaration _menhir_cell0_theta_declaration -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _4 = _v in
      let _v = _menhir_action_02 _4 in
      _menhir_goto_agent_declaration _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
  
  and _menhir_goto_agent_declaration : type  ttv_stack. ttv_stack _menhir_cell0_var_declaration _menhir_cell0_theta_declaration -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let _menhir_stack = MenhirCell0_agent_declaration (_menhir_stack, _v) in
      match (_tok : MenhirBasics.token) with
      | STATEDECL ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | COLON ->
              let _menhir_s = MenhirState41 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | LBRACKET ->
                  _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_10 : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let _3 = _v in
      let _v = _menhir_action_29 _3 in
      let _menhir_stack = MenhirCell0_var_declaration (_menhir_stack, _v) in
      match (_tok : MenhirBasics.token) with
      | THETADECL ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | COLON ->
              let _menhir_s = MenhirState13 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | VAR ->
                  _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | TRUE ->
                  _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | NOT ->
                  _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | LPAREN ->
                  _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_14 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | LPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | STRING _v ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | RPAREN ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  let _3 = _v in
                  let _v = _menhir_action_08 _3 in
                  _menhir_goto_bool_form _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_goto_bool_form : type  ttv_stack. ttv_stack -> _ -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match _menhir_s with
      | MenhirState13 ->
          _menhir_run_28 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState19 ->
          _menhir_run_27 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | MenhirState25 ->
          _menhir_run_26 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | MenhirState23 ->
          _menhir_run_24 _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
      | MenhirState20 ->
          _menhir_run_21 _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _menhir_fail ()
  
  and _menhir_run_28 : type  ttv_stack. (ttv_stack _menhir_cell0_var_declaration as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OR ->
          let _menhir_stack = MenhirCell1_bool_form (_menhir_stack, _menhir_s, _v) in
          _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_bool_form (_menhir_stack, _menhir_s, _v) in
          _menhir_run_25 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AGENTSDECL ->
          let _3 = _v in
          let _v = _menhir_action_28 _3 in
          let _menhir_stack = MenhirCell0_theta_declaration (_menhir_stack, _v) in
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | COLON ->
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | LBRACKET ->
                  let _tok = _menhir_lexer _menhir_lexbuf in
                  (match (_tok : MenhirBasics.token) with
                  | RBRACKET ->
                      let _tok = _menhir_lexer _menhir_lexbuf in
                      let _v = _menhir_action_01 () in
                      _menhir_goto_agent_declaration _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok
                  | LBRACKET ->
                      _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer MenhirState32
                  | _ ->
                      _eRR ())
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
  and _menhir_run_23 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_bool_form -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState23 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | TRUE ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_18 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      let _v = _menhir_action_12 () in
      _menhir_goto_bool_form _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_19 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_NOT (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState19 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | TRUE ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_20 : type  ttv_stack. ttv_stack -> _ -> _ -> (ttv_stack, _menhir_box_main) _menhir_state -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s ->
      let _menhir_stack = MenhirCell1_LPAREN (_menhir_stack, _menhir_s) in
      let _menhir_s = MenhirState20 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | TRUE ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_25 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_bool_form -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _menhir_s = MenhirState25 in
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VAR ->
          _menhir_run_14 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | TRUE ->
          _menhir_run_18 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | NOT ->
          _menhir_run_19 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | LPAREN ->
          _menhir_run_20 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
      | _ ->
          _eRR ()
  
  and _menhir_run_27 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_NOT -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let MenhirCell1_NOT (_menhir_stack, _menhir_s) = _menhir_stack in
      let _2 = _v in
      let _v = _menhir_action_09 _2 in
      _menhir_goto_bool_form _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_26 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_bool_form as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | OR ->
          let _menhir_stack = MenhirCell1_bool_form (_menhir_stack, _menhir_s, _v) in
          _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AGENTSDECL | AND | RPAREN ->
          let MenhirCell1_bool_form (_menhir_stack, _menhir_s, _1) = _menhir_stack in
          let _3 = _v in
          let _v = _menhir_action_10 _1 _3 in
          _menhir_goto_bool_form _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | _ ->
          _eRR ()
  
  and _menhir_run_24 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_bool_form -> _ -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _tok ->
      let MenhirCell1_bool_form (_menhir_stack, _menhir_s, _1) = _menhir_stack in
      let _3 = _v in
      let _v = _menhir_action_11 _1 _3 in
      _menhir_goto_bool_form _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
  
  and _menhir_run_21 : type  ttv_stack. ((ttv_stack, _menhir_box_main) _menhir_cell1_LPAREN as 'stack) -> _ -> _ -> _ -> ('stack, _menhir_box_main) _menhir_state -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok ->
      match (_tok : MenhirBasics.token) with
      | RPAREN ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          let MenhirCell1_LPAREN (_menhir_stack, _menhir_s) = _menhir_stack in
          let _2 = _v in
          let _v = _menhir_action_07 _2 in
          _menhir_goto_bool_form _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s _tok
      | OR ->
          let _menhir_stack = MenhirCell1_bool_form (_menhir_stack, _menhir_s, _v) in
          _menhir_run_23 _menhir_stack _menhir_lexbuf _menhir_lexer
      | AND ->
          let _menhir_stack = MenhirCell1_bool_form (_menhir_stack, _menhir_s, _v) in
          _menhir_run_25 _menhir_stack _menhir_lexbuf _menhir_lexer
      | _ ->
          _eRR ()
  
  and _menhir_run_06 : type  ttv_stack. (ttv_stack, _menhir_box_main) _menhir_cell1_STRING -> _ -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer _v ->
      let MenhirCell1_STRING (_menhir_stack, _menhir_s, _1) = _menhir_stack in
      let _3 = _v in
      let _v = _menhir_action_35 _1 _3 in
      _menhir_goto_varlist_items _menhir_stack _menhir_lexbuf _menhir_lexer _v _menhir_s
  
  let _menhir_run_00 : type  ttv_stack. ttv_stack -> _ -> _ -> _menhir_box_main =
    fun _menhir_stack _menhir_lexbuf _menhir_lexer ->
      let _tok = _menhir_lexer _menhir_lexbuf in
      match (_tok : MenhirBasics.token) with
      | VARDECL ->
          let _tok = _menhir_lexer _menhir_lexbuf in
          (match (_tok : MenhirBasics.token) with
          | COLON ->
              let _menhir_s = MenhirState02 in
              let _tok = _menhir_lexer _menhir_lexbuf in
              (match (_tok : MenhirBasics.token) with
              | LBRACKET ->
                  _menhir_run_03 _menhir_stack _menhir_lexbuf _menhir_lexer _menhir_s
              | _ ->
                  _eRR ())
          | _ ->
              _eRR ())
      | _ ->
          _eRR ()
  
end

let main =
  fun _menhir_lexer _menhir_lexbuf ->
    let _menhir_stack = () in
    let MenhirBox_main v = _menhir_run_00 _menhir_stack _menhir_lexbuf _menhir_lexer in
    v
