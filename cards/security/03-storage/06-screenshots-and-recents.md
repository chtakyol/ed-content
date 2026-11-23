---
id: security-screenshots-and-recents
topic: security/storage
title: Screenshots and the Recents thumbnail
tags: [storage, screenshots, recents, masvs-platform-2, maswe-0038]
related: [security-ui-data-leaks, security-overlay-attacks]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PLATFORM/MASWE-0038/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0289/
---

## Explanation
Screens showing a card number, a medical record, or a one-time code leak through two channels: the Recents snapshot the system takes when the app backgrounds, and screenshots or screen recording by other software. MASWE-0038 covers both. `FLAG_SECURE` on the window blanks the Recents thumbnail and blocks capture, which is the right default for any sensitive screen. On API 33 and above, `setRecentsScreenshotEnabled(false)` hides only the thumbnail while still allowing the user to take their own screenshots, a better fit for receipts and statements. Apply this per screen, not globally, or you break sharing and accessibility features users expect.

## Code
```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    if (isSensitiveScreen) {
        window.setFlags(
            WindowManager.LayoutParams.FLAG_SECURE,
            WindowManager.LayoutParams.FLAG_SECURE,
        )
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            setRecentsScreenshotEnabled(false) // thumbnail only
        }
    }
}
```
