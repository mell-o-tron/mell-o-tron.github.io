By induction on the length of the proof (as for [correctness](./proof.html?theorem=correctness)). This time, I show how to combine the finite theories from which I prove the premises to obtain a finite theory from which I prove the conclusions. For example, using $El_\to$, I assume that I have finite $T'‘$ and $T’''$ such that:
$$T'‘ \vdash \varphi \to \psi \quad\quad\quad T’'' \vdash \varphi$$
Let $T' = T'‘ \cup T’''$, then:

$$\dfrac{\dfrac{T'‘ \vdash \varphi \to \psi}{T’ \vdash  \varphi \to \psi} (\small\text{indeb.}) \quad\quad \dfrac{T'‘’ \vdash \varphi}{T' \vdash \varphi}(\small\text{indeb.})}{T' \vdash \psi} (El_\to)$$

[Other cases as exercise].

*QED.*