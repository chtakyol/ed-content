---
id: flows-channel-flow
topic: flows/channels
title: channelFlow
tags: [channelflow, concurrency, send]
related: [flows-callback-flow, flows-callback-vs-channel-flow, flows-builder-rules]
sources:
  - https://kotlinlang.org/docs/coroutines-flow.html
---

## Explanation
`channelFlow` is a flow builder backed by a channel, which lifts the usual restriction that emissions must come from a single coroutine. Inside it you can launch children that call `send` concurrently, and the builder waits for all of them to finish before completing. That makes it the tool for producing values from several parallel jobs while still exposing the result as a normal cold `Flow`. Prefer it over trying to emit from a foreign coroutine inside `flow {}`.

## Code
```kotlin
fun loadBoth(): Flow<Data> = channelFlow {
    launch { send(api.loadA()) }
    launch { send(api.loadB()) }
}
```
