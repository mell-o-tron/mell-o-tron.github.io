## Prop

Let $\varphi$ be a closed formula.

- If $\varphi$ is $\Delta_0^0$, then:
$$N \models \varphi \iff Q \vdash \varphi$$
$$N \models \neg\varphi \iff Q \vdash \neg\varphi$$

- If it is $\Sigma^0_1$, only the following holds:
$$N \models \varphi \iff Q \vdash \varphi$$


### Corollary

Let $f$ be a recursive function. Then there exists $\varphi(\bar x, y) \in \Sigma_1$ such that for every $\bar x, y$:
$$Q \vdash \varphi(\bar x, y) \iff f(\bar x) = y$$

Note to be elaborated further: 
$$y = f(\bar x, y) \iff \mathbb N \models \varphi(\bar x, y) \iff Q \vdash \varphi(\bar x, y)$$