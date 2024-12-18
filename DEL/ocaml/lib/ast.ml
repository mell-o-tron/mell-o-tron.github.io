(* Abstract Syntax Tree: ast.ml *)

type var = Var of string [@@deriving show]
type agent = Agent of int [@@deriving show]

(* Syntax of bform *)
type bform =
  | BTrue
  | BId of var
  | BNeg of bform
  | BAnd of bform * bform
  | BOr of bform * bform
[@@deriving show]

(* V, theta, O_i *)
type ks = var list * bform * var list list [@@deriving show]
type state = var list [@@deriving show]

(* Syntax of DEL *)
type formula =
  | Id of var
  | Neg of formula
  | And of formula * formula
  | K of agent * formula
  | C of agent list * formula
  | PA of formula * formula
  | GA of agent list * formula * formula
[@@deriving show]

type env = var list * bform * var list list * var list * formula list
[@@deriving show]
