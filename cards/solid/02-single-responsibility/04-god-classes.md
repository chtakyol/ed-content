---
id: solid-god-classes
topic: solid/srp
title: God classes
tags: [solid, srp, anti-pattern]
related: [oop-god-objects, solid-ui-vs-data-responsibilities]
sources:
  - https://martinfowler.com/bliki/GodClass.html
---

## Explanation
A god class is the most visible SRP violation: a class that accumulates every behavior because adding a method there is always the shortest path. In Android it often starts as an Activity or ViewModel that holds the adapter, the network call, the cache, the formatter, and the permission request. The class becomes the merge point for every feature, so parallel work collides and tests need the whole world to run. Refactoring starts by listing the reasons to change, then extracting one collaborator at a time, usually a state holder, a repository, a formatter, or a permission helper, while keeping the public behavior stable.

## Code
```kotlin
// Before
class MainActivity : AppCompatActivity() { /* everything */ }

// After: the screen coordinates small objects.
class ArticleViewModel(
    private val repository: ArticleRepository,
    private val analytics: Analytics,
) : ViewModel()

class ArticleFormatter(private val clock: Clock)
class ArticlePermissions(private val context: Context)
```
