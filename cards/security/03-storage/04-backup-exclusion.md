---
id: security-backup-exclusion
topic: security/storage
title: Keep secrets out of backups
tags: [storage, backup, masvs-storage-2, maswe-0006]
related: [security-unencrypted-private-storage, security-encrypted-datastore, security-keys-not-in-app-package]
sources:
  - https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0006/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0216/
---

## Explanation
Auto Backup and device-to-device transfer copy app data off the device and restore it later, which quietly moves session tokens, cached PII, and database files into Google's cloud and onto a new phone. MASWE-0006 and MASTG-TEST-0216 target exactly this. The fix is explicit: turn off backup if the app has nothing worth restoring, or declare rules that exclude sensitive domains and paths. On API 31 and above the rules live in `dataExtractionRules`, with `fullBackupContent` as the fallback for older versions. Files written to `noBackupFilesDir` are excluded without any XML, which makes it the right home for keys, caches, and anything you would not want restored after a reinstall.

## Code
```xml
<!-- AndroidManifest.xml -->
<application
    android:allowBackup="true"
    android:dataExtractionRules="@xml/data_extraction_rules"
    android:fullBackupContent="@xml/backup_rules" />

<!-- res/xml/data_extraction_rules.xml -->
<data-extraction-rules>
    <cloud-backup>
        <exclude domain="sharedpref" path="session.xml" />
        <exclude domain="database" path="app.db" />
        <exclude domain="file" path="secure/" />
    </cloud-backup>
    <device-transfer>
        <exclude domain="sharedpref" path="session.xml" />
        <exclude domain="file" path="secure/" />
    </device-transfer>
</data-extraction-rules>
```
