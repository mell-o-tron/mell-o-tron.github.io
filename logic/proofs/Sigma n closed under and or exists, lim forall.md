The proof is by mutual induction between the two propositions.

- It is obvious that $\varphi_n \in \Sigma_n$ is closed for $\exists$ [and $\Pi_n$ for $\forall$].
- $\Sigma_{n+1}$ closed for $\wedge$:
$$\exists x_1...x_m \underbrace{\psi}_{\Pi_{n}}$$
$$\exists y_1...y_n \underbrace{\theta}_{\Pi_{n}}$$
This corresponds to:
$$\exists x_1...x_m, y_1...y_n (\underbrace{\psi \wedge \theta}_{\Pi_n \text{ per hp. ind}})$$
- Similarly, the proof is done for $\vee$.
-  $\Sigma_{n+1}$ closed for $\forall y \leq x$:

Let $$\forall x \leq x . \exists z_1 ... \exists z_k . \underbrace{\psi}_{\Pi_n}$$

If this is true, we can identify an upper bound $b$ of the values of $z_i$, and therefore we can rewrite the formula in an equivalent way:
$$\exists b . \underbrace{\forall y \leq x. \exists z_1 \leq b ... \exists z_k \leq b . \psi}_{\Pi_n \text{by hp. ind.}}$$

QED.