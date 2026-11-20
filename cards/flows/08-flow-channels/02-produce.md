---
id: flows-produce
topic: flows/channels
title: produce
tags: [produce, channel, builder]
related: [flows-channel-basics, flows-flow-vs-channel]
sources:
  - https://kotlinlang.org/docs/channels.html
---

## Explanation
`produce` starts a new coroutine that sends values into a `ReceiveChannel`, so the producer and the consumer can run independently. It is a structured-concurrency builder: the coroutine is a child of the scope that called it, and cancelling the channel or the scope cancels the producer. The returned channel can be iterated with `for` or `consumeEach`, and it must be closed or cancelled when no more values are coming, otherwise the consumer waits forever.

## Code
```kotlin
val channel = scope.produce {
    repeat(3) { send(it) }
}

for (value in channel) println(value)
```
