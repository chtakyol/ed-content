---
id: di-hilt-components
topic: dependency-injection/hilt
title: Hilt components
tags: [di, hilt, components]
related: [di-hilt-setup, di-hilt-scopes]
sources:
  - https://developer.android.com/training/dependency-injection/hilt-android
---

## Explanation
Hilt organizes bindings into a hierarchy of components that follow Android lifecycles: `SingletonComponent` for the application, `ActivityRetainedComponent` for state that survives configuration changes, `ViewModelComponent`, `ActivityComponent`, `FragmentComponent`, and others. A binding installed in a component is available to that component and its children, not to its parents. This hierarchy is why an application-scoped dependency can be injected into an Activity but an Activity-scoped dependency cannot be injected into a singleton. Choose the narrowest component that matches the lifetime you need.

## Code
```text
SingletonComponent
 └─ ActivityRetainedComponent
     └─ ViewModelComponent
 └─ ActivityComponent
     └─ FragmentComponent
         └─ ViewComponent
```
