
%{
  open Ast (* Define the abstract syntax tree in Ast.ml *)
%}

%token TRUE NOT VAR AND OR K C PA GA LPAREN RPAREN LBRACKET RBRACKET COMMA COLON SEMICOLON EOF
%token VARDECL THETADECL AGENTSDECL STATEDECL CHECK
%token <string> STRING
%token <int> INT
%token <char> Character

%left AND
%left OR
%nonassoc NOT

%start <Ast.env> main
%type <Ast.formula> formula
%type <Ast.formula list> formula_list
%type <agent list> agentlist
%type <agent list> agentlist_items
%type <var list> var_declaration
%type <var list> var_list
%type <var list> varlist_items
%type <var list list> agent_declaration
%type <var list list> var_list_list
%type <var list> state_declaration
%type <bform> theta_declaration
%type <bform> bool_form
%%

main:
  | var_declaration theta_declaration agent_declaration state_declaration formula_list EOF 
  { $1, $2, $3, $4, $5 }
  
formula_list:
  | CHECK COLON formula SEMICOLON? {[$3]}
  | CHECK COLON formula SEMICOLON formula_list {$3 :: $5}
  
state_declaration:
  | STATEDECL COLON var_list {$3}
  
theta_declaration:
  | THETADECL COLON bool_form {$3}
  
bool_form:
  | LPAREN bool_form RPAREN {$2}
  | VAR LPAREN STRING RPAREN{ BId(Var $3) }
  | NOT bool_form { BNeg $2 }
  | bool_form AND bool_form { BAnd ($1, $3) }
  | bool_form OR bool_form  { BOr ($1, $3) }
  | TRUE {BTrue}
  
  
agent_declaration:
  | AGENTSDECL COLON LBRACKET RBRACKET {[]}  
  | AGENTSDECL COLON LBRACKET var_list_list RBRACKET {$4}  

var_list_list:
  | var_list {[$1]}
  | var_list COMMA var_list_list {$1 :: $3}
    
var_declaration:
  | VARDECL COLON var_list {$3}

var_list:
  | LBRACKET RBRACKET {[]}
  | LBRACKET varlist_items RBRACKET {$2}
  
varlist_items:
  | STRING                               {[Var($1)]}
  | STRING COMMA varlist_items           {Var($1)::$3}

agentlist_items:
  | INT                           {[Agent($1)]}
  | INT COMMA agentlist_items           {Agent($1)::$3}

agentlist:
  | LBRACKET RBRACKET   {[]}
  | LBRACKET agentlist_items RBRACKET   {$2}
  
formula:
  | LPAREN formula RPAREN {$2}
  | VAR LPAREN STRING RPAREN{ Id(Var $3) }
  | NOT formula { Neg $2 }
  | formula AND formula { And ($1, $3) }
  | formula OR formula { Neg (And (Neg $1, Neg $3)) }
  | K LPAREN INT COMMA formula RPAREN { K (Agent($3), $5) }
  | C LPAREN agentlist COMMA formula RPAREN { C ($3, $5) }
  | PA LPAREN formula COMMA formula RPAREN { PA ($3, $5) }
  | GA LPAREN agentlist COMMA formula COMMA formula RPAREN { GA ($3, $5, $7) }
