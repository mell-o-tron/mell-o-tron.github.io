The union of an inclusion chain of filters is a filter (upward closure). 

By [Zorn's Lemma](https://en.wikipedia.org/wiki/Zorn's_lemma), there exists a maximal filter by inclusion that contains $F$. If this were not an ultrafilter, there would exist $A, B$ with 

$$A \cup B = I\quad \wedge\quad A, B \notin U$$

Let $G = \{X \subseteq I \mid X \cup B \in U\}$. This is a filter:

- $\emptyset \cup B = B \notin U$
- $I \cup B = I \in U$,
- Let $X \cup B \in U$, $$X \subseteq Y \subseteq I \implies (X \cup B) \subseteq (Y \cup B) \subseteq I \implies Y \cup B \in U$$
- Let $X \cup B \in U$, $Y \cup B \in U$:
$$(X \cup Y) \cup B = (X \cup B) \cap (Y \cup B) \in U$$

Additionally, it holds that $U \subseteq G$. Sia $X \in U$:
$$X \cup B \supseteq X \implies X \cup B \in U \implies X \in G$$

Additionally, it holds that $U \neq G$, since $A \notin U$ ma $A \cup B = I \in U$, hence $A \in G$. This contradicts the maximality of $U$.

QED.