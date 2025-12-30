### Proof with ultraproducts

Given a non-principal ultrafilter $U$ on the parts of $\mathbb N$, I construct the following ultraproduct:

$$^*\mathbb R = \prod_{i \in \mathbb N} \mathbb R / U$$

By Łoś, $^*\mathbb R$ itself is a model of $Th(\mathbb R, 0, 1, +, \cdot, <)$.

Let $a, b \in { ^* \mathbb R}$ be such that $0_{ ^* \mathbb R} <_{ ^* \mathbb R} a$ and $0_{^* \mathbb R} <_{^* \mathbb R} b$, in particular choosing:
$$a = [1,2,3,4,5,...]\quad\quad b = [1,1,1,1,....]$$

(any constant $b$ would be ok)

Suppose that there exist some $n$ such that: 

$$a <_{^* \mathbb R} \underbrace{b+...+b}_{n \text{ times}}$$

By the interpretation of the function $+$ and the relation $<$ on the ultraproduct, this condition is equivalent to:
$$\{i \in \mathbb N \mid a_i < nb_i\} \in U$$

(this is because $\underbrace{b +_{^*\mathbb R} ... +_{^*\mathbb R} b}_n = [(n \cdot b_1, n \cdot b_2, ....)]$ ).

Now, since $a = [1,2,3,....]$, we have that the set:
$$\{i \in I \mid a_i < nb_i\} = \{i \in I \mid i < nb_i\}$$
is in the ultrafilter $U$. But such set is finite and the ultrafilter is non-principal, so this is a contradiction. 

### Proof with compactness

