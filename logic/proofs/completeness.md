We show the more general statement:

$$T \vdash \varphi \Longleftarrow \forall M.\forall v.M\models\{v\}T \implies M\models\{v\}\varphi$$

This is equivalent to
$$\begin{array}{}
T \not\vdash \varphi \implies \exists M.\exists v.M\models\{v\}T \wedge \neg M\models\{v\}\varphi\\
\equiv\\
\underbrace{T, \neg}_{T'} \varphi \not\vdash \bot \implies \exists M.\exists v.M\models\{v\}T, \neg \varphi\\
\equiv\\
T' \not\vdash \bot \implies \exists M.\exists v.M\models\{v\}T'
\end{array}$$
i.e. every deductively coherent theory has at least a model.

To the end of showing this, given an arbitrary theory $T$ ded. coher. , we exhibit a model:

1. Let $L' = L \cup \{c_1, c_2, ...\}$ e $T' = T \cup \{x_1 = c_1, x_2 = c_2, ...\}$. These additional axioms are used to provide the interpretation of the variables in $M$. Because of the *lemma of constants* this theory remains coherent (every constant shall instantiate an existential formula).
2. We extend the theory to be complete (Lemma di Lindenbaum) and Henkin (Lemma Henkin 2), maintaining its coherence.
3. We define the model $M$ whose domain is:
$$M = \{L\text{-closed terms}\}/\sim$$
where $t_1 \sim t_2 \iff T \models t_1 = t_2$. The interpretation of relations is:
$$R([t_1], ... [t_k]) \overset\triangle\iff R(t_1, ..., t_k)$$
and that of functions:
$$[t] = [f(t_1, ... t_k)] \overset\triangle\iff t = f(t_1, ..., t_k)$$
(Well-definition is given by the validity of substitution of equals by equals in terms). The **interpretation of variables** is:
$$v(x_i) = c_i$$

4. Now we must show $M \models T$. We show the stronger preposition $M \models T''$, i.e.
$$\forall \varphi . M \models\{v\} \varphi \implies T'' \models \varphi$$
We actually directly show the iff, case by case by induction on the number of logical symbols.


### Implication

I want top show:
$$M \models \{v\}\varphi \to \psi \implies T'' \models \varphi \to \psi$$

By cases:

| T T      | T F      | F T      | F F      |
| ------------- | ------------- | ------------- | ------------- |
| $M \models \{v\}\varphi$ | $M \models \{v\}\varphi$ | $M \not\models \{v\}\varphi$ | $M \not\models \{v\}\varphi$ |
| $M \models \{v\}\psi$ | $M \not\models \{v\}\psi$ | $M \models \{v\}\psi$ | $M \not\models \{v\}\psi$ |

By inductive hypothesis, the following corresponds to the cases

| T T      | T F      | F T      | F F      |
| ------------- | ------------- | ------------- | ------------- |
| $M \vdash \varphi$ | $M \vdash \varphi$ | $M \not\vdash \varphi$ | $M \not\vdash \varphi$ |
| $M \vdash \psi$ | $M \not\vdash \psi$ | $M \vdash \psi$ | $M \not\vdash \psi$ |

Hence the cases TT, FT, FF correspond in both cases (for Tarski's semantics and ND) to the case in which it holds vale/it is provable that $\varphi \to \psi$, whereas the remaining case corresponds to the one in which it does not hold/it is not provable. 

### Existential

[...]