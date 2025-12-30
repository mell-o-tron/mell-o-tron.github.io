By induction on the length of the proof. Assume to have performed $n$ steps: for each inference rule, consider as inductive hp the fact that the premises hold and show that the conclusions hold. As an example:

$$\dfrac{T, \varphi \vdash \psi}{T \vdash \varphi \to \psi}$$

Inductive hp: $$\forall M . \forall v . M \models \{v\} (T, \varphi) \implies M \{v\} \psi$$

Where $M \models \{v\} (T, \varphi)$ means $M \models\{v\} \{T\} \wedge M \models \{v\} \varphi$.

we must show:
$$\forall M . \forall v . M \models\{v\}T \implies \boxed{M \models \{v\} \varphi \to \psi}$$

by applying Tarski's semantics on the boxed bit we obtain:
$$\forall M . \forall v . M \models\{v\}T \implies M \models \{v\} \varphi \implies M \models \{v\} \psi$$

We then use the fact that $((A \wedge B) \implies C) \equiv (A \implies B \implies C)$ to show the equivalence of this formula to the premise

[other cases left as exercise..].

*QED.*