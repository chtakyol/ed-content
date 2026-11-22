---
id: dagger-android
topic: dependency-injection/dagger
title: Dagger on Android
tags: [di, dagger, android]
related: [dagger-basics, di-hilt-setup]
sources:
  - https://developer.android.com/training/dependency-injection/dagger-android
---

## Explanation
Plain Dagger does not know about Android lifecycles, so a Dagger-only app manually creates components in `Application`, `Activity`, or `Fragment` and injects framework objects after they are created. Dagger Android added `@ContributesAndroidInjector` and `AndroidInjector` to reduce that boilerplate, but it has been deprecated in favor of Hilt. For new code, use Hilt; for existing Dagger code, keep component creation at the lifecycle owner and migrate incrementally. The important rule is that a component must not outlive the objects whose references it holds.

## Code
```kotlin
class App : Application() {
    lateinit var component: AppComponent

    override fun onCreate() {
        super.onCreate()
        component = DaggerAppComponent.builder()
            .appModule(AppModule(this))
            .build()
    }
}

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        (application as App).component.inject(this)
        super.onCreate(savedInstanceState)
    }
}
```
