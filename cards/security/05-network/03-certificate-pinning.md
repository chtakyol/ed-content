---
id: security-certificate-pinning
topic: security/network
title: Certificate pinning, and when it hurts
tags: [network, pinning, tls, masvs-network-2, maswe-0028]
related: [security-network-security-config, security-hostname-verification]
sources:
  - https://mas.owasp.org/MASWE/MASVS-NETWORK/MASWE-0028/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-NETWORK/MASTG-TEST-0242/
---

## Explanation
Pinning ties your app to a specific certificate or public key so a compromised or coerced CA cannot impersonate your server. MASWE-0028 is insecure or missing pinning, and MASTG-TEST-0242 checks the config while 0243 checks for expired pins. It is also the control most likely to take your app offline: pin the intermediate or leaf and rotate the certificate without shipping a new pin, and every install stops connecting. The working pattern is to pin a backup key as well as the current one, set an explicit `expiration` so a stale app can recover, and treat pinning as defense in depth on top of correct TLS rather than a replacement for it. Skip it entirely if you cannot commit to the rotation process.

## Code
```xml
<domain-config>
    <domain includeSubdomains="true">api.example.com</domain>
    <pin-set expiration="2027-06-01">
        <!-- current key -->
        <pin digest="SHA-256">7HIpactkIAq2Y49orFOOQKurWxmmSFZhBCoQYcRhJ3Y=</pin>
        <!-- backup key, kept offline -->
        <pin digest="SHA-256">fwza0LRMXouZHRC8Ei+4PyuldPDcf3UKgO/04cDM1oE=</pin>
    </pin-set>
</domain-config>
```
