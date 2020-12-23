---
sidebarDepth: 0
---

# 프로그래밍 방식 네비게이션


`<router-link>`를 사용하여 선언적 네비게이션용 anchor 태그를 만드는 것 외에도 라우터의 인스턴스 메소드를 사용하여 프로그래밍으로 이를 수행 할 수 있습니다.

## 다른 위치로 이동하기

**참고: Vue 인스턴스 내부에서 `$router`로 라우터 인스턴스에  액세스 할 수 있습니다. 그래서 `this.$router.push`를 사용 할 수 있습니다.**

To navigate to a different URL, use `router.push`. This method pushes a new entry into the history stack, so when the user clicks the browser back button they will be taken to the previous URL.

다른 URL로 이동하려면 `router.push`를 사용하십시오. 이 메소드는 새로운 항목을 히스토리 스택에 넣기 때문에 사용자가 브라우저의 뒤로 가기 버튼을 클릭하면 이전 URL로 이동하게된다.

이것은 `<router-link>`를 클릭 할 때 내부적으로 호출되는 메소드이므로 `<router-link :to="...">`를 클릭하면 `router.push(...)`를 호출하는 것과 같습니다.

| 선언적 방식                  | 프로그래밍 방식        |
|---------------------------|--------------------|
| `<router-link :to="...">` | `router.push(...)` |

전달인자는 문자열 경로 또는 로케이션 디스크립터 객체가 될 수 있습니다.


```js
// 리터럴 string
router.push('home')

// object
router.push({ path: 'home' })

// 이름을 가지는 라우트
router.push({ name: 'user', params: { userId: 123 }})

// 쿼리와 함께 사용, 결과는 /register?plan=private 입니다.
router.push({ path: 'register', query: { plan: 'private' }})

// 해시와 함께 사용, 결과는 /about#team
router.push({ path: '/about', hash: '#team' })
```

**참고**: `path`가 제공되면 `params`는 무시됩니다. 위의 예에서 볼 수 있듯이 `query`의 경우는 다릅니다. 대신 경로의 `name` 을 제공하거나 매개 변수를 사용하여 전체 `path`를 수동으로 지정해야합니다.


```js
const username = 'eduardo'
// 수동으로 url을 만들기 때문에 url인코딩에 대해 직접 처리해야 함 
router.push(`/user/${username}`) // -> /user/eduardo
// 동일함
router.push({ path: `/user/${username}` }) // -> /user/eduardo
// 라우트이름(`name`)과 매개변수(`param`)를 사용하면 URL 인코딩을 자동으로 해줍니다. 
router.push({ name: 'user', params: { username } }) // -> /user/eduardo
// `path`를 사용하면 `params`을 동시에 사용할수 없습니다. 
router.push({ path: '/user', params: { username } }) // -> /user
```

prop `to`는 `router.push`와 같은 종류의 객체를 받아 들이기 때문에 똑같은 규칙이 둘 다 적용됩니다.



`router.push` 및 다른 모든 탐색 메서드는 탐색이 완료 될 때까지 기다릴 수 있고 성공 또는 실패 여부를 알 수있는 _Promise_를 반환합니다. [네비게이션 처리](../advanced/navigation-handling.md) 에서 더 자세히 설명하겠습니다.

## 현재 위치 변경하기


`router.push`처럼 작동하지만 유일한 차이점은 이름에서 알 수 있듯이 새 히스토리 항목을 추가하지 않고 이동합니다. 현재 항목을 대체합니다.


| 선언적 방식                          | 프로그래밍 방식c          |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

`router.push`에 전달되는 `routeLocation` 에 `replace: true` 속성을 직접 추가 할 수도 있습니다.

```js
router.push({ path: '/home', replace: true })
// 동일함
router.replace({ path: '/home' })
```

## 히스토리 이동

이 메서드는 `window.history.go(n)`과 유사하게 히스토리 스택에서 앞으로 또는 뒤로 이동할 단계 수를 나타내는 매개 변수로 단일 정수를 사용합니다.

Examples

```js
// router.forward ()와 동일하게 하나의 레코드 앞으로 이동
router.go(1)

// router.back ()과 동일하게 한 레코드 씩 뒤로 이동합니다.
router.go(-1)

// 3 개 레코드 앞으로 이동
router.go(3)

// 기록이 많지 않으면 조용히 실패 
router.go(-100)
router.go(100)
```

## History 조작

`router.push`, `router.replace` 및 `router.go`는 [`window.history.pushState`,`window.history.replaceState` 및 `window.history.go`](https://developer.mozilla.org/en-US/docs/Web/API/History)와 상응합니다. 그들은 `window.history` API를 모방합니다.

따라서 [브라우저 히스토리 API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)에 이미 익숙하다면 vue-router를 사용하여 히스토리를 손쉽게 조작 할 수 있습니다.

라우터 인스턴스를 생성 할 때 전달되는 [`history` 옵션](/api/#history)의 종류에 관계없이 Vue Router 탐색 방법 (`push`,`replace`,`go`)이 일관되게 작동한다는 점을 언급 할 가치가 있습니다.


