---
id: security-webview-tls-errors
topic: security/network
title: Do not proceed past an SSL error
tags: [network, webview, tls, masvs-network-1, maswe-0027]
related: [security-hostname-verification, security-webview-bridge]
sources:
  - https://mas.owasp.org/MASTG/tests/android/MASVS-NETWORK/MASTG-TEST-0284/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
`WebViewClient.onReceivedSslError` fires when the certificate chain, hostname, or date check fails. The default cancels the load; the common "fix" is to call `handler.proceed()`, which silently accepts a MITM certificate and is exactly what MASTG-TEST-0284 and MASWE-0027 are about. Never proceed, and never suppress the dialog with `handler.cancel()` plus a retry loop that hides the failure. If a staging environment needs a self-signed certificate, add that CA to the debug-only network security config and let the platform validate it properly. The same rule applies to `onReceivedClientCertRequest`: only answer with a key you intend to present to that specific origin.

## Code
```kotlin
webView.webViewClient = object : WebViewClient() {
    override fun onReceivedSslError(
        view: WebView,
        handler: SslErrorHandler,
        error: SslError,
    ) {
        // Never handler.proceed() – show a neutral error instead.
        handler.cancel()
        showError(R.string.connection_not_secure)
    }
}

webView.settings.apply {
    javaScriptEnabled = true        // only if the page needs it
    allowFileAccess = false
    allowContentAccess = false
    mixedContentMode = WebSettings.MIXED_CONTENT_NEVER_ALLOW
}
```
