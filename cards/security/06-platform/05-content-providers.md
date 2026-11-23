---
id: security-content-providers
topic: security/platform
title: Content providers and URI grants
tags: [platform, content-provider, fileprovider, sql-injection, maswe-0050]
related: [security-exported-components, security-component-permissions, security-external-storage]
sources:
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0049/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-PLATFORM/MASTG-TEST-0355/
---

## Explanation
A provider is a query interface into your data, and an exported one without permissions lets other apps read or write it, which is MASWE-0018 territory. Providers also take a `selection` string that is concatenated into SQL, so untrusted input passed straight through becomes SQL injection, MASWE-0050 and MASTG-TEST-0355. Share files with `FileProvider` and per-URI grants (`FLAG_GRANT_READ_URI_PERMISSION`) instead of exporting the provider or handing out a file path, and keep the provider itself `exported="false"` with `grantUriPermissions="true"`. Inside your own provider, use bind arguments and `SQLiteQueryBuilder.setStrict(true)` so a hostile selection cannot widen the query.

## Code
```text
<!-- AndroidManifest.xml -->
<provider
    android:name="androidx.core.content.FileProvider"
    android:authorities="${applicationId}.files"
    android:exported="false"
    android:grantUriPermissions="true">
    <meta-data
        android:name="android.support.FILE_PROVIDER_PATHS"
        android:resource="@xml/file_paths" />
</provider>

// sharing a file, grant scoped to the receiving app
val uri = FileProvider.getUriForFile(context, "${context.packageName}.files", file)
val share = Intent(Intent.ACTION_SEND)
    .setType("image/jpeg")
    .putExtra(Intent.EXTRA_STREAM, uri)
    .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
```
