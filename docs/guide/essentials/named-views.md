# 이름을 가지는 뷰

Sometimes you need to display multiple views at the same time instead of nesting them, e.g. creating a layout with a `sidebar` view and a `main` view. This is where named views come in handy. Instead of having one single outlet in your view, you can have multiple and give each of them a name. A `router-view` without a name will be given `default` as its name.

때로는 여러 개의 뷰를 중첩하지 않고 동시에 표시해야 하는 경우가 있습니다. `sidebar` 뷰와 `main` 뷰로 레이아웃을 생성합니다. 이름이 지정된 뷰가 편리한 경우 입니다. 뷰에 하나의 outlet이 있는 대신 여러 개를 사용하여 각 outlet에 이름을 지정할 수 있습니다. 이름이 없는 `router-view`는 이름으로 `default`가 주어집니다.


```html
<router-view class="view left-sidebar" name="LeftSidebar"></router-view>
<router-view class="view main-content"></router-view>
<router-view class="view right-sidebar" name="RightSidebar"></router-view>
```

뷰는 컴포넌트를 사용하여 렌더링 되므로 여러 뷰에는 동일한 라우트에 대해 여러 컴포넌트가 필요합니다. `components`(**s**를 붙입니다) 옵션을 사용해야합니다.


```js
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      components: {
        default: Home,
        // short for LeftSidebar: LeftSidebar
        LeftSidebar,
        // they match the `name` attribute on `<router-view>`
        RightSidebar,
      },
    },
  ],
})
```

이 예제는 [여기](https://codesandbox.io/s/named-views-vue-router-4-examples-rd20l)에서 확인할수 있습니다. 

## 중첩된 이름을 가지는 뷰

It is possible to create complex layouts using named views with nested views. When doing so, you will also need to give nested `router-view` a name. Let's take a Settings panel example:

중첩 된 뷰가있는 명명 된 뷰를 사용하여 복잡한 레이아웃을 만들 수 있습니다. 그렇게 할 때 중첩 된 `router-view`에 이름을 부여해야합니다. 설정 패널의 예를 살펴 보겠습니다

```
/settings/emails                                       /settings/profile
+-----------------------------------+                  +------------------------------+
| UserSettings                      |                  | UserSettings                 |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
| | Nav | UserEmailsSubscriptions | |  +------------>  | | Nav | UserProfile        | |
| |     +-------------------------+ |                  | |     +--------------------+ |
| |     |                         | |                  | |     | UserProfilePreview | |
| +-----+-------------------------+ |                  | +-----+--------------------+ |
+-----------------------------------+                  +------------------------------+
```

- `Nav` 는 보통의 컴포넌트입니다. 
- `UserSettings` 는 부모 뷰 컴포넌트입니다. 
- `UserEmailsSubscriptions`, `UserProfile`, `UserProfilePreview` 는 중첩된 뷰 컴포넌트입니다. 

**Note**: _여기에서는 HTML/CSS등은 잠시 잊어주세요_


위 레이아웃에서 `UserSettings` 구성 요소의 `<template>` 섹션은 다음과 같습니다.

```html
<!-- UserSettings.vue -->
<div>
  <h1>User Settings</h1>
  <NavBar />
  <router-view />
  <router-view name="helper" />
</div>
```

그런 다음이 경로 구성으로 위의 레이아웃을 얻을 수 있습니다.

```js
{
  path: '/settings',
  component: UserSettings,
  children: [{
    path: 'emails',
    component: UserEmailsSubscriptions
  }, {
    path: 'profile',
    components: {
      default: UserProfile,
      helper: UserProfilePreview
    }
  }]
}
```

전체 예제는 [여기](https://codesandbox.io/s/nested-named-views-vue-router-4-examples-re9yl?&initialpath=%2Fsettings%2Femails)에서 확인할수 있습니다.
