### Elementary diagram

Let $M = (D_i; ...)$ be an $L$-structure. $L(M)$ is the language $L$ expanded with a constant $c_i$ for each $i \in D$. We can see $M$ as an $L(M)$-structure $M_M$ by interpreting each $c_i$ with $i$.

- The **elementary diagram** of $M$, denoted as $ED(M)$, is the $L(M)$-theory $Th(M_M)$, i.e. the set of all valid formulae in $M_M$.

> Note that this theory also contains the formulae that "mention" specific elements of $M$, as opposed to $Th(M)$.

- The **atomic diagram** of $M$, denoted $diag(M)$, is the set of $L(M)$-atomic formulae or their negations that are valid in $M_M$.

### Substructure

Let $N = (D, i)$ be an $L$-structure, and $C \subseteq D$ a subset of its domain. If for every function symbol $f$ in $L$ it holds that:
$$f_N [C^{ar(f)}] \subseteq C$$
i.e., $C$ is closed under the operation $f$ (the codomain of $f$ is in $C$), then:
$$M = (C ; i_{|C})$$
is called a **substructure** of $N$, denoted $M \subseteq N$. The restriction $i_{|C}$ is obtained by restricting the domain of functions and relations.

If, moreover, for every $L$-formula $\\varphi(x_1, ..., x_k)$ it holds that:
$$\\forall a_1, ..., a_k \in C . M \\models\\varphi(a_1, ..., a_k) \\iff N \\models\\varphi(a_1, ..., a_k)$$
(i.e., the structure and the substructure satisfy the same formulae), then $M$ is an **elementary substructure** of $N$.

If $M$ is a (elementary) substructure of $N$, $N$ is called a (elementary) **extension** of $M$.

#### Notation

Let the domain of $M$ be $\\subseteq$ the domain of $N$. $N_M$ is $N$ with the elements of the domain of $M$ added as constants, interpreting $c_i$ as $i$.

#### Remark

Let $M = (C; ...)$ and $N = (D; ...)$ with $C \\subseteq D$. The $L$-structure $N$ can be seen as an $L(M)$-structure $N_M$ by interpreting $c_i$ as $i$. The following hold:

- $M \\subseteq N \\iff N_M \\models diag(M)$
- $M \\preceq N \\iff N_M \\models ED(M)$

([Proof](./proof.html?theorem=diag%20and%20substructure))
