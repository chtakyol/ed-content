---
id: security-webview-bridge
topic: security/platform
title: WebView bridges expose native code
tags: [platform, webview, javascript-bridge, masvs-platform-2, maswe-0033]
related: [security-webview-tls-errors, security-deep-links]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PLATFORM/MASWE-0033/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0334/
---

## Explanation
`addJavascriptInterface` exposes every `@JavascriptInterface` method to any page the WebView loads, and if that page is third-party content, or if an attacker can inject a script, your native methods become their API. MASWE-0033, 0034, and 0035 cover native exposure, local file access, and untrusted content. Keep the bridge to first-party origin, and prefer `WebViewCompat.addWebMessageListener` with `allowedOriginRules`, which scopes messages to exact origins instead of trusting whatever is loaded. Turn off `allowFileAccess` and `allowContentAccess`, disable JavaScript unless the page needs it, load local content through `WebViewAssetLoader` rather than `file://`, and validate every message before it reaches business logic.

## Code
```kotlin
webView.settings.apply {
    javaScriptEnabled = true
    allowFileAccess = false
    allowContentAccess = false
    allowFileAccessFromFileURLs = false
    allowUniversalAccessFromFileURLs = false
}

WebViewCompat.addWebMessageListener(
    webView,
    "AndroidBridge",
    setOf("https://app.example.com"), // exact origin allowlist
) { _, message, sourceOrigin, isMainFrame, reply ->
    if (!isMainFrame) return@addWebMessageListener
    reply.postMessage(handle(message.data ?: ""))
}
```
