Suppose, for the sake of contradiction, that there exists a theory $T$ such that $T \models M \iff M = (D ; <)$ is a well-order.

Then, by the consequence of the [compactness theorem](./proof.html?theorem=semantic%20compactness), $$T' = T \cup \{c_2 < c_1, c_3 < c_2, ...\}$$ is a consistent theory in the language:
$$L' = L \cup \{c_1, c_2, c_3, ...\}$$
since for every finite subtheory of $T$ we obtain a model (e.g. $\mathbb N$) by interpreting the $c_i$ as elements of a sufficiently long finite chain.

Consequently, $T'$ is consistent, with a model $M$. Restricting the interpretation to the language without the constants, we should have:
$$M_{|L} \models T$$
But this cannot be true because $M$ has an infinite descending chain.

*QED*