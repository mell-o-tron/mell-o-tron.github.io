## Q and (non)standard numbers

- A number $n \in M$, with $M \models Q$, is said to be standard if there exists an $x \in \mathbb N$ such that:
$$M \models n = \bar x$$

- I say that: 
$$t_1 \leq t_2 \overset \triangle\equiv \exists x . x + t_1 = t_2$$
Note that the order of the addends matters (Q does not prove commutativity =) and that in Q $\leq$ is not an order, since nonstandard numbers can form cycles.

### Lemma 1

Q knows which numbers $\leq n$ are standard:

$$Q \models \forall a . a \leq \bar n \longleftrightarrow (a = \bar 0 \vee a = \bar 1 \vee ... \vee a = \bar n)$$

### Lemma 2

Non-standard numbers are “bigger” than standard ones: Let $M \models Q$, with $\alpha \in M$ non-standard. Then
$$\forall n \in \mathbb N. M \models \bar n < \alpha$$