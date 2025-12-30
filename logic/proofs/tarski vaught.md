We only prove ($\Leftarrow$), i.e. that for every $L$-formula $\varphi(y_1, ..., y_k)$ the following holds:
$$\forall b_1, ..., b_k \in M . \quad M \models \varphi(b_1, ..., b_k) \iff N \models\varphi(b_1, ..., b_k)$$

Without loss of generality, we can assume that $\varphi$ is composed solely of the connectives $\neg, \wedge$ and the quantifier $\exists$.

We proceed by structural induction:

- **Atomic formulas**: Follows from the definition of substructure
- **Connectives**: Immediate by Tarski semantics
- **Existential**: Let $\varphi(y_1, ..., y_k) = \exists x . \psi(x, y_1, ..., y_k)$. Fixing $b_1, ..., b_k \in M$, we obtain:

$$\begin{aligned}
M \models \exists x.\psi(b_1, ..., b_k) &\iff \exists a \in M . M \models \psi(a, b_1, ..., b_k) & \text{(Tarski semantics)}\\
&\iff \exists a \in M . N \models \psi(a, b_1, ..., b_k) & \text{(Hp. Ind.)}
\end{aligned}$$

Finally, for Tarski's semantics:
$$\exists a \in M . N \models \psi(a, b_1, ..., b_k) \implies N \models \exists x . \psi(x, b_1, ..., b_k)$$
And for the lemma hypothesis:
$$N \models \exists x . \psi(x, b_1, ..., b_k) \implies \exists a \in M . N \models \psi(a, b_1, ..., b_k)$$

*QED.*