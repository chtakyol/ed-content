---
id: navigation-implicit-vs-explicit-deep-links
topic: app-navigation/deep-links
title: Implicit vs explicit deep links
tags: [navigation, deep-links, intents]
related: [navigation-deep-links, architecture-intents]
sources:
  - https://developer.android.com/guide/navigation/design/deep-link
---

## Explanation
An explicit intent names the exact component to start, so it is used inside the app or by a trusted caller that knows the class. An implicit intent describes an action and data URI, and the system chooses a component that can handle it, which is how external deep links, notifications, and web links enter the app. Navigation deep links are resolved through the activity's intent filter and then mapped to a destination. Because implicit links can come from anywhere, treat their arguments as untrusted, validate them, and avoid exporting destinations that should only be reachable internally.

## Code
```xml
<activity android:name=".MainActivity" android:exported="true">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="https" android:host="example.com" android:pathPrefix="/article" />
    </intent-filter>
</activity>
```
