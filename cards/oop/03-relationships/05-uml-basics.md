---
id: oop-uml-basics
topic: oop/relationships
title: UML basics
tags: [oop, uml, communication]
related: [oop-association, oop-aggregation-and-composition]
sources:
  - https://refactoring.guru/design-patterns/uml
---

## Explanation
UML class diagrams show types, their members, and the relationships between them without committing to an implementation. The most useful parts for everyday design are the class box, the arrows for association and dependency, and the filled or empty diamond for composition and aggregation. You do not need a full modeling tool or every diagram type; a small sketch of the main types and their dependencies often exposes cycles and misplaced responsibilities. In Android, a diagram of screen, ViewModel, use case, repository, and data source is a quick way to check that dependencies point in one direction.

## Code
```text
ArticleViewModel ---> ArticleRepository ---> ArticleApi
        |                    |
        v                    v
   ArticleUiState       ArticleDao

---> association / dependency
◆--- composition
```
