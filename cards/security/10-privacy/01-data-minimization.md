---
id: security-data-minimization
topic: security/privacy
title: Collect only what the feature needs
tags: [privacy, permissions, minimization, masvs-privacy-1, maswe-0066]
related: [security-identifiers, security-consent-and-declarations, security-third-party-sdks]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PRIVACY/MASWE-0066/
  - https://developer.android.com/training/permissions/requesting
---

## Explanation
Every permission and every field you collect is data you must protect, justify, and eventually delete. MASWE-0066 is inadequate permission management and MASVS-PRIVACY-1 asks for minimization. Ask at the moment of use, not at first launch, so the request has context and a denial is survivable. Prefer narrow APIs: the Photo Picker instead of `READ_MEDIA_IMAGES`, coarse location unless navigation truly needs precision, and `Bluetooth` scan results filtered by service UUID rather than a blanket scan. For each field in your analytics and crash reporting, write down the feature that needs it; if the answer is "it might be useful", remove it. A shorter data inventory is the cheapest privacy control there is.

## Code
```kotlin
// No storage permission needed for user-picked media.
val pickImage = registerForActivityResult(
    ActivityResultContracts.PickVisualMedia(),
) { uri -> uri?.let(::upload) }

// Ask in context, and degrade when denied.
when {
    hasCoarseLocation -> showNearby(coarse = true)
    else -> showManualCityPicker()
}
```
