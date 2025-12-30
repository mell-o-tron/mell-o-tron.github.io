## S-m-n theorem (or partial application theorem)

There exists a total recursive function:
$$S_{n}^m : \mathbb N ^{m+1}\to \mathbb N$$
such that for every $\alpha, x_1, ..., x_m, y_1, ..., y_n \in \mathbb N$, the following holds:
$$u_{m+n}(\alpha, x_1, ..., x_m, y_1, ..., y_n) = u_n(S_n^m (\alpha, x_1, ..., x_m), y_1, ..., y_n)$$

i.e., let $\alpha$ be the code of an $m+n$-ary function:
$$f: \mathbb N^{m+n} \to \mathbb N$$
$S_n^m (\alpha, x_1, ..., x_m)$ returns the code of the function:
$$\lambda \bar y. f(\bar x, \bar y)$$