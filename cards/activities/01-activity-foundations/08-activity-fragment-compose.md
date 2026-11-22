---
id: activity-fragment-compose
topic: activities/foundations
title: Activity, Fragment, and Compose
tags: [activities, fragments, compose]
related: [activity-what-is-an-activity, compose-declarative-ui]
sources:
  - https://developer.android.com/guide/components/activities/intro-activities
  - https://developer.android.com/develop/ui/compose/mental-model
---

## Explanation
An Activity is the system entry point and window host; a Fragment is a reusable piece of UI with its own lifecycle that lives inside an Activity; a composable is a function that describes UI inside either. Compose does not replace the Activity, because the Activity still owns the window, intent, and lifecycle. Modern apps commonly use one Activity plus Compose navigation, while existing apps may host composables inside Fragments. Choose the smallest host that fits the screen and avoid layering all three without a reason, since each adds lifecycle complexity.

## Code
```kotlin
// Activity hosts Compose directly.
class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { App() }
    }
}

// Or a Fragment hosts Compose.
class ArticleFragment : Fragment() {
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?,
    ): View = ComposeView(requireContext()).apply {
        setContent { ArticleScreen() }
    }
}
```
