---
id: architecture-testing-viewmodels
topic: architecture/viewmodel
title: Testing ViewModels
tags: [viewmodel, testing, flow]
related: [architecture-viewmodel, architecture-testing-use-cases]
sources:
  - https://developer.android.com/topic/architecture/recommendations
---

## Explanation
ViewModels are tested on the JVM with `runTest` and fake dependencies. Test state transitions by sending actions and asserting on the exposed `StateFlow`, and use a test dispatcher so `stateIn` and `WhileSubscribed` behave deterministically. Avoid mocking the Android framework; if a ViewModel needs a context, the dependency probably belongs elsewhere. These tests cover screen logic without an emulator, which makes them some of the highest-value tests in the app.

## Code
```kotlin
@Test
fun `collects articles`() = runTest {
    val viewModel = NewsViewModel(
        FakeNewsRepository(listOf(article)),
    )

    val job = launch(UnconfinedTestDispatcher(testScheduler)) {
        viewModel.uiState.collect()
    }
    advanceUntilIdle()

    assertEquals(article, viewModel.uiState.value.articles.single())
    job.cancel()
}
```
