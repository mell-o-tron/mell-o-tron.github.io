
If $\varphi$ is $\Delta^0_0$, then it is a boolean combination (+ limited quantifiers) of closed atomic formulae.

Let $\mathbb N \models \varphi$. By induction (symmetrically on both assertions):

- If $\varphi$ is tomic, use [the previous lemma](./proof.html?theorem=Q%20decides%20atomic%20closed%20formulae).
- If $\varphi = \phi_1 \wedge \phi_2$, by Tarski's semantics:
$\mathbb N \models \phi_1$ e $\mathbb N \models \phi_2$. by inductive hp: $Q \vdash \phi_1$ e $Q \vdash \phi_2$. By the rule $\texttt{intro-}\wedge$, $Q \vdash \phi_1 \wedge \phi_2$. (And similar for the others..)
- Limited quantifiers: We reduce them to connectives. Let:
$$\varphi = \forall x \leq t. \psi$$
By hypothesis of the theorem, $t$ is a closed term, therefore it has a value in $\mathbb N$: $\{t\}_{\mathbb N} = n$. We can thus rewrite $\varphi$ as:
$$\forall x . (x = 0 \vee x = 1 \vee ... \vee x = \bar n) \to \psi$$
$$\forall x . (x = 0 \to \psi) \wedge (x = 1 \to \psi) \wedge ... \wedge (x = \bar n \to \psi)$$
$$(\forall x . x = 0 \to \psi) \wedge ... \wedge (\forall x .x = \bar n \to \psi)$$
And in place of each $(\forall x . x = k \to \psi)$, we can write $\varphi[k/x]$:
$$\psi[0/x] \wedge ... \wedge \psi[1/x]$$
Therefore we reduced the case of limited universal quantifier to and. Similarly for $\exists x \leq t$ and $\vee$.

Let $Q \vdash \varphi$. Then it's immediate that $\mathbb N \models \varphi$ because $\mathbb N \models Q$.

---- 

Let $\psi$ of class $\Sigma^0_1$. Then it is of the form:
$$\psi = \exists x_1 ... \exists x_k . \varphi$$
Where $\varphi$ è $\Delta^0_0$. By cases:

- $\mathbb N \models \psi$, i.e. there exist $n_1 .. n_k$ such that 
$$N \models \varphi[\bar n_1 / x_1 ... \bar n_k / x_k]$$
By the result above:
$$Q \vdash \varphi[\bar n_1 / x_1 ... \bar n_k / x_k]$$
Hence by $\texttt{intro-}\exists$:
$$Q \vdash \exists x_1 ... \exists x_k . \varphi$$

- $Q \vdash \psi$, since $\mathbb N$ is a model of $Q$ we have $N \models \psi$.

QED.