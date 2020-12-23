# 경로 매칭 문법

대부분의 애플리케이션은 [동적 경로(Route) 매핑](./dynamic-matching.md)에서 본 것처럼 `/about`과 같은 정적 경로와 `/users/:userId`와 같은 동적 경로를 사용하지만 Vue Router는 훨씬 더 많은 기능을 제공합니다. !

:::tip
단순화를 위해 모든 경로 레코드는 `path` 값에 초점을 맞추고 다른 **`component` 속성** 을 생략합니다.
:::

## params에서 커스텀 정규표현식 사용하기

`:userId`와 같은 매개 변수를 정의 할 때 내부적으로 다음 정규식 `([^/]+)` (슬래시`/`가 아닌 하나 이상의 문자)를 사용하여 URL에서 매개 변수를 추출합니다. 매개 변수 내용을 기반으로 두 경로를 구별 할 필요가 없는 한 잘 작동합니다. 두 경로 `/:orderId` 및 `/:productName`이 모두 정확히 URL과 일치하므로 이를 구분할 방법이 필요하다고 해보죠. 가장 쉬운 방법은 경로를 구분하는 정적 섹션을 경로에 추가하는 것입니다.

```js
const routes = [
  // matches /o/3549
  { path: '/o/:orderId' },
  // matches /p/books
  { path: '/p/:productName' },
]
```

그러나 일부 시나리오에서는 정적 섹션 `/o` `/p`를 추가하고 싶지 않습니다. 그러나 `orderId`는 항상 숫자이고 `productName`은 무엇이든 될 수 있다는 조건이 있다면, 괄호 안에 매개 변수에 대한 사용자 정의 정규식을 지정할 수 있습니다.

```js
const routes = [
  // /:orderId -> 숫자에만 매칭됨 
  { path: '/:orderId(\\d+)' },
  // /:productName -> 그외 다른것에 매칭됨
  { path: '/:productName' },
]
```

이제 `/25`로 이동하면 `/:orderId`와 일치하고 다른 항목으로 이동하면 `/:productName`과 일치합니다. `routes` 배열의 순서는 중요하지 않습니다!

:::tip
자바스크립트에서 실제로 백 슬래시 문자를 전달하려면 `\d` 를 `\\d`로 표기하는 것 것처럼 **백슬래시 (`\`)를 이스케이프** 해야합니다.
:::


## 반복되는 매개변수


`/first/second/third`와 같은 여러 섹션이 있는 경로를 일치시켜야하는 경우 `*`(0 이상) 및 `+`(1 이상)를 사용하여 매개 변수를 반복 가능한 것으로 표시해야합니다.

```js
const routes = [
  // /:chapters -> 다음과 일치 /one, /one/two, /one/two/three, etc
  { path: '/:chapters+' },
  // /:chapters -> 다음과 일치 /, /one, /one/two, /one/two/three, etc
  { path: '/:chapters*' },
]
```

이렇게하면 문자열 대신 매개 변수 배열이 제공되며 명명된 경로를 사용할 때 배열을 전달해야합니다.

```js
// given { path: '/:chapters*', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// produces /
router.resolve({ name: 'chapters', params: { chapters: ['a', 'b'] } }).href
// produces /a/b

// given { path: '/:chapters+', name: 'chapters' },
router.resolve({ name: 'chapters', params: { chapters: [] } }).href
// throws an Error because `chapters` is empty
```

These can also be combined with custom Regexp by adding them **after the closing parentheses**:
**닫는 괄호 뒤에** 추가하여 맞춤 정규 표현식과 결합 할 수도 있습니다.

```js
const routes = [
  // 숫자와만 일치
  // 다음과 일치 /1, /1/2, etc
  { path: '/:chapters(\\d+)+' },
  // 다음과 일치 /, /1, /1/2, etc
  { path: '/:chapters(\\d+)*' },
]
```

## 옵션 매개변수

`?` 수정자 (0 또는 1)를 사용하여 매개 변수를 선택 사항으로 표시 할 수도 있습니다.

```js
const routes = [
  // 다음과 일치 /users and /users/posva
  { path: '/users/:userId?' },
  // 다음과 일치 /users and /users/42
  { path: '/users/:userId(\\d+)?' },
]
```

기술적으로 `*`는 매개 변수를 선택사항으로 표시하지만 `?` 매개 변수는 반복 할 수 없습니다.

## 디버깅

If you need to dig how your routes are transformed into Regexp to understand why a route isn't being matched or, to report a bug, you can use the [path ranker tool](https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJXMAAA..#). It supports sharing your routes through the URL.

경로가 일치하지 않는 이유를 이해하기 위해 경로를 Regexp로 변환하는 방법을 디버깅 해야 하거나 또는 버그를 보고하려면 [경로 순위 지정 도구(path ranker tool)](https://paths.esm.dev/?p=AAMeJSyAwR4UbFDAFxAcAGAIJXMAAA..#)를 사용할수 있습니다 URL을 통한 경로 공유를 지원합니다.
