- $(\Longrightarrow)$ ok (noting that if $R$ is decidable, then so is its complement)

- $(\Longleftarrow)$ Let $R, \bar R$ be recursively enumerable. Then
$$R = \{f(n) \mid n \in \mathbb N\}$$
$$\bar R = \{g(n) \mid n \in \mathbb N\}$$

Then if I define the function:
$$h(n) = \begin{cases}f(n) & \text{if } n \text{ is even}\\g(n)&\text{otherwise} \end{cases}$$
I can define a function that is zero only for $\bar x \in R$:
$$k(\bar x) = (\mu_n . (h(n) = \bar x)) \mod 2$$
$$= 0 \iff \bar x \in R$$

QED