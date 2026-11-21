---
id: solid-what-is-solid
topic: solid/overview
title: What is SOLID?
tags: [solid, principles, design]
related: [solid-why-principles-matter, solid-reading-the-acronym]
sources:
  - https://en.wikipedia.org/wiki/SOLID
---

## Explanation
SOLID is a set of five object-oriented design principles: single responsibility, open-closed, Liskov substitution, interface segregation, and dependency inversion. They are not a framework or a checklist to apply uniformly; they are heuristics for keeping code understandable and changeable as requirements grow. Each principle targets a different kind of coupling, and in practice they overlap: a class with one responsibility is easier to extend, and depending on abstractions makes substitution and segregation possible. Treat SOLID as a vocabulary for discussing design tradeoffs, not as a rule that every class needs an interface and every module needs a layer.

## Code
```text
S  Single Responsibility   one reason to change
O  Open-Closed             extend without editing
L  Liskov Substitution     subtypes honor the contract
I  Interface Segregation  small, role-focused interfaces
D  Dependency Inversion    depend on abstractions
```
