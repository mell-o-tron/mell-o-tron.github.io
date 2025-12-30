For **point 1**, we expand $L$ by adding $k$ constants $c_i$ with $i \in k$. The theory:
$$T' = T \cup \{\neg c_i = c_j \mid i, j \in k \wedge i \neq j\}$$
is finitely consistent because:

- $T$ is consistent by hp (it has models)
- Every subtheory of $T'$ has a model (just take one with enough distinct elements -- it exists by hp)

Therefore, as a consequence of the [compactness theorem](proof.html?theorem=semantic%20compactness), $T'$ is consistent, i.e., it has a model that necessarily has cardinality $\geq k$ since the $k$ constants must be interpreted in as many distinct elements.

-----

For **point 2**, point 1 applies to $ED(M)$. I therefore define:

$$T' = ED(M) \cup \{\neg c_i = c_j \mid i, j \in k \wedge i \neq j\}$$

This is finitely consistent because $M_M$ is a model of every finite subtheory of itself (interpreting the $c_i$ with distinct elements of the domain). Consequently, it has a model $N$:
$$\begin{align}&N \models ED(M)  \cup \{\neg c_i = c_j \mid i, j \in k \wedge i \neq j\} \\& \implies N  \models ED(M) \\&\implies N_M \models ED(M)\end{align}$$
Consequently, by [this observation](./def.html?definition=ED%20and%20substructures#osservazione), we have $M \preceq N$.

As for the cardinality of $N$, it is at least $k$ because $N$ has at least $k$ distinct constant symbols.

*QED*