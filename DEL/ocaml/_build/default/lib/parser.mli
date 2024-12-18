
(* The type of tokens. *)

type token = 
  | VARDECL
  | VAR
  | TRUE
  | THETADECL
  | STRING of (string)
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
  | INT of (int)
  | GA
  | EOF
  | Character of (char)
  | COMMA
  | COLON
  | CHECK
  | C
  | AND
  | AGENTSDECL

(* This exception is raised by the monolithic API functions. *)

exception Error

(* The monolithic API. *)

val main: (Lexing.lexbuf -> token) -> Lexing.lexbuf -> (Ast.env)
