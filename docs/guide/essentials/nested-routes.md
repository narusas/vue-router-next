# 중첩된 경로


어떤 애플리케이션들의  UI는 다중으로 중첩된 깊이를 가지는 컴포넌트로 구성됩니다. 이 경우 URL의 세그먼트가 중첩 된 컴포넌트의 특정 구조에 해당하는 것은 매우 일반적입니다. 예를 들면 다음과 같습니다.

```
/user/johnny/profile                     /user/johnny/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

Vue Router를 사용하면 중첩 된 경로 구성을 사용하여 이 관계를 표현할 수 있습니다.

지난 장에서 만든 앱을 고려하면 :

```html
<div id="app">
  <router-view></router-view>
</div>
```

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>',
}

// `createRouter`에 인자로 넘겨줍니다. 
const routes = [{ path: '/user/:id', component: User }]
```



여기서 `<router-view>`는 최상위 `router-view` 입니다. 최상위 경로와 일치하는 컴포넌트를 렌더링합니다. 마찬가지로 렌더링 된 컴포넌트에는 자체 중첩 된 `<router-view>`도 포함될 수 있습니다. 예를 들어 `User` 컴포넌트의 템플릿 안에 하나를 추가하면 :

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `,
}
```

중첩된 `router-view`로 컴포넌트를 렌더링하려면 모든 경로에서 `children` 옵션을 사용 해야 합니다.

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        //  /user/:id/profile 과 일치 할 때 User의 <router-view> 내부에서 UserProfile이 렌더링됩니다.
        path: 'profile',
        component: UserProfile,
      },
      {
        //  /user/:id/posts 과 일치 할 때 User의 <router-view> 내부에서 UserPosts이 렌더링됩니다.
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

**`/`로 시작하는 중첩 경로는 루트 경로로 처리됩니다. 이를 통해 중첩 된 URL을 사용하지 않고도 컴포넌트 중첩을 활용할 수 있습니다.**

보시다시피 `children` 옵션은 `routes` 처럼 또다른 경로 배열입니다. 따라서 필요한 만큼 중첩 뷰를 만들수 있습니다. 


이 시점에서 위의 구성으로 `/user/eduardo`를 방문하면 중첩 된 경로가 일치하지 않기 때문에 `User`의 `router-view` 내에 아무것도 렌더링되지 않습니다. 거기에서 무언가를 렌더링하고 싶을 수도 있습니다. 이 경우 빈 중첩 경로를 제공 할 수 있습니다.

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      //  /user/:id 과 일치 할 때 User의 <router-view> 내부에서 UserHome이 렌더링됩니다.
      { path: '', component: UserHome },

      // ...다른 하위 경로
    ],
  },
]
```

동작하는 데모는 [여기](https://codesandbox.io/s/nested-views-vue-router-4-examples-hl326?initialpath=%2Fusers%2Feduardo)에서 보실수 있습니다. 
