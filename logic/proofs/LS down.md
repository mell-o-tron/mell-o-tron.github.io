Provided that we enlarge $A$, we can assume that $|L| \leq |A| = k$. We will define an increasing sequence of sets:
$$A = A_0 \subseteq A_1 \subseteq A_2 \subseteq...$$
such that $A_{i+1}$ contains the *witnesses* of the existential formulae with parameters in $A_i$.

The [Tarski-Vaught criterion](./proof.html?theorem=tarski%20vaught) guarantees that $M = \bigcup_{i \in \mathbb N} A_i \preceq N$. Finally, we will determine that $|M| = |A|$.

Formally, for every $L$-formula $\varphi(x, y_1, ..., y_k)$ and every $b_1, ..., b_k \in A_i$, we consider the set:
$$\{a \in N \mid N \models \varphi(a, b_1, ..., b_k)\}$$
and define $A_{i+1}$ as $A_i$ unioned with this set.

As for cardinality, it suffices to show: $$\forall i. |A_i| \leq |A|$$
I know nothing about set theory, but I think this is because it forces all cardinalities $|A_i|$ to be equal to $|A| = |A_0|$.

This can be shown by induction:

- $|A_0| \leq |A_0| = A$
- $|A_{i+1}| \leq$ (# combinations of formulae and tuples of elements of $A_i$) $=\sum_{j \in \mathbb N}|A_i^j| \cdot |L\text{-formulae}|$. Therefore:
$$\begin{align}|A_{i+1}| &\leq \sum_{j \in \mathbb N}|A_i^j| \cdot |L\text{-formulae}| \\ &=\aleph_0 \cdot |A_i| \cdot (\aleph_0 + |L|) = |A_i|\end{align}$$
It is left as an exercise for those who have followed ETI that there are $(\aleph_0 + |L|)$ $L$-formulae.

*QED*