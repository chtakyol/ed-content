---
id: solid-common-anti-patterns
topic: solid/practice
title: Common anti-patterns
tags: [solid, practice, anti-patterns]
related: [solid-code-review-checklist, solid-god-classes]
sources:
  - https://refactoring.guru/refactoring/smells
---

## Explanation
Several anti-patterns show up repeatedly in Android code. The god ViewModel knows about data, analytics, formatting, and navigation. The base activity bundle forces unrelated screens into one inheritance tree. The leaky repository exposes Retrofit or Room types. The fat listener forces empty implementations. The service locator hides dependencies behind a global lookup. The speculative abstraction adds an interface nobody substitutes. Each is a recognizable shape, and each has a small refactor: extract a collaborator, narrow an interface, move wiring to the composition root, or delete the unused layer. Naming the shape makes review conversations concrete.

## Code
```text
God ViewModel      -> extract repository, formatter, analytics
BaseActivity pile  -> inject small collaborators
Leaky Repository   -> return domain models and typed errors
Fat Listener       -> split by event or use Flow
Service Locator    -> constructor injection + composition root
Speculative Layer  -> delete until a second case exists
```
