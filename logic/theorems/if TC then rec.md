## Universal function

There exists a recursive function $u : \mathbb N^2_\bot \to \mathbb N_\bot$ such that, for every $n \in \mathbb N$ and $f : \mathbb N^n\to \mathbb N$ Turing computable, there exists a *code* $\ulcorner f\, \urcorner$ tc:
$$\forall \bar x \in \mathbb N^n . f(\bar x) = u(\ulcorner f\, \urcorner, \langle x_1, ..., x_n \rangle)$$

### Corollary 1

$f$ is Turing computable $\iff$ it is recursive. 

(except for the fact that an MdT cannot receive $\bot$ as input)

### Corollary 2

For every $n\in \mathbb N$, there exists a recursive function $u_n : \mathbb N^{n+1}_\bot \to \mathbb N_\bot$ such that, for every Turing computable $f : \mathbb N^n\to \mathbb N$, there exists a *code* $\ulcorner f\, \urcorner$ tc:
$$\forall \bar x \in \mathbb N^n . f(\bar x) = u_n(\ulcorner f\, \urcorner, x_1, ..., x_n)$$

### Corollary 3 (normal form)

For every $k \in \mathbb N$ there exist:

- $T_k : \mathbb N^{k+2} \to \mathbb N$ predicate (i.e. function with Boolean values) p.r.
- $U : \mathbb N \to N$ p.r.

such that for every recursive function $f : \mathbb N_\bot^k\to \mathbb N_\bot$:

$$\forall \bar x. f(\bar x) \neq \bot\iff \mu_n(T_k(\bar x, \ulcorner f\, \urcorner, n) = 0) \neq \bot$$
and
$$\boxed{\forall \bar x. f(\bar x) \neq \bot\implies f(\bar x) = U(\mu_n(T_k(\bar x, \ulcorner f\, \urcorner, n) = 0))}$$