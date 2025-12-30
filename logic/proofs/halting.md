Let $H_1$ be decidable. Then its characteristic function is totally recursive. Consequently, the following $f$ is recursive:

$$f(\alpha) = \begin{cases}u_1(\alpha, \alpha) + 1& \text{if } (\alpha, \alpha) \in H_1 \\
0 &\text{otherwise}\end{cases}$$


Since $f$ is recursive, it has a code $\ulcorner f\, \urcorner$. But applying $f$ to its code:
$$f(\ulcorner f\, \urcorner) = \begin {cases}
u_1(\ulcorner f\, \urcorner, \ulcorner f\, \urcorner) = f(\ulcorner f\, \urcorner) + 1 & [↯!] &\text{if } (\ulcorner f\, \urcorner,\ulcorner f\, \urcorner)\in H\\
0 & [\neq \bot, ↯!] &\text{otherwise}
\end{cases}$$

QED.
