---
id: security-overlay-attacks
topic: security/platform
title: Overlay and tapjacking attacks
tags: [platform, overlay, tapjacking, masvs-platform-2, maswe-0039]
related: [security-ui-data-leaks, security-screenshots-and-recents]
sources:
  - https://mas.owasp.org/MASWE/MASVS-PLATFORM/MASWE-0039/
  - https://mas.owasp.org/MASTG/best-practices/MASTG-BEST-0040/
---

## Explanation
An overlay attack draws another window on top of yours, so the user taps what they think is your "Pay" button while the touch lands on the attacker's transparent view. On Android the standard mitigation is `android:filterTouchesWhenObscured="true"`, or the equivalent check in `onFilterTouchEventForSecurity`, which drops touches while another window is on top. On API 31 and above, `setHideOverlayWindows(true)` goes further and hides other apps' overlays while your window is focused, which is the right choice for payment and authentication screens. MASWE-0039 is overlay vulnerability and MASTG-TEST-0035 and 0340 test it. Apply the protection per sensitive screen so you do not break legitimate floating UI.

## Code
```xml
<activity
    android:name=".PaymentActivity"
    android:exported="false"
    android:filterTouchesWhenObscured="true" />
```
