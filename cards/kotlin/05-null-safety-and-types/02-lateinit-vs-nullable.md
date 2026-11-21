---
id: kotlin-lateinit-vs-nullable
topic: kotlin/null-safety
title: lateinit vs nullable
tags: [kotlin, null-safety, initialization]
related: [kotlin-nullable-types, kotlin-delegates-in-viewmodels]
sources:
  - https://kotlinlang.org/docs/properties.html#late-initialized-properties-and-variables
---

## Explanation
A `lateinit var` promises that a non-null property will be assigned before it is read, which is useful when initialization happens in a lifecycle callback such as `onCreateView`. Reading it before assignment throws `UninitializedPropertyAccessException` instead of returning null. `lateinit` only works for mutable `var` properties of non-primitive types, and it cannot be used with nullable types or `val`. Prefer a nullable property with an explicit check, constructor injection, or `by lazy` when the initialization order is not guaranteed, because those options make the possible absence visible in the type.

## Code
```kotlin
class ArticleFragment : Fragment() {
    private lateinit var binding: FragmentArticleBinding

    override fun onCreateView(...): View {
        binding = FragmentArticleBinding.inflate(inflater)
        return binding.root
    }
}
```
