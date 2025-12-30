## Characterization of substructures using diagram

(from StackExchange)

The intuition for embeddings is similar to the one you described for elementary embeddings, once you realise that being an embeddings is captured by atomic formulae and their negations. In particular, the following are equivalent:

(I will write $M$ and $N$ for the domains as well, as generally no ambiguity arises. I will also identify the constants in $L(M)$ coming from $M$ with the actual elements from $M$.)

 1. $M \subseteq N$, so $M$ is a substructure of $N$;
 2. for every atomic formula $\varphi(x_1, \ldots, x_n)$ in $L$ and any $a_1, \ldots, a_n \in M$ we have $M \models \varphi(a_1, \ldots, a_n) \Longleftrightarrow N \models \varphi(a_1, \ldots, a_n)$;
 3. $N_M \models diag(M)$.

So $M \subseteq N$ says precisely that $N$ satisfies exactly the same atomic $L(M)$-formulae (i.e., $L$-formulae with elements from $M$ in place of the free variables), which is exactly saying that $N_M \models diag(M)$.