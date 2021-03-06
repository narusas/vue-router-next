/** @typedef {import('vitepress').UserConfig} UserConfig */

/** @type {UserConfig['head']} */
const head = [['link', { rel: 'icon', href: `/logo.png` }]]

if (process.env.NODE_ENV === 'production') {
  head.push([
    'script',
    {
      src: 'https://unpkg.com/thesemetrics@latest',
      async: '',
    },
  ])
}

/** @type {UserConfig} */
const config = {
  lang: 'ko-KR',
  title: 'Vue Router',
  description: 'The official router for Vue.js.',
  locales: {
    '/': {
      lang: 'ko-KR',
      title: 'Vue Router',
      description: 'The official router for Vue.js.',
    },
  },
  head,
  // serviceWorker: true,
  themeConfig: {
    repo: 'vuejs/vue-router-next',
    docsRepo: 'vuejs/vue-router-next',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,

    carbonAds: {
      carbon: 'CEBICK3I',
      custom: 'CEBICK3M',
      placement: 'routervuejsorg',
    },

    algolia: {
      apiKey: '07ed552fc16926cc57c9eb0862c1a7f9',
      indexName: 'next_router_vuejs',
      algoliaOptions: { facetFilters: ['tags:guide,api'] },
    },

    locales: {
      // Korean
      '/': {
        nav: [
          {
            text: '가이드',
            link: '/guide/',
          },
          {
            text: 'API 레퍼런스',
            link: '/api/',
          },
          {
            text: '변경 내역',
            link:
              'https://github.com/vuejs/vue-router-next/blob/master/CHANGELOG.md',
          },
        ],

        sidebar: [
          {
            text: '소개',
            link: '/introduction.html',
          },
          {
            text: '설치',
            link: '/installation.html',
          },
          {
            text: '핵심',
            collapsable: false,
            children: [
              {
                text: '시작하기',
                link: '/guide/',
              },
              {
                text: '동적 라우트 매칭',
                link: '/guide/essentials/dynamic-matching.html',
              },
              {
                text: '라우트 매칭 문법',
                link: '/guide/essentials/route-matching-syntax.html',
              },
              {
                text: '중첩된 라우트',
                link: '/guide/essentials/nested-routes.html',
              },
              {
                text: '프로그래밍 방식 라우트',
                link: '/guide/essentials/navigation.html',
              },
              {
                text: '이름을 가지는 라우트',
                link: '/guide/essentials/named-routes.html',
              },
              {
                text: '이름을 가지는 뷰',
                link: '/guide/essentials/named-views.html',
              },
              {
                text: '리다이렉트와 별칭',
                link: '/guide/essentials/redirect-and-alias.html',
              },
              {
                text: '라우트 컴포넌트에 속성 전달',
                link: '/guide/essentials/passing-props.html',
              },
              {
                text: '다양한 히스토리 모드',
                link: '/guide/essentials/history-mode.html',
              },
            ],
          },
          {
            text: '고급 사용법',
            collapsable: false,
            children: [
              {
                text: '네비게이션 가드',
                link: '/guide/advanced/navigation-guards.html',
              },
              {
                text: '라우트 메타 필드',
                link: '/guide/advanced/meta.html',
              },
              {
                text: '데이터 가져오기',
                link: '/guide/advanced/data-fetching.html',
              },
              {
                text: '컴포지션 API',
                link: '/guide/advanced/composition-api.html',
              },
              {
                text: '트랜지션',
                link: '/guide/advanced/transitions.html',
              },
              {
                text: '스크롤 동작',
                link: '/guide/advanced/scroll-behavior.html',
              },
              {
                text: '지연된 로딩',
                link: '/guide/advanced/lazy-loading.html',
              },
              {
                text: 'RouterLink 확장하기',
                link: '/guide/advanced/extending-router-link.html',
              },
              {
                text: '네비게이션 실패처리',
                link: '/guide/advanced/navigation-failures.html',
              },
              {
                text: '동적 라우팅',
                link: '/guide/advanced/dynamic-routing.html',
              },
            ],
          },
          {
            text: 'Migrating from Vue 2',
            link: '/guide/migration/index.html',
          },
        ],
      },
      // Korean
      '/ko-kR': {
        nav: [
          {
            text: '가이드',
            link: '/guide/',
          },
          {
            text: 'API 문서',
            link: '/api/',
          },
          {
            text: '변경 내역',
            link:
              'https://github.com/vuejs/vue-router-next/blob/master/CHANGELOG.md',
          },
        ],

        sidebar: [
          {
            text: '소개',
            link: '/introduction.html',
          },
          {
            text: '설치',
            link: '/installation.html',
          },
          {
            text: '핵심 내용',
            collapsable: false,
            children: [
              {
                text: 'Getting Started',
                link: '/guide/',
              },
              {
                text: 'Dynamic Route Matching',
                link: '/guide/essentials/dynamic-matching.html',
              },
              {
                text: "Routes' Matching Syntax",
                link: '/guide/essentials/route-matching-syntax.html',
              },
              {
                text: 'Nested Routes',
                link: '/guide/essentials/nested-routes.html',
              },
              {
                text: 'Programmatic Navigation',
                link: '/guide/essentials/navigation.html',
              },
              {
                text: 'Named Routes',
                link: '/guide/essentials/named-routes.html',
              },
              {
                text: 'Named Views',
                link: '/guide/essentials/named-views.html',
              },
              {
                text: 'Redirect and Alias',
                link: '/guide/essentials/redirect-and-alias.html',
              },
              {
                text: 'Passing Props to Route Components',
                link: '/guide/essentials/passing-props.html',
              },
              {
                text: 'Different History modes',
                link: '/guide/essentials/history-mode.html',
              },
            ],
          },
          {
            text: 'Advanced',
            collapsable: false,
            children: [
              {
                text: 'Navigation guards',
                link: '/guide/advanced/navigation-guards.html',
              },
              {
                text: 'Route Meta Fields',
                link: '/guide/advanced/meta.html',
              },
              {
                text: 'Data Fetching',
                link: '/guide/advanced/data-fetching.html',
              },
              {
                text: 'Composition API',
                link: '/guide/advanced/composition-api.html',
              },
              {
                text: 'Transitions',
                link: '/guide/advanced/transitions.html',
              },
              {
                text: 'Scroll Behavior',
                link: '/guide/advanced/scroll-behavior.html',
              },
              {
                text: 'Lazy Loading Routes',
                link: '/guide/advanced/lazy-loading.html',
              },
              {
                text: 'Extending RouterLink',
                link: '/guide/advanced/extending-router-link.html',
              },
              {
                text: 'Navigation Failures',
                link: '/guide/advanced/navigation-failures.html',
              },
              {
                text: 'Dynamic Routing',
                link: '/guide/advanced/dynamic-routing.html',
              },
            ],
          },
          {
            text: 'Migrating from Vue 2',
            link: '/guide/migration/index.html',
          },
        ],
      },
    },

    // '/es/': {
    //   nav: [
    //     {
    //       text: 'Guía',
    //       link: '/guide/',
    //     },
    //     {
    //       text: 'API',
    //       link: '/api/',
    //     },
    //     {
    //       text: 'Cambios',
    //       link:
    //         'https://github.com/vuejs/vue-router-next/blob/master/CHANGELOG.md',
    //     },
    //   ],
    // },
  },
}

module.exports = config
