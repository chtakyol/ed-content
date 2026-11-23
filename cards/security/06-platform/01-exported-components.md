---
id: security-exported-components
topic: security/platform
title: Export only what must be exported
tags: [platform, ipc, components, masvs-platform-1, maswe-0032]
related: [security-component-permissions, security-deep-links, security-pending-intents]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PLATFORM/MASWE-0032/
  - https://developer.android.com/privacy-and-security/security-tips
---

## Explanation
`android:exported="true"` lets any app on the device start your activity, service, or receiver, or query your provider, with whatever data it likes. Since API 31 the attribute is mandatory whenever a component has an intent filter, but the default for a component without one is still false, which is what you want. MASWE-0032 covers insecure intents and MASVS-PLATFORM-1 requires that sensitive functionality is not reachable by other apps. The launcher activity and a receiver for a system broadcast are legitimate exports; a debug menu, an internal share target, or a service that performs work on request are not. Audit the merged manifest, not just your source one, because libraries add components.

## Code
```xml
<!-- Only the launcher entry point is exported. -->
<activity
    android:name=".MainActivity"
    android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>

<activity android:name=".ShareReceiverActivity" android:exported="false" />
<service android:name=".SyncService" android:exported="false" />
<receiver android:name=".BootReceiver" android:exported="false">
    <intent-filter>
        <action android:name="android.intent.action.BOOT_COMPLETED" />
    </intent-filter>
</receiver>
```
