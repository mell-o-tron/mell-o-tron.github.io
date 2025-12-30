 
Consider the theory:

$$T = \{\psi_i \mid i \in \mathbb N\}$$

where $\{\psi_i\}_{i \in \mathbb N} = \{ c_j \neq c_k \mid j > k \}$.

On the language $L = \{c_i \mid i \in \mathbb N\}$. This theory clearly axiomatizes finite sets.

Let us assume that there exists a finite axiomatization $T'$. Since $T$ and $T'$ are axiomatizations of the same class, they satisfy the same formulae. Let $T \models \varphi$, then $T' \models \varphi$, so by compactness there exists a finite subset $T''$ that satisfies $\varphi$ and is therefore an axiomatization of infinite sets.

But this is absurd, since the theory $T''$ also has finite sets as models.

*QED*


#### Note

Remember that a class of structures is axiomatized by $T$ if the models of $T$ are all *and only* the elements of the class.