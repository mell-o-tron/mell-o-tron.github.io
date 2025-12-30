It is clear that it suffices to prove the two implications $\implies$.

- Let $N \models t_1 = t_2$. Then: 
$$\{\}_{\mathbb N}\; t_1 = \{\}_{\mathbb N}\;t_2$$

By the [lemma on numerals](./proof.html?theorem=Q%20can%20do%20arithmetics), $Q \vdash t_1 = \bar n$, $Q \vdash t_2 = \bar m$, so $Q \vdash t_1 = t_2$ by transitivity of equality.

- Let $N \models \neg (t_1 = t_2)$ (obvious, but we need a little à la coq wizardry...)

QED

----

![](https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages2.fanpop.com%2Fimage%2Fphotos%2F10700000%2FQ-Judge-q-star-trek-10759421-694-530.jpg&f=1&nofb=1&ipt=33ee70d5bce271eeaea2de7fa34367b8ab51660fcf864c90fb9b6e28e6c0df38)