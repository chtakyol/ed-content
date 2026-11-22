---
id: di-hilt-overview
topic: dependency-injection/hilt
title: Hilt overview
tags: [di, hilt, dagger]
related: [di-hilt-setup, dagger-basics]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
---

## Explanation
Hilt is a dependency injection library built on Dagger that provides Android-specific components and removes much of Dagger's boilerplate. Annotate the application with `@HiltAndroidApp`, Android entry points with `@AndroidEntryPoint`, and injectable classes with `@Inject`. Modules declare how to provide interfaces and third-party types. Hilt generates the components and wires the graph at build time, so errors surface during compilation rather than at runtime. It is the recommended default for new Android apps that need DI.

## Code
```kotlin
@HiltAndroidApp
class App : Application()

@AndroidEntryPoint
class MainActivity : ComponentActivity() {
    @Inject lateinit var analytics: Analytics
}
```
