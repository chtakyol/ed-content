---
id: activity-process-lifecycle
topic: activities/foundations
title: Process lifecycle
tags: [activities, lifecycle, process]
related: [activity-process-death-and-restoration, architecture-config-change-vs-process-death]
sources:
  - https://developer.android.com/guide/components/activities/process-lifecycle
---

## Explanation
The system keeps an app process alive as long as it is useful and kills it when memory is needed. Importance levels range from a foreground process with a resumed activity, through visible and service processes, down to cached processes that can be killed first. An activity lifecycle callback does not tell you when the process will die, so you cannot rely on `onDestroy` for persistence. Write important data as it changes, and treat process death as normal rather than exceptional.

## Code
```text
foreground   resumed activity          least likely to be killed
visible      paused but visible
service      running foreground service
cached       no visible components     first to be killed
```
