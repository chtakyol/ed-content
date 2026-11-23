---
id: security-data-deletion
topic: security/privacy
title: Deleting an account means deleting the data
tags: [privacy, deletion, retention, masvs-privacy-4, maswe-0076]
related: [security-consent-and-declarations, security-token-storage, security-backup-exclusion]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PRIVACY/MASWE-0076/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
Google Play requires an in-app path and a web URL for account deletion, and MASWE-0076 and 0077 cover data management and visibility controls. A deletion that only hides the profile is worse than no deletion, because the user believes the data is gone. Delete server-side, revoke tokens and sessions, and remove local copies: encrypted stores, databases, caches, downloaded files, and the WebView cookie jar. If backups were made, exclude or expire them, and make sure analytics and crash pipelines can honour erasure too. Offer export before deletion where regulation requires it, and log the deletion event without retaining the personal data it refers to.

## Code
```kotlin
suspend fun deleteAccount() {
    api.deleteAccount()                 // server erasure + token revocation
    sessionStore.clear()
    database.clearAllTables()
    cacheDir.deleteRecursively()
    noBackupFilesDir.deleteRecursively()
    CookieManager.getInstance().removeAllCookies(null)
    WebStorage.getInstance().deleteAllData()
    startActivity(Intent(context, GoodbyeActivity::class.java))
}
```
