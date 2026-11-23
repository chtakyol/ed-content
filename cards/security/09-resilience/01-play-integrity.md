---
id: security-play-integrity
topic: security/resilience
title: Play Integrity as a signal, not a gate
tags: [resilience, integrity, attestation, masvs-resilience-2, maswe-0054]
related: [security-root-detection, security-app-signing, security-step-up-auth]
sources:
  - https://mas.owasp.org/MASWE/MASVS-RESILIENCE/MASWE-0054/
  - https://developer.android.com/google/play/integrity/verdicts
---

## Explanation
Play Integrity tells your server whether a request came from your unmodified app on a device that passes Google's checks. MASWE-0054 is missing device attestation and MASWE-0056 is missing app attestation; together they are the reason a banking app treats an unrecognized device differently. Request a token with a server-provided nonce and a `requestHash` covering the operation, and evaluate the verdicts on the server, never in the client. Treat the result as one input to a risk decision: `MEETS_STRONG_INTEGRITY` can unlock high-value actions, `MEETS_BASIC_INTEGRITY` can allow normal use with monitoring, and failure means step-up or refusal. Verdicts can be stale on cached responses, so never make them the only control.

## Code
```kotlin
val request = IntegrityTokenRequest.builder()
    .setNonce(serverNonce)                 // single use, server-issued
    .setCloudProjectNumber(projectNumber)
    .build()

integrityManager.requestIntegrityToken(request)
    .addOnSuccessListener { response ->
        // Send the token; the server decrypts and judges it.
        api.verifyIntegrity(token = response.token(), requestHash = opHash)
    }
```
