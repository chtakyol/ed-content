---
id: security-cleartext-traffic
topic: security/network
title: Turn cleartext traffic off
tags: [network, tls, cleartext, masvs-network-1, maswe-0026]
related: [security-network-security-config, security-certificate-pinning]
sources:
  - https://mas.owasp.org/MASWE/MASVS-NETWORK/MASWE-0026/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-NETWORK/MASTG-TEST-0235/
---

## Explanation
Apps targeting API 28 or higher already default to cleartext-blocked, but the default is easy to lose: a legacy library, a WebView, a socket, or an explicit `usesCleartextTraffic="true"` reopens it. MASWE-0026 is unencrypted traffic and MASTG-TEST-0235 checks the configuration. Be explicit in the network security config with `cleartextTrafficPermitted="false"` on the base config, and allow exceptions only for a specific debug domain in a debug-only override. If an internal service still speaks HTTP, fix the service rather than the app, because anything on the path can read and modify those requests, including tokens and personal data.

## Code
```xml
<!-- AndroidManifest.xml -->
<application
    android:networkSecurityConfig="@xml/network_security_config"
    android:usesCleartextTraffic="false" />

<!-- res/xml/network_security_config.xml -->
<network-security-config>
    <base-config cleartextTrafficPermitted="false">
        <trust-anchors>
            <certificates src="system" />
        </trust-anchors>
    </base-config>
</network-security-config>
```
