---
id: security-network-security-config
topic: security/network
title: Trust anchors and the network security config
tags: [network, tls, trust-anchors, masvs-network-1, maswe-0027]
related: [security-cleartext-traffic, security-certificate-pinning, security-hostname-verification]
sources:
  - https://mas.owasp.org/MASTG/knowledge/android/MASVS-NETWORK/MASTG-KNOW-0014/
  - https://developer.android.com/privacy-and-security/security-config
---

## Explanation
The network security config decides which certificate authorities the app accepts, per domain. Since API 24, apps do not trust user-installed CAs by default, which is what stops a proxy from reading traffic; adding `<certificates src="user" />` to the production config gives that back. MASWE-0027 is insecure certificate validation. Keep `system` as the only anchor in the base config, and use `<debug-overrides>` for the proxy case because that block applies only to debuggable builds and cannot ship enabled. If you operate a private CA, scope it to the specific domain rather than globally, and remember that the config also governs WebView and most HTTP clients, so a single mistake applies everywhere.

## Code
```xml
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>

    <!-- debug builds only; ignored in release -->
    <debug-overrides>
        <trust-anchors>
            <certificates src="user" />
        </trust-anchors>
    </debug-overrides>

    <domain-config>
        <domain includeSubdomains="true">internal.example.com</domain>
        <trust-anchors>
            <certificates src="@raw/private_ca" />
        </trust-anchors>
    </domain-config>
</network-security-config>
```
