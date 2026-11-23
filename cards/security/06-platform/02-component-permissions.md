---
id: security-component-permissions
topic: security/platform
title: Guard exported components with permissions
tags: [platform, permissions, ipc, masvs-platform-1, maswe-0018]
related: [security-exported-components, security-deep-links, security-content-providers]
sources:
  - https://mas.owasp.org/MASWE/MASVS-AUTH/MASWE-0018/
  - https://developer.android.com/guide/topics/permissions/defining
---

## Explanation
Sometimes a component must be reachable by another app, for example a widget host, a share target, or a companion app. When that happens, do not leave it open: declare your own permission with `protectionLevel="signature"` so only apps signed with your key can hold it, and put `android:permission` on the component. MASWE-0018 is missing authentication or authorization on app components, and an exported component with no permission is exactly that. If the caller is a real third party, use a normal or dangerous permission you define, check `checkCallingPermission()` at runtime before doing work, and still validate the payload. A permission you define but never check grants nothing; a permission with `protectionLevel="normal"` is granted to every app that asks.

## Code
```xml
<permission
    android:name="com.example.app.permission.SYNC"
    android:protectionLevel="signature" />

<service
    android:name=".SyncService"
    android:exported="true"
    android:permission="com.example.app.permission.SYNC" />
```
