---
id: security-dependency-vulnerabilities
topic: security/code-quality
title: Known-vulnerable dependencies
tags: [code, dependencies, supply-chain, masvs-code-2, maswe-0044]
related: [security-min-and-target-sdk, security-r8-and-build-hardening]
sources:
  - https://mas.owasp.org/MASWE/MASVS-CODE/MASWE-0044/
  - https://mas.owasp.org/MASTG/knowledge/android/MASVS-CODE/MASTG-KNOW-0004/
---

## Explanation
Most of an Android app is third-party code, and a single outdated transitive dependency can ship a parsing bug or a logging leak into every release. MASWE-0044 is dependencies with known vulnerabilities, and it is one of the few weaknesses you can find mechanically. Scan the resolved graph rather than the version catalog, because the vulnerable version is usually transitive. Run OSV-Scanner or OWASP Dependency-Check in CI, enable Dependabot or Renovate, and pin versions with Gradle dependency verification so a compromised repository cannot swap an artifact. Dynamic versions like `1.+` and snapshot repositories defeat both reproducibility and review.

## Code
```bash
# Scan source and resolved dependencies
osv-scanner -r .

# Or inside Gradle
./gradlew dependencyCheckAnalyze

# Fail the build on any vulnerable artifact
./gradlew app:dependencies --configuration releaseRuntimeClasspath

# Pin versions in the catalog; never use "+" or snapshots.
# implementation("com.squareup.okhttp3:okhttp:4.12.0")
```
