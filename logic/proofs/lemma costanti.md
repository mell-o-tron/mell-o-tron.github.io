The non-immediate direction is ($\Longleftarrow$).

For syntactic compactness, I consider a finite subset $T' \subseteq T$ such that $T' \vdash \varphi[c /x_k]$.

I fix a proof of $\varphi[c/x_k]$. Let $x_l$ be a fresh variable (which does not appear in $T'$ or in the proof). Then the following holds:
$$T' \vdash \varphi [x_l / x_k]$$
since I can substitute $x_l$ for $c$ in the proof. Since $x_l$ is fresh, I can apply intro $\forall$:

$$\dfrac{T' \vdash \varphi [x_l/x_k]}{T' \vdash \forall x_l. \varphi[x_l/x_k]}$$

Finally, I show that $T \vdash \forall x_l . \varphi [x_l/x_k] \to \forall x_k.\varphi$. (This is equivalent to the correct thing for intro $\to$).

$$\dfrac{\dfrac{\dfrac{\dfrac{\dfrac{}{\forall x_l . \varphi[x_l/x_k] \vdash \forall x_l . \varphi[x_l / x_k]}(\text{Ax})}{\forall x_l. \varphi[x_l/x_k] \vdash\varphi}}{\forall x_l. \varphi[x_l/x_k] \vdash \forall x_k . \varphi}}{\vdash \forall x_l. \varphi[x_l/x_k] \to \forall x_k . \varphi}}{T' \vdash \forall x_l. \varphi[x_l/x_k] \to \forall x_k . \varphi}(\text{indeb})$$

*QED.*