# 시작하기

Vue + Vue Router로 싱글 페이지 애플리케이션을 만드는 것은 자연스럽게 느껴집니다. Vue.js를 사용하고 있다면, 우리는 이미 컴포넌트로 애플리케이션을 구성하고 있습니다. Vue Router를 믹스에 추가 할 때 우리가 해야 할 일은 컴포넌트를 경로에 매핑하고 Vue Router에게 렌더링 할 위치를 알려주기만 하면 됩니다. 다음은 기초적인 예제입니다:

## HTML

```html
<script src="https://unpkg.com/vue@3"></script>
<script src="https://unpkg.com/vue-router@4"></script>

<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!--  router-link 컴포넌트를 네비게이션을 위해 사용합니다.  -->
    <!-- `to` prop에 가고자 하는 링크를 지정합니다.  -->
    <!-- `<router-link>` 는  `<a>` 태그에 정확한 `href` 속성을 가지게 렌더링 됩니다.  -->
    <router-link to="/">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <!-- route outlet -->
  <!-- 경로에 매칭되는 컴포넌트가 여기에 렌더링됩니다.  -->
  <router-view></router-view>
</div>
```

### `router-link`

일반 `a` 태그를 사용하는 대신 커스텀 컴포넌트  'router-link'를 사용하여 링크를 만드는 방법에 유의하세요. 이를 통해 Vue Router는 페이지를 다시로드하지 않고 URL을 변경하고 URL 생성 및 인코딩을 처리 할 수 ​​있습니다. 나중에 이러한 기능을 활용하는 방법을 살펴 보겠습니다.

### `router-view`

`router-view`는 URL에 해당하는 컴포넌트를 표시합니다. 레이아웃에 맞게 어디에나 배치 할 수 있습니다.

## JavaScript

```js
// 1. 경로(Route) 컴포넌트를 정의합니다 
// 다른 파일에 작성한후 임포트 해도 됩니다. 
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

// 2. 경로를 정의의 합니다. 
// 각각의 경로는 컴포넌트에 매핑되어야 합니다. 
// 중첩된 경로는 나중에 다루겠습니다. 
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

// 3. 라우터 인스턴스를 만들고 `routes` 옵션을 전달합니다.
// 옵션이 더 있지만 일단 여기에서는 단순하게 설명하겠습니다. 
const router = VueRouter.createRouter({
  // 4. 이력(History) 구현체를 제공합니다. 시작을 쉽게 하기 위해 해시(hash) 모드를 사용합니다.
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 에 대한 단축어입니다 
})

// 5. 루트 인스턴스를 만들고 마운트 합니다. 
const app = Vue.createApp({})
// 라우터 인스턴스를 _사용_ 하게 해서 전체 앱이 라우터 적용이 되게 합니다.
app.use(router)

app.mount('#app')

// 이제 앱이 시작되었습니다!
```

By calling `app.use(router)`, we get access to it as `this.$router` as well as the current route as `this.$route` inside of any component:
`app.use(router)`를 호출함으로써, 모든 컴포넌트에서 `this.$router` 를 통해 라우터에,`this.$route`를 통해 현재 경로에 접근할수 있습니다. 

```js
// Home.vue
export default {
  computed: {
    username() {
      // We will see what `params` is shortly
      return this.$route.params.username
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    },
  },
}
```


라우터 또는 `setup` 함수 내의 경로에 액세스하려면 `useRouter` 또는 `useRoute` 함수를 호출하세요. [컴포지션 API](/guide/advanced/composition-api.md#accessing-the-router-and-current-route-inside-setup)에서 이에 대해 자세히 알아볼 것입니다.

문서 전체에서 종종 `router` 인스턴스를 사용합니다. `this.$router`는 `createRouter`를 통해 생성 된 `router` 인스턴스를 직접 사용하는 것과 정확히 동일합니다. `this.$router`를 사용하는 이유는 라우팅을 조작 해야하는 모든 개별 컴포넌트에 에서 라우터 설정을 임포트 하고 싶지 않기 때문입니다. 