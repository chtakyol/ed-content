---
id: flows-channel-basics
topic: flows/channels
title: Channel basics
tags: [channel, queue, send]
related: [flows-flow-vs-channel, flows-produce]
sources:
  - https://kotlinlang.org/docs/channels.html
---

## Explanation
A `Channel` is a hot queue for passing values between coroutines: `send` puts a value in, `receive` takes one out, and either side suspends when the queue is full or empty. Unlike a flow, a channel is not a description of a stream; it is a live object that must be closed and whose values are distributed among receivers rather than broadcast to all of them. The default capacity is rendezvous, meaning a sender waits until a receiver is ready, and a buffered capacity lets senders run ahead.

## Code
```kotlin
val channel = Channel<Int>()

launch { channel.send(1); channel.close() }
for (value in channel) println(value)
```
