## Special case with $|T| = \aleph_0$

$T = \{\psi_1, \psi_2, \psi_3 ...\}$. Let:
$$T_i = \{\psi_1, ..., \psi_i\}$$

We show that there exists $i$ such that $T_i \models \varphi$.  Suppose, by contradiction, that this is not the case; then for every $i \in \mathbb N$ there exists a model of $T_i$ such that $M_i \models \neg \varphi$. Given the family $\{M_i\}_{i \in \mathbb N}$ thus obtained, we construct:

$$M = \prod_{i \in \mathbb N} M_i /U$$

with $U$ a non-principal ultraproduct on $N$. By the corollary of [Łoś's Theorem](./proof.html?theorem=Los), $M \models\neg \varphi$.

However, we show that $M \models T$, which contradicts $M \models \neg \varphi$. In order to show $M \models T$, we show $\forall i \in \mathbb N . M \models \psi_i$. By the [Łoś Theorem](./proof.html?theorem=Los):
$$M \models \psi_j \iff \{i \in \mathbb N \mid M_i \models \psi_j\} \in U$$

By definition of $M_i$ we have $$\{i \in \mathbb N \mid M_i \models \psi_j\} \supseteq \{i \in \mathbb N \mid j \leq i\}$$

The set $\{i \in \mathbb N \mid j \leq i\}$ is cofinite, therefore it is necessarily in $U$ since $U$ is non-principal. Therefore, by [upward closure of ultrafilters](./def.html?definition=filter), $\{i \in \mathbb N \mid M_i \models \psi_j\} \in U$.

*QED*

### Note

An [ultrafilter](./def.html?definition=filter) is principal if it contains a finite set. Consequently, by [axiom 4](./def.html?definition=filter) (or 5, depending on how you count them) of ultrafilters, every principal ultrafilter contains all the complements of finite sets, i.e., the cofinite sets.

## General case

Let $F$ be the subset of $\mathcal P(\mathcal P^{fin}(T))$ such that:
$$X \in F \iff \exists A \in \mathcal P^{fin}(T) . \{B \in P^{fin}(T) \mid A \subseteq B\} \subseteq X$$

It can be verified that this is a filter. Consider an ultrafilter $U$ that extends it. Suppose, by contradiction, that for every $T' \in \mathcal P^{fin}(T)$ there exists a model $M_{T'}$ of $T$ such that $M_{T'} \models \neg \varphi$. Let:
$$M = \prod_{T'\in \mathcal P^{fin}(T)} M_{T'}/U$$
By the corollary of [Łoś's Theorem](./proof.html?theorem=Los), $M \models \neg \varphi$. We obtain the absurdity by showing that $M \models T$, i.e., for every $\psi \in T$, $M \models \psi$. By [Łoś's Theorem](./proof.html?theorem=Los), this corresponds to showing:
$$\{T' \in \mathcal P^{fin}(T) \mid M_{T'} \models \psi\} \in U$$

Let $\psi \in T$. By definition of $M_{T'}$ we have $M_{T'} \models T'$, so:
$$\psi \in T' \implies M_{T'}\models \psi$$
Writing $\psi \in T'$ as $\{\psi\} \subseteq T'$, from the above implication we obtain:

$$\{T' \in \mathcal P^{fin}(T) \mid M_{T'} \models \psi\} \supseteq \{T' \in \mathcal P^{fin}(T) \mid \{\psi\} \subseteq T'\}$$

Choosing $A = \{\psi\}$, we have that $\{T' \in \mathcal P^{fin}(T) \mid \{\psi\} \subseteq T'\}$ is a subset of itself, therefore:
$$\{T' \in \mathcal P^{fin}(T) \mid \{\psi\} \subseteq T'\} \in U$$

By [upward closure](./def.html?definition=filter), we also have:
$$\{T' \in \mathcal P^{fin}(T) \mid M_{T'} \models \psi\} \in U$$

QED.