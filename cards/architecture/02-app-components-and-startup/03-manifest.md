---
id: architecture-manifest
topic: architecture/components
title: The manifest and app entry points
tags: [android, manifest, entry-points]
related: [architecture-app-components, architecture-intents]
sources:
  - https://developer.android.com/guide/components/fundamentals
---

## Explanation
The manifest declares the app's package, components, permissions, hardware requirements, and entry points, and it tells the system which component can respond to which intent. The launcher activity is the app's main entry point, while exported components are reachable from other apps and must validate their input. Some configuration is also supplied by Gradle, but the manifest remains the contract the system reads before any app code runs, so a missing declaration looks like a component that does not exist.

## Code
```xml
<activity android:name=".MainActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
</activity>
```
