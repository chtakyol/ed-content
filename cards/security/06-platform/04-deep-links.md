---
id: security-deep-links
topic: security/platform
title: Deep links are untrusted input
tags: [platform, deep-links, app-links, masvs-platform-2, maswe-0029]
related: [security-exported-components, security-component-permissions, security-webview-bridge]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PLATFORM/MASWE-0029/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0028/
---

## Explanation
A custom scheme like `myapp://` can be registered by any app, so an attacker can intercept the link and receive its parameters, and can also send your app links it never expected. MASWE-0029 is insecure deep links and MASTG-TEST-0028 tests them. Prefer verified HTTPS App Links with `android:autoVerify="true"` and a published `assetlinks.json`, which binds the host to your signing certificate. Regardless of scheme, treat every parameter as hostile: validate the shape, authorize the action server-side, and never let a link directly grant a session, change an account, or open an arbitrary internal screen. Never forward a received intent to another component; read the validated parameters and build a new explicit intent with `Intent(this, OrderActivity::class.java)`, since forwarding is intent redirection.

## Code
```xml
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="app.example.com" />
</intent-filter>

<!-- plus https://app.example.com/.well-known/assetlinks.json
     listing your package name and release SHA-256 fingerprint -->
```
