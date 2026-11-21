---
id: solid-dependency-direction
topic: solid/dip
title: Dependency direction
tags: [solid, dip, architecture]
related: [architecture-layer-dependencies, solid-dip-definition]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
Dependency inversion is easiest to check by drawing arrows. In a healthy Android app, the UI depends on the domain, the domain depends on abstractions it owns, and the data layer implements those abstractions. The arrows point inward toward policy, and no arrow points from the domain back to Retrofit, Room, or the Android framework. Cycles are a warning sign, because they mean two modules must change together. When a dependency points the wrong way, introduce an interface at the policy boundary and let the detail implement it, rather than moving framework code into the core.

## Code
```text
ui ──────▶ domain
             ▲
             │ implements
data ────────┘

No arrow from domain back to data.
```
