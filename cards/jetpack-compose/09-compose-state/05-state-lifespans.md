---
id: compose-state-lifespans
topic: jetpack-compose/state
title: State lifespans
tags: [compose, state, lifecycle]
related: [compose-remember, compose-remember-saveable]
sources:
  - https://developer.android.com/develop/ui/compose/state-lifespans
---

## Explanation
State can live in three scopes: the composition, the activity or destination, and the process. `remember` state lives only while the composable is in the composition, so it resets when the node leaves or the screen is recreated. `rememberSaveable` and a `ViewModel` survive configuration changes; a `ViewModel` does not survive process death, so saved state is needed for that. State that must outlive the process belongs in a repository, database, or DataStore. Choose the shortest lifespan that satisfies the requirement, because longer-lived state is harder to reset and test.

## Code
```text
composition     remember { }              lost when the node leaves
activity        ViewModel                 survives rotation
activity        rememberSaveable { }      survives rotation + process death
process         repository / DataStore    survives everything
```
