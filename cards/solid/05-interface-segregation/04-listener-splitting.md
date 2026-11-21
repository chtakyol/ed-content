---
id: solid-listener-splitting
topic: solid/isp
title: Splitting listeners
tags: [solid, isp, listeners]
related: [solid-role-interfaces, solid-isp-definition]
sources:
  - https://developer.android.com/guide/topics/ui/declaring-layout
---

## Explanation
A listener interface that combines unrelated callbacks forces every implementer to provide methods it does not care about. A `PlayerListener` with `onPlay`, `onPause`, `onSeek`, `onError`, and `onBuffering` makes a screen that only shows errors implement four empty methods. Split the listener into the events each client actually observes, or use separate callbacks or flows. In Kotlin, function properties or `Flow` are often more flexible than a multi-method listener, because a caller can subscribe only to what it needs. Keep a combined listener only when the events are genuinely consumed together and the order matters.

## Code
```kotlin
// One listener per concern.
fun interface OnPlaybackError {
    fun onError(message: String)
}

fun interface OnPlaybackProgress {
    fun onProgress(position: Long)
}

class PlayerView {
    var onError: OnPlaybackError? = null
    var onProgress: OnPlaybackProgress? = null
}
```
