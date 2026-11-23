---
id: security-oauth-pkce
topic: security/authentication
title: OAuth with PKCE in a Custom Tab
tags: [auth, oauth, pkce, custom-tabs, masvs-auth-2]
related: [security-token-storage, security-deep-links]
sources:
  - https://mas.owasp.org/MASVS/controls/MASVS-AUTH-2/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
A native app cannot keep a client secret, and it must not collect the user's password in its own WebView. The correct flow is Authorization Code with PKCE, opened in a Custom Tab so the user sees the real authorization server and your app never sees credentials. MASVS-AUTH-2 covers protocol security. Use a well-tested library such as AppAuth rather than hand-rolling state and verifier handling: it generates a random `code_verifier`, sends `S256`, and validates `state` on return. Register the redirect URI as a verified HTTPS App Link where possible, since a custom scheme can be claimed by another app. Never use the implicit flow, and never inject tokens back into a WebView for the page to store.

## Code
```kotlin
val service = AuthorizationService(context)
val request = AuthorizationRequest.Builder(
    authConfig,
    clientId,
    ResponseTypeValues.CODE,
    Uri.parse("https://app.example.com/oauth2redirect"),
)
    .setScope("openid profile offline_access")
    .setCodeVerifier(PkceUtil.newCodeVerifier()) // S256 under the hood
    .build()

val intent = service.getAuthorizationRequestIntent(request)
customTabsLauncher.launch(intent) // not a WebView
```
