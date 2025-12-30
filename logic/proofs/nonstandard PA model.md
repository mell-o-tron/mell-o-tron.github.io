Let us prove a stronger proposition: “There exist models of $Th(\mathbb N ; 0, +, \cdot, s)$ that are not isomorphic to $\mathbb N$.”

Recall: the complete theory of a model consists of all formulas that are true for that model.


### Proof with ultraproducts

Let $U$ be a non-principal ultrafilters on $\mathcal P(\mathbb N)$. Consider the [ultraproduct](./def.html?definition=ultraproduct):
$$^*\mathbb N = \prod_{i \in N} \mathbb N / U$$
of a countable number of copies of $(\mathbb N ; 0, +, \cdot, s)$.

Suppose, by contradiction, that $f: \mathbb N \to ^*\mathbb N$ is an isomorphism:

- $f(0_\mathbb N) = 0_{^*\mathbb N} = [0,0,0,...]$
- $f(s_{\mathbb N}(0_\mathbb N)) = s_{^*\mathbb{N}}(f(0_{\mathbb N})) = [1,1,1,...]$
- In general, $f(n) = [n,n,n,...]$

Let $\sigma$ be a sequence such that $\sigma_i = i$, i.e. $[1,2,3,4,5,...]$. I will show that this is not equal to any constant sequence, and therefore that $f$ is not surjective.

$$\{i \in \mathbb N \mid [1,2,3,...]_i = [n,n,n,...]_i\} = \{n\} \notin U$$

Therefore, for every $n$, $[1,2,3,4,...] \not \sim [n, n,...]$.

*QED*