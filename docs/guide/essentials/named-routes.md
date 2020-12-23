# 이름을 가지는 라우트

`path`와 함께 모든 경로에 `name`을 제공 할 수 있습니다. 이것은 다음과 같은 장점이 있습니다.

- 하드코딩되지 않은 URL
- `params`의 자동 인코딩/디코딩 
- URL 타이핑 오류
- 경로 우선순위 무시 가능(e.g. to display a )

```js
const routes = [
  {
    path: '/user/:username',
    name: 'user',
    component: User
  }
]
```

이름을 가진 라우트에 링크하려면, 객체를 `router-link`, 컴포넌트의 `to` prop로 전달할 수 있습니다.


```html
<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>
```

이것은 `router.push()`와 프로그램적으로 사용되는 것과 정확히 같은 객체입니다.


```js
router.push({ name: 'user', params: { username: 'erina' } })
```

두 경우 모두 라우터는 `/user/erina` 경로로 이동합니다.

전체 예제는 [여기](https://github.com/vuejs/vue-router/blob/dev/examples/named-routes/app.js)
