---
id: compose-bom-mapping
topic: jetpack-compose/setup
title: BOM version mapping
tags: [compose, bom, versions]
related: [compose-bom, compose-overriding-bom-versions]
sources:
  - https://developer.android.com/develop/ui/compose/bom/bom-mapping
---

## Explanation
Each BOM release maps to a specific version of every Compose library it manages. The mapping page lists which `ui`, `foundation`, `material3`, and runtime versions a given BOM contains, which is useful when you need to know whether a bug fix or API is available. Two BOMs can also resolve to the same library version, because releases do not always bump every artifact. Use the mapping to reason about upgrades and to report reproducible versions, rather than guessing from the BOM's date or number.

## Code
```text
BOM 2025.01.00
  androidx.compose.ui:ui              -> 1.7.x
  androidx.compose.foundation        -> 1.7.x
  androidx.compose.material3         -> 1.3.x
  androidx.compose.runtime           -> 1.7.x
```
