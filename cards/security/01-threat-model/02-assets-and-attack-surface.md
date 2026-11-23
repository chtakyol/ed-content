---
id: security-assets-and-attack-surface
topic: security/threat-model
title: Assets and attack surface
tags: [threat-model, assets, attack-surface]
related: [security-client-is-untrusted, security-stride-for-android]
sources:
  - https://mas.owasp.org/MASVS/03-Using_the_MASVS/
  - https://developer.android.com/privacy-and-security/security-best-practices
---

## Explanation
A threat model starts by naming what is worth stealing and where an attacker can reach it. Assets are credentials and tokens, personal and payment data, entitlement and content, and the integrity of what the app displays. The attack surface is everything the app accepts from outside: exported components, deep links and intent filters, content providers, files and intents received from other apps, the network, WebViews, push payloads, and third-party SDKs that run with your permissions. Rank each surface by exposure and impact, then spend effort where both are high. Printing this list once per feature is more useful than a generic checklist applied at release time.

## Code
```text
Asset                         Surface
session/refresh token      ->  DataStore, backups, logs
user PII                   ->  Room, analytics SDK, notifications
order/price integrity      ->  client-supplied amount in request body
content entitlement        ->  local flags, offline cache
auth decisions             ->  exported activity, deep link params
```

