---
id: security-ui-data-leaks
topic: security/platform
title: Leaks through notifications, clipboard, and keyboards
tags: [platform, notifications, clipboard, privacy, maswe-0037]
related: [security-screenshots-and-recents, security-overlay-attacks, security-sensitive-logs]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PLATFORM/MASWE-0037/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0315/
---

## Explanation
Sensitive data leaks through channels that are easy to forget. A notification showing a message preview is visible on the lock screen, which is MASWE-0037 and MASTG-TEST-0315. A one-time code copied to the clipboard is readable by other apps on older versions and still appears in the clipboard history, so mark it with `ClipDescription.EXTRA_IS_SENSITIVE` on API 33 and avoid copying secrets at all where you can. Keyboard suggestion caches can retain what the user typed unless the field is set to no-suggestions, and autofill hints should tell the system which fields hold credentials. Review every screen that shows account data and decide, per field, whether the lock screen, clipboard, and keyboard should see it.

## Code
```kotlin
val notification = NotificationCompat.Builder(context, CHANNEL_MESSAGES)
    .setContentTitle("New message")
    .setContentText("Tap to view")
    .setVisibility(NotificationCompat.VISIBILITY_SECRET)
    .setPublicVersion(redactedNotification)
    .build()

// API 33+: keep OTPs out of clipboard previews/history
clipboard.setPrimaryClip(
    ClipData.newPlainText("code", code).apply {
        description.extras = PersistableBundle().apply {
            putBoolean(ClipDescription.EXTRA_IS_SENSITIVE, true)
        }
    },
)
```
