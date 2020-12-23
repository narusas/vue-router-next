# 파라메터를 동반한 동적 경로(Route) 매핑

매우 자주 주어진 패턴의 경로를 동일한 컴포넌트에 매핑해야합니다. 예를 들어 모든 사용자에 대해 렌더링 되어야 하지만, 사용자 ID가 다른 `User` 컴포넌트가 있을 수 있습니다. Vue Router에서는 이를 위해 경로에 동적 세그먼트를 사용할 수 있으며 이를 _param_이라고 합니다:

```js
const User = {
  template: '<div>User</div>',
}

// 다음 옵션을 `createRouter`에 전달합니다 
const routes = [
  // 동적 세그먼트는 콜론(:)으로 시작합니다. 
  { path: '/users/:id', component: User },
]
```

 이제 `/users/johnny` 와  `/users/jolyne` 같은 URL들은 모두 동일한 경로에 매핑됩니다.

A _param_ is denoted by a colon `:`. When a route is matched, the value of its _params_ will be exposed as `this.$route.params` in every component. Therefore, we can render the current user ID by updating `User`'s template to this:

_param_은 콜론 `:`으로 표시됩니다. 경로가 일치하면 _params_의 값이 모든 구성 요소에서 `this.$route.params`에 전달됩니다. 따라서 `User`의 템플릿을 다음과 같이 업데이트하여 현재 사용자 ID를 렌더링 할 수 있습니다.

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>',
}
```

동일한 경로에 여러 _params_가 있을 수 있으며 `$route.params`의 해당 필드에 매핑됩니다. 예제:

| pattern                        | matched path             | \$route.params                           |
| ------------------------------ | ------------------------ | ---------------------------------------- |
| /users/:username               | /users/eduardo           | `{ username: 'eduardo' }`                |
| /users/:username/posts/:postId | /users/eduardo/posts/123 | `{ username: 'eduardo', postId: '123' }` |

`$route.params` 외에도 `$ route` 객체는 `$route.query` (URL에 쿼리가있는 경우), `$route.hash` 등과 같은 다른 유용한 정보도 제공합니다. 자세한 내용은 [API 레퍼런스] (/api/#routelocationnormalized)에서 확인할 수 있습니다.

동작하는 데모는 다음에서 보실수 있습니다. [여기](https://codesandbox.io/s/route-params-vue-router-examples-mlb14?from-embed&initialpath=%2Fusers%2Feduardo%2Fposts%2F1).

<!-- <iframe
  src="https://codesandbox.io/embed//route-params-vue-router-examples-mlb14?fontsize=14&theme=light&view=preview&initialpath=%2Fusers%2Feduardo%2Fposts%2F1"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="Route Params example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe> -->

## Param 변경에 대응하기

매개 변수와 함께 경로를 사용할 때주의해야 할 점은 사용자가 `/users/johnny`에서 `/users/jolyne`으로 이동할 때 **동일한 컴포넌트 인스턴스가 재사용된다는 것입니다**. 두 경로 모두 동일한 구성 요소를 렌더링하므로 이전 인스턴스를 삭제 한 다음 새 인스턴스를 만드는 것보다 기존의 것을 재사용하는것이 효율적입니다. **그러나 이는 컴포넌트우의 라이브사이클 후크가 호출되지 않음을 의미합니다**.

동일한 컴포넌트의 매개 변수 변경에 반응하려면 `$route` 객체의 적절한 속성을 watch 하면 됩니다.(이 시나리오에서는 `$route.params`)

```js
const User = {
  template: '...',
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 경로 변경에 대응...
      }
    )
  },
}
```

또는 `beforeRouteUpdate` [네비게이션 가드](../advanced/navigation-guards.md)를 이용할수도 있습니다. 여기에서는 네비게이션을 취소 시킬수도 있습니다. 

```js
const User = {
  template: '...',
  async beforeRouteUpdate(to, from) {
    // 경로 변경에 대응...
    this.userData = await fetchUser(to.params.id)
  },
}
```

## 모든 오류 잡기 / 404 Not found 대응

Regular params will only match characters in between url fragments, separated by `/`. If we want to match **anything**, we can use a custom _param_ regexp by adding the regexp inside parentheses right after the _param_:


일반 params 는 '/'로 구분 된 URL 조각 사이의 문자와 만 일치합니다. **모든 항목**을 일치 시키려면 _param_ 바로 뒤에 괄호 안에 regexp를 추가하여 사용자 정의 _param_ regexp를 사용할 수 있습니다.

```js
const routes = [
  // 모든 경로에 매칭되되고, 매칭된 경로 정보를 `$route.params.pathMatch` 에 넣습니다. 
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  // `/user-`로 시작하는 모든 경오에 매칭되고, 매칭된 경로정보를 `$route.params.afterUser`에 넣습니다 
  { path: '/user-:afterUser(.*)', component: UserGeneric },
]
```
이 시나리오에서 괄호 사이에 [커스텀 정규표현식](/guide/essentials/route-matching-syntax.md#custom-regexp-in-params)를 사용하여, `pathMatch` param을 [선택적 반복](/guide/essentials/route-matching-syntax.md#optional-parameters)으로 만들수 있습니다. 이것은 `path`를 배열로 분할하여 필요한 경우 경로로 직접 이동할 수 있도록 하기 위한 것입니다.


```js
this.$router.push({
  name: 'NotFound',
  params: { pathMatch: this.$route.path.split('/') },
})
```

자세한 사항은 [반복된 params](/guide/essentials/route-matching-syntax.md#repeatable-params) 섹션을 참고 하세요. 

[히스토리 모드](./history-mode.md)를 사용하는 경우 지침에 따라 서버를 올바르게 구성해야합니다.


## 고급 매칭 패턴

Vue Router는 `express`에서 영감을 얻은 자체 경로 일치 문법을 사용합니다. 선택적 매개 변수, 0개 이상/하나 이상의 요구 사항, 심지어 사용자 지정 정규식 패턴과 같은 많은 고급 일치 패턴을 지원합니다. [Advanced Matching](./route-matching-syntax.md) 문서를 확인하세요.
