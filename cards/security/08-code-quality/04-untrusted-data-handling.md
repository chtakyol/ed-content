---
id: security-untrusted-data-handling
topic: security/code-quality
title: Untrusted data and dynamic code
tags: [code, deserialization, intents, masvs-code-3, maswe-0050]
related: [security-exported-components, security-content-providers, security-deep-links]
sources:
  - https://mas.owasp.org/MASWE/MASVS-CODE/MASWE-0050/
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0064/
---

## Explanation
Any data arriving from another app, a deep link, a notification, or the network is attacker-controlled, and the dangerous part is what your code does with it afterwards. MASWE-0050 is unsafe handling of untrusted data; MASWE-0049 is unsafe dynamic code loading. Two patterns deserve outright bans: deserializing Java objects from an untrusted source with `ObjectInputStream` or accepting arbitrary `Serializable` extras, and loading dex or native code from a path an attacker can write, such as external storage. Parse into typed fields with explicit bounds, resolve file paths against a fixed directory and canonicalize them, and load code only from the APK you signed.

## Code
```kotlin
// Wrong: the caller controls the class graph and the file path
val payload = intent.getSerializableExtra("data") as Payload
DexClassLoader(file.absolutePath, cacheDir.path, null, classLoader)

// Right: typed, bounded, canonical
val id = intent.getStringExtra("id")?.takeIf { ID.matches(it) } ?: return
val file = File(filesDir, "exports").resolve(name).canonicalFile
require(file.path.startsWith(filesDir.canonicalPath + File.separator))
```
