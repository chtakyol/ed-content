---
id: architecture-unidirectional-data-flow
topic: architecture/foundations
title: Unidirectional data flow
tags: [architecture, udf, events]
related: [architecture-udf, architecture-ui-state]
sources:
  - https://developer.android.com/topic/architecture
---

## Explanation
Unidirectional data flow means state flows down and events flow up. The state holder exposes an immutable UI state, the UI renders that state, and user input travels back as method calls. Only the state holder mutates state, and it does so in response to an action or new data, never because the UI wrote a field directly. Every screen change is therefore traceable to one input, contradictory updates from multiple writers disappear, and tests can assert that an action produces a specific state transition.

## Code
```kotlin
class CounterViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CounterUiState())
    val uiState: StateFlow<CounterUiState> = _uiState.asStateFlow()

    fun onIncrement() = _uiState.update { it.copy(count = it.count + 1) }
}
```
