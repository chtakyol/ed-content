---
id: architecture-app-components
topic: architecture/components
title: The four app components
tags: [android, components, fundamentals]
related: [architecture-intents, architecture-manifest]
sources:
  - https://developer.android.com/guide/components/fundamentals
---

## Explanation
Android apps are assembled from four component types: activities, services, broadcast receivers, and content providers. Activities host a screen and its UI, services run work without a UI, broadcast receivers react to system-wide or app-wide events, and content providers expose structured data to other apps. Components are activated by the system through intents rather than by direct construction, and each can be started independently. State that must outlive one component belongs in the data layer or in saved state, not in a component field.

## Code
```kotlin
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { App() }
    }
}
```
