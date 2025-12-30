**Proof.**

We will treat the equality symbol as a binary relation symbol, so we do not need to have a special case for it. The details can become a bit tedious, which is probably why they are often omitted. It is best to try to reproduce them yourself as well.

(1) $\Rightarrow$ (2). The interpretation functions of $M$ and $N$ agree on elements of $M$, and so terms that are built using elements from $M$ agree in both $M$ and $N$. So all we need to prove is that for elements $a_1, \ldots, a_n \in M$ and any relation symbol $R(x_1, \ldots, x_n)$ we have $M \models R(a_1, \ldots, a_n)$ iff $N \models R(a_1, \ldots, a_n)$, but this follows again because the interpretation function for both $M$ and $N$ agrees on $M$.

(2) $\Rightarrow$ (1). Let $f(x_1, \ldots, x_n)$ be an $n$-ary function symbol. Let $a_1, \ldots, a_n \in M$ and let $b$ be the interpretation of $f(a_1, \ldots, a_n)$ in $M$. Then $M \models f(a_1, \ldots, a_n) = b$ and so $N \models f(a_1, \ldots, a_n) = b$. So $M$ and $N$ agree on interpretations of function symbols and hence on interpretations of terms (if you worry about constant symbols: either view them as $0$-ary function symbols or run the above argument again without any 'input' for the 'function'). Similarly, we have for any relation symbol $R(x_1, \ldots, x_n)$ and any $a_1, \ldots, a_n \in M$ that $M \models R(a_1, \ldots, a_n)$ iff $N \models R(a_1, \ldots, a_n)$, showing that $M$ and $N$ agree on the interpretation of all relation symbols. We thus conclude that $M$ is a substructure of $N$.

(2) $\Rightarrow$ (3). Let $\varphi(x_1, \ldots, x_n)$ an atomic $L$-formula and $a_1, \ldots, a_n \in M$. If $\varphi(a_1, \ldots, a_n) \in diag(M)$ then $M \models \varphi(a_1, \ldots, a_n)$, and so $N \models \varphi(a_1, \ldots, a_n)$. Similarly, if $\neg \varphi(a_1, \ldots, a_n) \in diag(M)$ then $M \not \models \varphi(a_1, \ldots, a_n)$, and so $N \not \models \varphi(a_1, \ldots, a_n)$ and thus $N \models \neg \varphi(a_1, \ldots, a_n)$. We conclude that $N \models diag(M)$.

(3) $\Rightarrow$ (2). Let $\varphi(x_1, \ldots, x_n)$ an atomic $L$-formula and $a_1, \ldots, a_n \in M$. If $M \models \varphi(a_1, \ldots, a_n)$ then $\varphi(a_1, \ldots, a_n) \in diag(M)$ and so $N \models \varphi(a_1, \ldots, a_n)$. If $M \not \models \varphi(a_1, \ldots, a_n)$ then $\neg \varphi(a_1, \ldots, a_n) \in diag(M)$ and so $N \not \models \varphi(a_1, \ldots, a_n)$, which is the contrapositive of $N \models \varphi(a_1, \ldots, a_n) \implies M \models \varphi(a_1, \ldots, a_n)$.

----------

Note that (1)-(3) are further equivalent to replacing "atomic" by "quantifier-free" in 2 (and so, $diag(M)$ could equivalently be defined as the set of all quantifier-free $L(M)$-formulae satisfied by $M_M$).

----------

Another note, since you initially forgot to include negations of atomic formulae in $diag(M)$. The above proof makes very explicit where these negations are needed. The notion of a diagram of only atomic formulae, sometimes call the *positive (atomic) diagram*, makes sense as well. Models of such a diagram correspond to homomorphisms of structures.
