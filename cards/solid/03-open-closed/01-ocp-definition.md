---
id: solid-ocp-definition
topic: solid/ocp
title: Open-closed principle
tags: [solid, ocp, extension]
related: [solid-extension-over-modification, solid-polymorphic-extension]
sources:
  - https://en.wikipedia.org/wiki/Open%E2%80%93closed_principle
---

## Explanation
The open-closed principle says a module should be open for extension but closed for modification: you should be able to add a new behavior without editing the code that already works. The typical mechanism is polymorphism, where a new implementation plugs into an existing interface, or a data-driven design where a new case is another value rather than another branch. The principle does not ban all edits; it asks you to identify the axis of change and make that axis extensible. If every new feature edits the same `when` block, that block is the signal that the variation should move behind a type.

## Code
```kotlin
interface Exporter {
    fun export(articles: List<Article>): String
}

class CsvExporter : Exporter { /* ... */ }
class JsonExporter : Exporter { /* ... */ }

// New format: add an implementation, not an if branch.
```
