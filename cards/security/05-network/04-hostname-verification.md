---
id: security-hostname-verification
topic: security/network
title: Never disable hostname verification
tags: [network, tls, hostname, masvs-network-1, maswe-0027]
related: [security-network-security-config, security-webview-tls-errors]
sources:
  - https://mas.owasp.org/MASTG/tests/android/MASVS-NETWORK/MASTG-TEST-0283/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
A valid certificate only proves that some CA signed a key; hostname verification proves the key belongs to the host you asked for. The classic workaround for a staging certificate, a custom `X509TrustManager` that accepts everything plus a `HostnameVerifier { _, _ -> true }`, disables both checks and turns every TLS connection into an encrypted tunnel to whoever is on the network. MASWE-0027 covers this and MASTG-TEST-0282 and 0283 look for it. Fix the certificate or the trust store instead: add the private CA to the network security config scoped to that domain, or use a debug override. If you truly need custom validation, delegate to the platform verifier rather than reimplementing it.

## Code
```kotlin
// Wrong: accepts any certificate from any host
val unsafe = object : X509TrustManager {
    override fun checkServerTrusted(chain: Array<X509Certificate>, authType: String) = Unit
    override fun checkClientTrusted(chain: Array<X509Certificate>, authType: String) = Unit
    override fun getAcceptedIssuers() = emptyArray<X509Certificate>()
}
builder.hostnameVerifier { _, _ -> true }

// Right: keep the defaults, scope trust in config instead
OkHttpClient.Builder().build() // platform trust + hostname checks
```
