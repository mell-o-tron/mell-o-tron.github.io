### Semidecidable $\implies$ recursive function domain

Let $R$ be semidecidable. Then there exists a recursive function $f$ such that:
$$R = \{x \mid f(x) = 0\}$$
Then I define the function:
$$g(x) = \begin{cases}
0 &\text{if } x = 0\\
\bot &\text{o.w.}
\end{cases}$$
$R$ is the domain of $g$, and $g$ is recursive by construction.

### Domain of recursive function $\implies$ recursively enumerable

I use the corollary of [**normal form**](./proof.html?theorem=if%20TC%20then%20rec#corollary-3-normal-form-):

Let $R = \{\bar x \mid f(\bar x) \neq \bot\}$. By normal form, there exist $T_{k+2}$, $U$ *primitive recursive* such that:
$$\forall \bar x . f(\bar x) \neq \bot \iff f(\bar x) = U(\mu_u . (T(\ulcorner f \,\urcorner, y, \bar x) = 0))$$

Consequently:
$$f(\bar x) = \bot \iff \neg \exists y . T(\ulcorner f \,\urcorner, y, \bar x) = 0$$
Therefore:
$$\bar x \in R \iff f(\bar x) \neq \bot \iff \exists y . T(\ulcorner f \,\urcorner, y, \bar x) = 0$$

Now, an algorithm that enumerates the elements of $R$ is as follows:

For every possible $(k+1)$-tuple:
$$\langle y, x_1, x_2, ..., x_k\rangle$$
I check if $T_{k+2}(\ulcorner f \,\urcorner, y, \bar x) = 0$, and if so, I return $\bar x$, otherwise I return an arbitrary element of $R$.

$$g(\overbrace{n}^{\langle y, \bar x \rangle}) = \begin{cases} \overbrace{\texttt{cdr}(n)}^{\bar x} & \text{if } T_{k+2}(\ulcorner f \,\urcorner, \overbrace{\texttt{nth}(0, n)} ^y, \overbrace{\texttt{nth}(1, n)}^{x_1}, ..., \overbrace{\texttt{nth}(k, n)}^{x_k}) = 0 \\ \bar c\in \mathbb R & \text{o.w.}\end{cases}$$

This function is totally recursive because it only involves primitive recursive functions (and the case definition is primitive recursive).

### Recursively enumerable $\implies$ semidecidable

Let: $$R = \{f(n) \mid n \in \mathbb N\}$$
I can define:
$$g (\bar x) = (\lambda \_.0)(\mu_n . (f(n) = \langle \bar x\rangle))$$
Which returns zero if $\mu_n . (f(n) = \langle \bar x\rangle)$ converges, otherwise it diverges.