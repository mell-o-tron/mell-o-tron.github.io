## Ultraproduct

Let $L = (R, F)$ and $\{M_i\}_{i \in I}$ be a family of $L$-structures $M_i = (D_i, ...)$ indexed by $I$.

Given an ultrafilter $U$ on $\mathcal P(I)$, we define

$$\prod_{i \in I} M_i /U$$

as the $L$-structure with domain $$\prod_{i \in I} D_i /\sim$$
(i.e., the set of sequences $(a_1, a_2, a_3, ...) \in D_1 \times D_2 \times D_3 \times...$), where:
$$a \sim_U b \iff \{i \in I \mid a_i = b_i\} \in U$$
i.e., if the set of $i$ such that $a_i = b_i$ is a "majority" according to $U$.

#### Interpretation of relations and functions

Relations and functions are interpreted pointwise:

$$([a_1] ... [a_k]) \in r/U \overset\triangle\iff \{i \in I \mid (a_{1i} ... a_{ki}) \in r_{M_i}\} \in U$$
$$f/U([a_1], ... , [a_k]) \triangleq [\{f_{M_i}(a_{1i}, ..., a_{ki})\}_{i \in I}]$$

#### Well-definedness

One must check well definition [...]