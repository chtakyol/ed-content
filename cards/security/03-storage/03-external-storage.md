---
id: security-external-storage
topic: security/storage
title: External storage is public storage
tags: [storage, external-storage, scoped-storage, masvs-storage-1, maswe-0002]
related: [security-unencrypted-private-storage, security-backup-exclusion]
sources:
  - https://mas.owasp.org/MASWE/MASVS-STORAGE/MASWE-0002/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0200/
---

## Explanation
Anything written to shared external storage can be read by other apps with the right permissions, by a file manager, and by anyone holding the device, which is MASWE-0002. Even `getExternalFilesDir()` is not private in the way internal storage is: it survives uninstall on some paths, is reachable over USB on older versions, and is included in backup. With scoped storage the safe default is to keep app data internal, write to MediaStore only when the user is meant to own the file, and use the Storage Access Framework for user-chosen documents. Never put tokens, cached PII, or downloaded premium content outside the sandbox.

## Code
```kotlin
// Wrong: token in a world-reachable directory
File(context.getExternalFilesDir(null), "token.txt").writeText(token)

// Right: private file, or MediaStore for user-owned media
context.openFileOutput("token.bin", Context.MODE_PRIVATE).use { it.write(blob) }

val values = ContentValues().apply {
    put(MediaStore.Images.Media.DISPLAY_NAME, "receipt.jpg")
    put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg")
    put(MediaStore.Images.Media.RELATIVE_PATH, "Pictures/Receipts")
}
val uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values)
```
