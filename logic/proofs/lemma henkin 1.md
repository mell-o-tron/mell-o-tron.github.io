By contradiction, let $T' \vdash \bot$:

$$\dfrac{T, (\exists x . \varphi(x)) \to \varphi(c) \vdash \bot}{\dfrac{T \vdash \neg((\exists x.\varphi(x)) \to \varphi(c))}{\dfrac{T \vdash \neg\varphi(c)}{T \vdash \forall x . \neg \varphi} (\text{l.d.c.}) \quad\quad T \vdash \exists x.\varphi(x)}(\text{es.})}$$

Where l.d.c. is the lemma of constants. The two conclusions reached are in disagreement. This can be shown by deriving:

$$\forall x . \neg \varphi(x), \exists x . \varphi(x) \vdash \bot$$

(exercise). Consequently, we would have that $T$ itself is inconsistent, which contradicts the hypotheses.