# Bureaucracy and theories

## Bureaucracy

### Language

A first-order language is a pair of disjoint sets $(R, F)$, respectively of relation symbols and function symbols, each with its own arity.

### $L$-Term

Given a language $L$, a term is a string in the alphabet $F \sqcup \{x_0, x_1, ...\} \sqcup \{(, ), \texttt{,}\}$. In particular:

- A variable $x_i$ is a term
- $f(x_1, ..., x_k)$ with $f$ a function is a term.

### Formula

Atomic formulae:

- $\top, \bot$
- $r(t_1 ... t_k)$ with $r$ a relation symbol
- $t_1 = t_2$

Formulae:

- Atomic formula
- $\neg \varphi$
- and/or/... of formulae
- quantified formulae.

### Structure

An $L$-structure is a pair $M = (D ; i)$, where $D$ is the domain of the formula, and $i$ is an interpretation function that maps relation symbols to relations and function symbols to functions.

### Valuation, substitution in a valuation

A valuation of the variables is a function $v : Var \to D$. We write $v[a / x_n]$ to indicate the valuation $v'$ that behaves like $v$ on all variables except $x_n$, which it interprets as $a$.

### Tarski semantics

The obvious semantics that defines the satisfaction relation for Formulae:
$$M \models \{v\}\varphi$$
meaning: $M$ satisfies $\varphi$ with valuation $v$.

### Substitutability, substitution in a formula

[...]

## Theories

An $L$-theory is a set of $L$-Formulae. We say that $M$ is a model of $T$:
$$M \models T \overset \triangle\iff \forall \varphi \in T . M\models \varphi$$

We say that a formula $\varphi$ is a logical consequence of a theory if it is valid in every model:

$$T \models \varphi \overset \triangle \iff \forall M . M \models T \implies M \models \varphi$$

### Logically valid formula

A formula is said to be logically valid if it follows from the empty premises:
$$\emptyset \models \varphi$$

### Consistent theory

A theory is said to be consistent $\overset \triangle \iff$ it has at least one model. Equivalently, $T$ is consistent $\iff T \not \models \bot$.

### Complete theory

A theory is said to be complete $\overset \triangle \iff$ for every $L$-closed formula $\varphi$ vale $T \models \varphi$ oppure $T \models \neg\varphi$.

A complete theory is automatically consistent.

### Complete theory of a structure

Let $M$ be an $L$-structure. The set of all closed formulae true in $M$:
$$Th(M) \triangleq \{\varphi \text{ closed} \mid M \models \varphi\}$$
is called the **complete theory of $M$**.

### Axiomatizable theory

A class $C$ of $L$-structures is **axiomatizable** if there exists an $L$-theory such that:
$$M \in C \iff M \models T$$
If $T$ is finite, we say that $C$ is **finitely axiomatizable**.