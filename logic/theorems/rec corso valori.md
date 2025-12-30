## Recursion on the course of values

Let: 
$$f:\mathbb N^{k+1} \to \mathbb N$$
$$g:\mathbb N^{k+1} \to \mathbb N$$
such that:
$$\begin{aligned}f(x_1, ..., x_n, y) = g(x_1, ..., x_n, \langle &f(x_1, ..., x_n, y - 1),\\ &f(x_1, ..., x_n, y - 2),\\ &..., \\&f(x_1, ..., x_n, 0) \rangle).\end{aligned}$$

Then $f$ is primitive recursive.