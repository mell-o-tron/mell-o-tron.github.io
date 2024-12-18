open Parser

let digit = [%sedlex.regexp? '0' .. '9']
let hexNumber = [%sedlex.regexp? Plus hex_digit]
let number = [%sedlex.regexp? Plus digit | "0x", hexNumber]
let character = [%sedlex.regexp? 0x20 .. 0x7E]
let quoted_string = [%sedlex.regexp? '"', Star (Compl (Chars "\"")), '"']

let rec token lexbuf =
  match%sedlex lexbuf with
  | "$" -> VAR
  | "!" -> NOT
  | "/\\" -> AND
  | "\\/" -> OR
  | "true" -> TRUE
  | "K" -> K
  | "C" -> C
  | "PA" -> PA
  | "GA" -> GA
  | "VARS" -> VARDECL
  | "THETA" -> THETADECL
  | "AGENTS" -> AGENTSDECL
  | "STATE" -> STATEDECL
  | "CHECK" -> CHECK
  | "(" -> LPAREN
  | ")" -> RPAREN
  | "[" -> LBRACKET
  | "]" -> RBRACKET
  | ":" -> COLON
  | ";" -> SEMICOLON
  | "'" -> char lexbuf
  | white_space -> token lexbuf
  | "," -> COMMA
  | number -> INT (int_of_string (Sedlexing.Latin1.lexeme lexbuf))
  | quoted_string ->
      let lexeme = Sedlexing.Latin1.lexeme lexbuf in
      let content = String.sub lexeme 1 (String.length lexeme - 2) in
      STRING content
  | "**" -> comment lexbuf
  | eof -> EOF
  | any ->
      failwith
        (Printf.sprintf "Unrecognised character: \'%s\'"
           (Sedlexing.Latin1.lexeme lexbuf))
  | _ -> failwith "Impossible!"

and comment lexbuf =
  match%sedlex lexbuf with
  | "**" -> token lexbuf
  | "\n" -> token lexbuf
  | eof -> EOF
  | any -> comment lexbuf
  | _ -> failwith "Impossible!"

and char lexbuf =
  match%sedlex lexbuf with
  | character, "'" -> Character (Sedlexing.Latin1.lexeme lexbuf).[0]
  | _ -> failwith "Character not closed by a quote!"

let tokenize (lexbuf : Sedlexing.lexbuf) = token lexbuf
