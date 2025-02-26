# Kjy Test Frontend

이 프로젝트는 Vue.js와 Vite를 기반으로 한 게시판 프론트엔드 애플리케이션입니다.  
게시글 목록(테이블 형식, 페이징 지원), 게시글 상세 조회, 게시글 등록, 댓글 등록 기능을 제공합니다.

## 주요 기능

- **게시글 목록 조회**: 테이블 형태로 게시글 번호, 제목, 작성자, 댓글 수를 보여주며, 한 페이지당 10개의 게시글과 최대 5개의 페이지 링크를 제공합니다(현재 고정 상태).
- **게시글 상세 페이지**: 선택한 게시글의 제목, 내용, 작성자 및 댓글 목록을 표시하고 댓글을 등록할 수 있습니다.
- **게시글 등록 페이지**: 별도의 페이지에서 새 게시글을 등록합니다.
- **Vue Router, Pinia**: 페이지 간 라우팅 및 상태 관리를 위한 도구 사용

## 기술 스택

- Vue.js 3.x
- Vite
- Pinia
- Vue Router
- Axios

## 설치 및 실행 방법

1. **의존성 설치**
   ```bash
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```
   기본적으로 [http://localhost:5173](http://localhost:5173) 에서 실행됩니다.

3. **빌드**
   ```bash
   npm run build
   ```
   빌드 결과는 `dist` 폴더에 생성됩니다.

## Vite Proxy 설정

`vite.config.js` 파일에서 `/api` 경로를 백엔드 서버로 프록시하여 CORS 문제를 해결합니다.  
예시:
```js
server: {
  proxy: {
    '/api': {
      target: '백엔드서버 IP:8080', // 백엔드 서버의 IP 및 포트
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ""),
    },
  },
},
```

## 프로젝트 구조

```
kjy_test_frontend
├── public
│   └── index.html
├── src
│   ├── api.js        // Axios를 통한 API 호출 모듈
│   ├── App.vue
│   ├── main.js       // Vue 애플리케이션 초기화
│   ├── router
│   │   └── index.js  // Vue Router 설정
│   └── pages
│       ├── MainPage.vue     // 게시글 목록(테이블, 페이징 포함)
│       ├── DetailPage.vue   // 게시글 상세 및 댓글 등록
│       └── RegisterPage.vue // 게시글 등록 페이지
├── vite.config.js
└── package.json
```

## 추가 정보

- **정적 파일 배포**: 프로덕션 빌드 후 `dist` 폴더의 내용을 Nginx 등 웹 서버의 웹 루트(`/var/www/html` 등)에 복사하여 배포할 수 있습니다.
해당 방식을 통해 [http://www.kjy-test.kro.kr/](http://www.kjy-test.kro.kr/)에 배포되었습니다.
- **API 호출**: API 호출은 `src/api.js`에서 관리되며, 프록시 설정을 통해 백엔드와의 통신이 이루어집니다.
- **문제 해결**: API 호출 관련 문제 발생 시 Vite Proxy 설정 및 백엔드 CORS 설정을 확인하세요.
