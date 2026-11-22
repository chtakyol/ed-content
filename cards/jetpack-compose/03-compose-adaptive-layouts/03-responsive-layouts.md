---
id: compose-responsive-layouts
topic: jetpack-compose/adaptive-layouts
title: Responsive layouts
tags: [compose, adaptive, layouts]
related: [compose-window-size-classes, compose-list-detail]
sources:
  - https://developer.android.com/develop/ui/compose/build-adaptive-apps
---

## Explanation
Responsive Compose layouts use constraints rather than fixed sizes. `Row`, `Column`, and `Box` distribute space, weights share it, and `BoxWithConstraints` exposes the measured maximum width and height when a layout needs a real breakpoint. Prefer flexible modifiers such as `fillMaxWidth`, `weight`, and `widthIn` over hard-coded dp values, and switch between arrangements when the available width crosses a meaningful threshold. The goal is a layout that remains usable from a small phone to a desktop window without a separate implementation per device.

## Code
```kotlin
BoxWithConstraints {
    if (maxWidth < 600.dp) {
        Column { ArticleList(); ArticleDetail() }
    } else {
        Row {
            ArticleList(Modifier.weight(1f))
            ArticleDetail(Modifier.weight(2f))
        }
    }
}
```
