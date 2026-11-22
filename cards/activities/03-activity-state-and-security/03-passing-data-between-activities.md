---
id: activity-passing-data-between-activities
topic: activities/state
title: Passing data between activities
tags: [activities, intents, data]
related: [activity-parcelables-and-bundles, architecture-intents]
sources:
  - https://developer.android.com/guide/components/activities/intro-activities
---

## Explanation
Activities exchange data through intent extras, and the receiving activity reads them in `onCreate`. For a result, use the Activity Result API with `registerForActivityResult`, which replaces the deprecated `startActivityForResult` and handles process death more reliably. Keep the contract small: pass an id or a `Parcelable` argument object rather than the whole model. Validate incoming extras because an activity can be started by another app or restored with older data. In a single-activity Compose app, navigation arguments and a shared repository usually replace activity-to-activity extras.

## Code
```kotlin
val launcher = registerForActivityResult(StartActivityForResult()) { result ->
    if (result.resultCode == RESULT_OK) {
        val id = result.data?.getStringExtra("articleId")
    }
}

launcher.launch(Intent(this, PickerActivity::class.java))
```
