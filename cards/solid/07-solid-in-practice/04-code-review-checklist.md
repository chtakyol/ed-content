---
id: solid-code-review-checklist
topic: solid/practice
title: A SOLID code review checklist
tags: [solid, practice, code-review]
related: [solid-reading-the-acronym, solid-common-anti-patterns]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
A useful review checklist asks concrete questions instead of naming principles. Does this class have more than one reason to change, such as formatting, persistence, and analytics? Would a new variant require editing this `when` block, and is that acceptable because the set is closed? Can every implementation of this interface honor the same contract, including the error cases? Is a caller forced to implement methods it never uses? Does the dependency arrow point from policy to detail, or does the core import the framework? Review the diff in front of you, and suggest the smallest refactor that removes the friction rather than a rewrite that satisfies a slogan.

## Code
```text
[ ] One reason to change per class
[ ] New variants extend, not edit, where variation is expected
[ ] Subtypes honor parent pre/postconditions
[ ] Callers depend on the methods they use
[ ] Policy does not import data-layer details
[ ] Tests can substitute the real collaborators
```
