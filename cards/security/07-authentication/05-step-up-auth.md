---
id: security-step-up-auth
topic: security/authentication
title: Step-up auth for sensitive actions
tags: [auth, step-up, transactions, masvs-auth-1, maswe-0023]
related: [security-biometric-prompt, security-token-storage, security-defense-in-depth]
sources:
  - https://mas.owasp.org/MASWE/MASVS-AUTH/MASWE-0023/
  - https://mas.owasp.org/MASTG/tests/android/MASVS-AUTH/MASTG-TEST-0018/
---

## Explanation
Being logged in is not authorization for everything. Transferring money, changing a password, adding a payee, or viewing a full card number should require a fresh proof of presence, because a stolen unlocked phone otherwise gives full account control. MASWE-0023 is missing step-up authentication. Implement it as a server-issued challenge bound to the action and its parameters, satisfied by a biometric unlock or an OTP, and valid for one operation with a short expiry. The client must not be the one deciding whether step-up happened: send the challenge response to the server, and have the server reject the operation if it is missing, expired, or reused for a different amount.

## Code
```kotlin
suspend fun transfer(draft: Transfer): Result<Receipt> {
    val challenge = api.startTransfer(draft) // server binds amount + payee
    val proof = biometrics.sign(challenge.nonce) ?: return Result.failure(Denied)
    return api.confirmTransfer(challenge.id, proof) // single use
}

// Wrong: local flag, no server binding
if (userJustAuthenticated) api.transfer(draft.amount)
```
