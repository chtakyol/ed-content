---
id: security-identifiers
topic: security/privacy
title: Device identifiers and tracking
tags: [privacy, identifiers, advertising-id, masvs-privacy-2, maswe-0068]
related: [security-data-minimization, security-third-party-sdks]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PRIVACY/MASWE-0068/
  - https://developer.android.com/training/articles/user-data-ids
---

## Explanation
Stable identifiers turn separate sessions into a profile, which is why MASWE-0068 treats incorrect use of tracking identifiers as a privacy weakness. IMEI, MAC address, and serial number are unavailable or restricted on modern Android, so apps that still try are scraping leftovers or fingerprinting. `ANDROID_ID` is scoped per app signing key, user, and device, which makes it stable for one install base but not a cross-app tracker. The Advertising ID is resettable and user-controllable; honour deletion and limit-ad-tracking signals. For analytics that do not need advertising, an `AppSet ID` or a server-issued pseudonymous ID is the better tool. Never build a fingerprint from screen, timezone, and sensors to work around a reset.

## Code
```kotlin
// Analytics: server-issued pseudonym, rotated on logout
val pseudoId = session.analyticsId // not derived from hardware

// Ads: resettable, user-controlled identifier; read it off the main thread
val adId = withContext(Dispatchers.IO) {
    AdvertisingIdClient.getAdvertisingIdInfo(context)
}
if (adId.isLimitAdTrackingEnabled) skipPersonalization()

// Wrong: hardware identifiers as a stable user key
TelephonyManager.getImei()   // restricted
WifiInfo.macAddress          // randomized / restricted
```
