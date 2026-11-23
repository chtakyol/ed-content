---
id: security-sensitive-logs
topic: security/storage
title: Tokens do not belong in logcat
tags: [storage, logging, masvs-storage-1, maswe-0005]
related: [security-backup-exclusion, security-unencrypted-private-storage]
sources:
  - https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0005/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0203/
---

## Explanation
Logcat is readable over adb, captured in bug reports, and mirrored by crash and analytics SDKs, so a token printed once becomes a long-lived credential. MASWE-0005 is sensitive data in logs, checked by MASTG-TEST-0203 and 0231. The first rule is to not log payloads, headers, or user identifiers at all; the second is to gate the logging facade behind `BuildConfig.DEBUG` so release builds emit nothing. HTTP client interceptors deserve special attention because `HttpLoggingInterceptor(BODY)` prints authorization headers and request bodies. If you need observability in production, log event names and opaque IDs, and redact at the source rather than filtering downstream.

## Code
```kotlin
// One facade; release builds compile the body out.
object Log {
    fun d(tag: String, message: () -> String) {
        if (BuildConfig.DEBUG) android.util.Log.d(tag, message())
    }
}

// Redact before the interceptor sees it.
val logging = HttpLoggingInterceptor().apply {
    level = if (BuildConfig.DEBUG) Level.BASIC else Level.NONE
    redactHeader("Authorization")
    redactHeader("Cookie")
}
```
