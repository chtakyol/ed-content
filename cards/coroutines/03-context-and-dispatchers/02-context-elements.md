---
id: coroutines-context-elements
topic: coroutines/context
title: Context elements
tags: [context, job, name, exception-handler]
related: [coroutines-dispatchers]
sources:
  - https://kotlinlang.org/docs/coroutine-context-and-dispatchers.html
---

## Explanation
Four elements account for almost everything you put in a context. The `Job` is the coroutine's identity and lifetime, and it is always present. The dispatcher, stored under `ContinuationInterceptor`, decides where the coroutine resumes. `CoroutineName` is a label used in debugging and thread names. `CoroutineExceptionHandler` handles exceptions that would otherwise reach the thread's default handler. Because each has its own key, they coexist in one context, and you read any of them back by asking for its key.

## Code
```kotlin
val name = coroutineContext[CoroutineName]?.name
val job = coroutineContext[Job]
```
