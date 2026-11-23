---
id: security-consent-and-declarations
topic: security/privacy
title: Consent and the Data safety form
tags: [privacy, consent, play-console, masvs-privacy-3, maswe-0078]
related: [security-third-party-sdks, security-data-minimization, security-data-deletion]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PRIVACY/MASWE-0078/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
Consent is only meaningful if it happens before collection and if declining still leaves a usable app. MASWE-0078 is inadequate consent, MASWE-0072 and 0073 are a missing privacy policy and inaccurate data collection declarations. Initialize analytics, ads, and crash SDKs only after the consent state is known, and make "no" a real path rather than a screen that loops back. Your Play Data safety form must match what the app actually sends, including third-party SDKs, because a mismatch is both a policy risk and a signal that nobody audited the dependencies. Keep the privacy policy reachable in-app, describe retention and deletion, and version the consent text so you can prove which wording a user accepted.

## Code
```kotlin
// Gate every collecting SDK behind the stored decision.
if (consentRepository.state() == Consent.GRANTED) {
    analytics.start()
    crashReporting.enable()
    ads.initialize()
}

// Declining still works: core features, no tracking.
ConsentScreen(onAccept = { consentRepository.set(GRANTED); restartCollectors() },
              onDecline = { consentRepository.set(DENIED); startWithoutTracking() })
```
