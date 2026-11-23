---
id: security-token-storage
topic: security/authentication
title: Refresh tokens and logout
tags: [auth, tokens, sessions, masvs-auth-3, maswe-0024]
related: [security-oauth-pkce, security-unencrypted-private-storage, security-biometric-prompt]
sources:
  - https://mas.owasp.org/MASWE/MASVS-AUTH/MASWE-0024/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-AUTH/MASTG-TEST-0017/
---

## Explanation
Access tokens are short-lived; refresh tokens are the account. Store the refresh token encrypted with a Keystore key, never in plaintext prefs, and rotate it on every use so a stolen copy is detectable and useless after the legitimate client refreshes. MASWE-0024 is sensitive data still accessible after session termination and MASTG-TEST-0017 checks session handling. Logout has to do more than clear a ViewModel: revoke server-side, wipe the encrypted store, clear cookies and WebView storage, cancel in-flight work, and drop cached user data. Handle a failed refresh as a single event with a mutex, so ten parallel 401s do not launch ten refreshes and invalidate each other.

## Code
```kotlin
suspend fun logout() {
    runCatching { api.revokeRefreshToken(session.refreshToken) }
    sessionStore.clear()                       // encrypted DataStore
    CookieManager.getInstance().removeAllCookies(null)
    WebStorage.getInstance().deleteAllData()
    cacheDir.deleteRecursively()
    sessionState.set(SignedOut)
}

private val refreshMutex = Mutex()
suspend fun refreshIfNeeded(): Session = refreshMutex.withLock {
    if (session.isFresh()) session else api.refresh(session.refreshToken)
        .also(sessionStore::save) // rotated token
}
```
