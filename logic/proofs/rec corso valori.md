Let $h(\bar x, y) = \langle f(\bar x, y-1), ..., f(\bar x, 0) \rangle$. Note that:
$$f(\bar x, y) = \text{car}(h(\bar x, y+1))$$
since car is PR, it suffices to show that $h$ is PR. By induction:

- $h(\bar x, 0) = \langle\rangle = 0$
- $h(\bar x, y + 1) = \text{cons}(g(\bar x, h(\bar x, y+1)), h(\bar x, y))$

QED.