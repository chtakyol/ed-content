---
id: solid-and-android-architecture
topic: solid/overview
title: SOLID and Android architecture
tags: [solid, android, architecture]
related: [architecture-layers, solid-dip-definition]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
Android's recommended architecture already reflects SOLID without naming it. The UI, domain, and data layers are a responsibility split; repository interfaces are dependency inversion; a ViewModel depending on an abstraction rather than a Retrofit service is programming to a contract; and small listener interfaces are interface segregation. The principles help explain why the guidance works and where to draw a new boundary when an app outgrows the template. They also warn against the opposite failure, a layer for every class that adds indirection without protecting a real rule.

## Code
```text
UI        Composable / Activity   renders state, sends events
Domain    Use case               business rule
Data      Repository (interface)  boundary owned by the caller
          Data sources           network, database, cache
```
