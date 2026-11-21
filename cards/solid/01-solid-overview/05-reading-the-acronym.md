---
id: solid-reading-the-acronym
topic: solid/overview
title: Reading the acronym
tags: [solid, principles, overview]
related: [solid-what-is-solid, solid-srp-definition]
sources:
  - https://en.wikipedia.org/wiki/SOLID
---

## Explanation
The five letters are easy to memorize and easy to misapply, so read each one as a question about change. Single responsibility asks who requests a change; open-closed asks whether a new variant requires editing existing code; Liskov asks whether a subtype can stand in for its parent without surprises; interface segregation asks whether a caller is forced to depend on methods it does not use; dependency inversion asks whether a policy depends on a detail or a detail depends on a policy. The order S-O-L-I-D is a memory aid, not a sequence of steps, and the principles are most useful together rather than in isolation.

## Code
```text
S  Who asks for this change?
O  Can I add a variant without editing this branch?
L  Can every subtype replace the parent safely?
I  Does each caller need the whole interface?
D  Which direction does the dependency arrow point?
```
