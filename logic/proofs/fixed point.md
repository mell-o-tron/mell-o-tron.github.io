### Hacking


<details>
<summary> *Before showing the theorem, we develop a technique through two examples.*
</summary>
<br>

#### Ex 1

Show that there exists a total recursive function $k:\mathbb N \to \mathbb N$ such that:
$$\forall n \in \mathbb N . n = u_0(k(n))$$
Note: $u_0(\ulcorner f\,\urcorner) = u(\ulcorner f\,\urcorner, \langle\rangle)$ behaves like the *0-ary function* $f$. A 0-ary function is: a number. Therefore $u_0(\ulcorner f\,\urcorner) = f \in \mathbb N$. 

$k(n)$ must therefore be the code of a 0-ary function whose value is $n$, that is **the identity, partially applied to $n$**. The *barbatrucco* to create 0-ary functions is to use partial application:
$$k(n) = S_0^1(\ulcorner Id\,\urcorner, n) = \lambda \_ .n$$
It holds that:
$$u_0(k(n)) = u_1(\ulcorner Id\,\urcorner, n) = Id(n) = n$$

#### Ex 2

Given a recursive function $f : \mathbb N_\bot \to \mathbb N_\bot$, show that there exists $kf : \mathbb N \to \mathbb N$ such that:
$$\forall n . f(n) \in \mathbb N \implies f(n) = u_0(kf(n))$$

Again, $kf$ must return a 0-ary function:
$$kf(n) = \lambda \_ . f(n)$$
This is precisely $S_0^1(\ulcorner f\,\urcorner, n)$:
$$u_0(S_0^1(\ulcorner f\,\urcorner, n)) = u_1(\ulcorner f\,\urcorner, n) = f(n)$$
</details>

------

### Proof of the fixed point theorem

I am looking for an $\alpha$ such that:
$$u_n(\alpha, \bar x) = u_n(h(\alpha), \bar x)$$

In an ideal world (the $\lambda$-calculus), being able to apply everything to everything, I could define a function:
$$F:\lambda f . h(f\;f)$$
and by definition I would have that $F(F) = h(F(F))$. 

Using the tools at our disposal, let's try to define a function $F : \mathbb N \to \mathbb N$ such that:
$$\alpha = \ulcorner F(\ulcorner F\,\urcorner)\urcorner\quad\quad u_n(\alpha, \bar x) = u_n(h(\alpha), \bar x)$$

#### Obvious attempt

We could choose $F(x) = h(u_1(x, x))$, which is clearly such that:
$$F(\ulcorner F\,\urcorner) = h(u_1(\ulcorner F\,\urcorner, \ulcorner F\,\urcorner)) = h(F(\ulcorner F\,\urcorner))$$
The problem is that the computation $F(\ulcorner F\,\urcorner)$ could recur infinitely, so $\alpha = \bot$, but we have required that $\alpha \in \mathbb N$.

#### Correct proof

We use partial application to perform a *lazy* computation. Let:
$$g(x, \bar y) = u_n(h(u_1(x, x)), \bar y)$$
And let's define $F$ as:
$$F(x) = S^1_n(\ulcorner g\,\urcorner, x) = \ulcorner \lambda y . g(x, y)\urcorner$$

At this point:

$$\begin{aligned}
u_n(\boxed{F(\ulcorner F\,\urcorner)}, \bar y) &= u_n( S^1_n(\ulcorner g\,\urcorner, \ulcorner F\,\urcorner), \bar y) 
\\&= u_{n+1}(\ulcorner g\,\urcorner, \ulcorner F\,\urcorner, \bar y) \\&= g(\ulcorner F\,\urcorner, \bar y)\\&=
u_1(h(u_1(\ulcorner F\,\urcorner, \ulcorner F\,\urcorner)), y)\\
&= u_1(\boxed{h(F(\ulcorner F\,\urcorner))}, \bar y)
\end{aligned}$$

QED.