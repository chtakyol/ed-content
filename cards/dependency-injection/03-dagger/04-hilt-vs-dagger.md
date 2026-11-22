---
id: dagger-hilt-vs-dagger
topic: dependency-injection/dagger
title: Hilt vs Dagger
tags: [di, hilt, dagger, comparison]
related: [di-hilt-overview, dagger-basics]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
  - https://developer.android.com/training/dependency-injection/dagger-basics
---

## Explanation
Dagger is the underlying compile-time DI engine; Hilt is an Android-specific layer that generates the standard components, lifecycle integrations, and test setup. Hilt removes most manual component creation and enforces sensible scopes, which makes it the better default for application code. Plain Dagger remains useful for non-Android modules, libraries that cannot depend on Hilt, or teams with an existing Dagger graph. The concepts transfer: both use `@Inject`, modules, qualifiers, and scopes, so a Dagger codebase can migrate to Hilt incrementally rather than all at once.

## Code
```text
Dagger                     Hilt
@Component                 generated components
manual injection           @AndroidEntryPoint
custom scopes              @Singleton, @ActivityScoped, ...
manual test setup          @HiltAndroidTest
```
