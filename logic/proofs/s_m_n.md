Let's prove the case with $n = 1$ and iterate the process:
$$\boxed{u_{1+n}(\alpha, x, \bar y) = u_n(S_n^1(\alpha, x), \bar y)}$$
Let's construct the TM explicitly: the goal is to construct a machine that attaches $x$ at the head, to which we compose the original machine.

$$1 \triangleright y_1 ... y_n$$

We apply the successor function $x$ times on the first trailing zero to obtain $x$ at the end: 
$$1 \to \underbrace{exec_{n+1, 1} s \to exec_{n+1, 1} s \to ...}_x \to 2$$
$$2 \triangleright y_1 ... y_nx$$
I move $x$ to the head:
$$2 \to \underbrace{push_{n+1, 1} \to rem_{n+1, 1} \to ...}_n \to 1_{\alpha}$$
$$1_\alpha \triangleright x y_1 ... y_n$$
Now I can apply the function whose code is $\alpha$. 

It is tedious but possible to convince oneself that this procedure is actually primitive recursive.

QED.