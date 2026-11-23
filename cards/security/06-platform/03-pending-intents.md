---
id: security-pending-intents
topic: security/platform
title: PendingIntents are capabilities
tags: [platform, pendingintent, ipc, masvs-platform-1, maswe-0032]
related: [security-exported-components, security-component-permissions]
sources:
  - https://mas.owasp.org/MASTG/knowledge/android/MASVS-PLATFORM/MASTG-KNOW-0024/
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0063/
---

## Explanation
A `PendingIntent` is a pre-authorized action that another app can fire with your app's identity and permissions, so treat it as a capability you are handing out. Two rules prevent the classic bugs: make the inner intent explicit, and make the pending intent immutable with `FLAG_IMMUTABLE`, which has been required for targetSdk 31+ and is the default expectation since. A mutable pending intent lets the receiver fill in the component or extras, which is intent redirection and can reach unexported components with attacker data. MASWE-0032 and MASTG-TEST-0030 cover this. Use `FLAG_MUTABLE` only when a system feature genuinely needs to fill in extras, and then never combine it with an implicit base intent.

## Code
```kotlin
val intent = Intent(context, UploadService::class.java).apply {
    action = ACTION_RETRY
    putExtra(EXTRA_ID, id) // fixed by you, not by the caller
}

val pending = PendingIntent.getService(
    context,
    REQUEST_RETRY,
    intent,
    PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT,
)

// Wrong: implicit + mutable
// PendingIntent.getActivity(ctx, 0, Intent(ACTION_VIEW), FLAG_MUTABLE)
```
