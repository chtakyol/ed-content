---
id: flows-flow-vs-channel
topic: flows/channels
title: Flow vs Channel
tags: [flow, channel, comparison]
related: [flows-channel-basics, flows-shared-flow]
sources:
  - https://kotlinlang.org/docs/channels.html
---

## Explanation
A flow is a cold, declarative stream that is collected, while a channel is a hot, imperative queue that is sent to and received from. Collecting a flow starts its producer and gives one collector the values in order; receiving from a channel consumes values from a shared queue, so multiple receivers split the values instead of each seeing all of them. Flows bring operators, backpressure by suspension, and easy cancellation; channels bring explicit buffering, fan-out, and a close signal. Use a flow for data pipelines and a channel for communication between coroutines or for actor-style state.

## Code
```kotlin
val stream: Flow<Int> = flowOf(1, 2, 3)       // cold, collected
val queue: Channel<Int> = Channel()           // hot, sent to

queue.send(1)
val value = queue.receive()
```
