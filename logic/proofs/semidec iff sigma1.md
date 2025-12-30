Idea:

We show that:

$$\Delta_0^0 \subseteq p.r.\subseteq dec\subseteq semidec \subseteq \Sigma^0_1$$

We note that, by adding existences in front of the classes, we obtain:
$$(\exists\Delta_0^0 = \Sigma^0_1) \subseteq \exists ... \subseteq \ (\exists \Sigma^0_1 = \Sigma^0_1)$$

In showing $\Sigma^0_1 \subseteq semidec$, we will clarify the following intuitive ideas:

- The sets $\Delta_0^0$ are primitive recursive (limited quantification $\sim$ for loop)
- The sets $\Sigma^0_1$ are of the form $\exists \Delta_0^0$, i.e., I add unlimited quantification ($\sim$ while loop) to the p.r.s. to obtain the semidecidable.

-----

### $(\Longrightarrow)\quad semidec \subseteq \Sigma^0_1$

We prove that, given a semidecidable set, it is $\Sigma^0_1$. If $S$ is semidecidable, then $\chi_S$ is recursive. We must show that there exists a predicate $\varphi(\bar x)$ such that:
$$\chi_S(\bar x) = 1 \iff \mathbb N \models\varphi(\bar x)$$

We therefore show the following **lemma**: let $f : \mathbb N^k \to \mathbb  N$ be recursive (partially), then there exists $\varphi(\bar x, y)$ of class $\Sigma^0_1$ such that:
$$f(\bar x) = y \iff \mathbb N \models \varphi(\bar x, y)$$

<details>
<summary>
This is shown by induction on the construction of recursive formulas...
</summary>

- Base cases ok
- Composition: assuming we have
$$y = g(x) \iff \underbrace\varphi_{\Sigma_1}(x, y)\quad\quad
z = f(y) \iff \underbrace\psi_{\Sigma_1}(y, z)$$
Then $z = f(g(x)) \iff \varphi(x, y) \wedge \psi(y, z)$

- Minimization: assuming we have
$$f(x, y) = t \iff \varphi(x, y, t)$$
Then: 
$$z = \mu_y.(f(x, y) = 0) \iff \varphi(x, z, 0) \wedge\forall x < z . \exists t . t \neq 0 \wedge\varphi(x, y, t)$$

- Primitive recursion - funny case ....
</details>

### $(\Longleftarrow)\quad \Delta^0_0 \subseteq p.r.$ and I add $\exists$

Let us now prove that given a formula $\Sigma_1^0$, the set described by the formula is semidecidable. First, we show the following:

**Lemma**: $\Delta_0 \subseteq$ p.r. 

<details>
<summary> This is shown by structural induction...
</summary>
 [....]
</details>

----

Finally, given a set $\Sigma^0_1$:
$$S = \{\bar x \mid \exists \bar y . \varphi(\bar x, \bar y)\}$$
I can apply the lemma, so for some set $p.r.$ $T$:
$$S = \{\bar x \mid \exists \bar y . (\bar x, \bar y) \in T\}$$

To prove that the set $S$ is semidecidable, we exhibit the function that semidecides it. Let $0$ be the function $\lambda x .0$:
$$0(\mu_y(x_1, ..., x_k, \text{nth}(0, y), \text{nth}(1, y), \text{nth}(2, y), ...) \in T)$$

idea: I transform the quantification into a while loop (i.e., into a $\mu$), searching for the minimum sequence $y = \langle y_1, ..., y_k \rangle$ such that
$(\bar x, \bar y) \in T$.

I know that $T$ is decidable, as are nth and the constant zero function. Therefore, the above function is semidecidable:

- If it finds an element of $T$, and consequently an element of $S$, it returns zero
- Otherwise, it diverges.

QED.