---
id: security-third-party-sdks
topic: security/privacy
title: Third-party SDKs run with your permissions
tags: [privacy, sdk, dependencies, masvs-privacy-2, maswe-0069]
related: [security-consent-and-declarations, security-dependency-vulnerabilities, security-data-minimization]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PRIVACY/MASWE-0069/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-STORAGE/MASTG-TEST-0004/
---

## Explanation
An SDK you add inherits your app's identity: it can read storage, phone home on its own schedule, and add permissions and receivers through manifest merging. MASWE-0069 is non-privacy-preserving functionality pulled in this way, and MASTG-TEST-0004 looks for data shared with embedded services. Review the merged manifest after every dependency bump, check what each SDK sends with a proxy, and initialize analytics and ad SDKs only after consent. Prefer first-party or minimal SDKs for anything that touches identifiers, contacts, or location, and pin versions so a background update cannot change behaviour. If an SDK requires an over-broad permission you do not otherwise need, that is a product decision to make explicitly, not a build error to ignore.

## Code
```bash
# What did the last dependency bump add?
./gradlew app:processReleaseManifest
grep -E "uses-permission|receiver|service" \
  app/build/intermediates/merged_manifest/release/AndroidManifest.xml

# What does it actually send? Run behind mitmproxy with
# <debug-overrides> enabled in a debuggable build.
```
