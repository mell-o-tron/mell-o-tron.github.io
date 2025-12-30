## Correctness Theorem

$$T \vdash \varphi \implies \forall M . \forall (v : Var \to M). \boxed{M \models \{v\}T \implies M \models\{v\}\varphi}$$

As a corollary: if $\varphi$ is a **closed formula**, we have the following:
$$T \vdash \varphi \implies T \models \varphi$$