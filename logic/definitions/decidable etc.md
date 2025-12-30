### Decidability

A set $R \subseteq \mathbb N^k$ is said to be:

- **Semi-decidabile** if there exists a recursive function $f$ s.t.:
$$R = \{\bar x \in \mathbb N^k \mid f(\bar x) = 0\}$$
- **Decidabile** if there exists a **total** recursive function $f$ s.t.:
$$R = \{\bar x \in \mathbb N^k \mid f(\bar x) = 0\}$$
- **Recursively Enumerable** if it is the image of a total recursive function, i.e.:
$$R = \{f(n) \mid n \in \mathbb N\}$$
that is, if it is possible to enumerate all elements of $R$ by computing:
$$f(0), \quad f(1), \quad f(2), \quad ...$$

