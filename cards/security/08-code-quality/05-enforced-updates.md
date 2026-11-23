---
id: security-enforced-updates
topic: security/code-quality
title: Forcing updates for dangerous versions
tags: [code, updates, in-app-update, masvs-code-1, maswe-0043]
related: [security-min-and-target-sdk, security-r8-and-build-hardening]
sources:
  - https://mas.owasp.org/MASWE/MASVS-CODE/MASWE-0043/
  - https://developer.android.com/guide/playcore/in-app-updates
---

## Explanation
Every shipped version is a version you must support, and old builds keep working long after you have fixed the vulnerability they contain. MASWE-0043 is missing enforced updating. Two mechanisms cover it: Play In-App Updates with an immediate flow for critical releases, and a server-side minimum version check that returns a distinct error the client turns into a blocking screen. The server check is the one that actually holds, because it applies on any distribution channel and cannot be skipped by ignoring the Play dialog. Fail closed on that check, pin the version from the signed build rather than a client-supplied header, and keep a narrow grace window so a bad rollout does not brick every user at once.

## Code
```kotlin
// Server: reject requests from builds below the supported minimum.
if (request.buildVersion < config.minSupportedVersion) {
    return Response.status(426) // Upgrade Required
        .entity(UpgradeInfo(minVersion = config.minSupportedVersion))
        .build()
}

// Client: immediate in-app update for critical releases.
appUpdateManager.startUpdateFlowForResult(
    info,
    AppUpdateOptions.newBuilder(AppUpdateType.IMMEDIATE).build(),
    activity,
    REQUEST_UPDATE,
)
```
