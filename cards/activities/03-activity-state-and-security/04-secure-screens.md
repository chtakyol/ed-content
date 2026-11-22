---
id: activity-secure-screens
topic: activities/state
title: Secure screens
tags: [activities, security, privacy]
related: [activity-recents-screen, activity-what-is-an-activity]
sources:
  - https://developer.android.com/guide/components/activities/secure-bal
---

## Explanation
`WindowManager.LayoutParams.FLAG_SECURE` prevents an activity's content from appearing in screenshots, screen recordings, and the recents snapshot. Apply it to screens that show sensitive data such as payment details, personal documents, or one-time codes, and remove it when the screen no longer needs protection. On Android 13 and later, `setRecentsScreenshotEnabled(false)` hides only the recents snapshot while leaving screenshots possible. Security is more than a flag: avoid logging sensitive values, and remember that a determined user can still photograph the screen.

## Code
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    window.setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE,
    )
}
```
