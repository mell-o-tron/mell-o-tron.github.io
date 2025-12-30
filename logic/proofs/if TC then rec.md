Idea: The configurations of a Turing machine are encoded using numbers. Let us assume, without loss of generality, that the states and symbols are $\subseteq \mathbb N$.

A configuration will be represented by the encoding of the triple:
$$\langle \text{state}, \text{position}, \text{tape} \rangle$$

Where the tape will be encoded as:
$$\langle a_0, a_1, ..., a_n \rangle$$
which represents the tape $a_0, a_1, ..., a_n, 0,0,...$.

The encoding of the Turing machine corresponds to the encoding of the transition function:
$$\delta : Q \times \Sigma \to Q \times \Sigma \times \{\leftarrow, \downarrow, \rightarrow\}$$
whose encoding $\ulcorner \delta\,\urcorner$ is such that:
$$nth (\ulcorner \delta\,\urcorner, \langle q, \sigma\rangle) = \langle q', \sigma', \text{move}\rangle$$
if $\delta(q, \sigma) = (q', \sigma', \text{move})$. I.e. I represent $\delta$ with the list that, instead of $\langle\text{state}, \text{symbol}\rangle$, contains the encoding of $\langle q', \sigma', \text{move}\rangle$. 

*Note: this encoding is NOT injective.*

What we do is prove that it is possible to find a primitive recursive function $f : \mathbb N^2\to \mathbb N$ such that, for every encoding of a configuration $c$, it performs a step:
$$c \overset M\longrightarrow step(\ulcorner \delta\,\urcorner, c)$$

Once this is shown, it is obvious that $step^n$ is primitive recursive, and it suffices to construct a function that “reads the output” of the TM, i.e., that counts the 1s in the encoding of the configuration obtained by executing $step^n$ for the right number of $n$. 

We must therefore prove:

- That $step$ is primitive recursive
- That there exists a primitive recursive function that encodes the input of a Turing machine
- That there exists a general recursive function that returns the number of steps after which the machine $\delta$ stops on the input $c$ (defined by minimization on the value of the state obtained by iterating $step$)

### primitive recursive step...


### Encoding input...


### Counting steps
...
