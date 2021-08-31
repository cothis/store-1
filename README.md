# 배민문방구 1팀 - 💤 잘 시간이 없 조

배민 문방구를 리액트를 이용한 프론트엔드와 nestjs 를 이용한 백엔드로 재구성

## 1. 팀원 소개

### [김지용](https://github.com/jiyong1)

많은 걸 배우고 가겠습니다.. 고수님들..

엄청 우아한 문방구 만들고 싶어요..ㅎㅎ

### [김태균](https://github.com/TsooranKim)

저는 우아해 지고 싶은 김태균입니다. 이번 프로젝트 짱 멋지게 잘 해보고 싶어요~ ㅎㅎ

### [유진관](https://github.com/CurlyBat)

끝이 보이지 않는 프로젝트 규모지만 끝까지 열심히 하겠읍니다.

### [윤민호](https://github.com/cothis)

열심히해서 우와한 프로젝트를 만들어보겠습니다.


## 2. 소스코드 사용법

### 공통 준비사항

> github에서 최신버전을 clone 해주세요.
>
> client / server 경로에서 yarn install 을 진행하여 의존성을 설치해주세요.

### 설정파일 셋업

> client/.env.dev 파일을 생성하여 API_ENDPOINT=서버주소:PORT 형태로 입력해주세요.
>
> server/seed/data/password.json 을 생성하여 "woowa" 를 입력해주세요.
>
> server/src/config/config.yaml을 생성하여 config.yaml.sample 을 참고하여 작성해주세요.

### Without Docker

> 전체적인 데이터 관리를 위한 Mysql 설치
>
> 검색을 위한 Elastic Search 설치
>
> server 경로에서 yarn seed 를 진행하여 기본데이터를 추가해주세요.
>
> server 경로에서 yarn start:dev 를 진행하여 개발모드로 실행할 수 있습니다.
>
> client 경로에서 yarn dev 를 진행하여 개발모드로 실행할 수 있습니다.

### With Docker

> root 경로에서 docker-compose up -d --build 를 진행하여 배포환경으로 실행할 수 있습니다.



## 3. 개발자를 위한 프로젝트 상세

### i. 클라이언트

#### 사용 기술

- React
- React-query (상태관리)
- 자체개발 React-Router
- 자체개발 Styled-Component

#### 폴더 구조 설명

```
├─ client
│ ├─ src
│ │ ├─ App.tsx
│ │ ├─ assets
│ │ ├─ components
│ │ ├─ config
│ │ ├─ constants
│ │ ├─ context
│ │ ├─ hooks
│ │ ├─ lib
│ │ ├─ main.tsx
│ │ ├─ pages
│ │ ├─ styles
│ │ ├─ types
│ │ └─ utils
│ ├─ public
│ ├─ webpack
│ ├─ .editorconfig
│ ├─ .env.sample
│ ├─ .gitignore
│ ├─ .prettierrc
│ ├─ babel.config.js
│ ├─ package.json
│ ├─ tsconfig.json
│ └─ webpack.config.ts
```

### ii. 서버

#### 사용 기술

- nest.js
- typeorm
- elesticsearch
- docker
- nginx

#### 폴더 구조 설명

```ts
   ┣ @types
   ┃ ┗ express
   ┃ ┃ ┗ index.d.ts
   ┣ seed
   ┃ ┣ data
   ┃ ┣ seeder
   ┃ ┗ version
   ┣ src
   ┃ ┣ auth
   ┃ ┣ config
   ┃ ┣ data
   ┃ ┣ elastic
   ┃ ┣ models
   ┃ ┃ ┣ board
   ┃ ┃ ┣ category
   ┃ ┃ ┣ order
   ┃ ┃ ┣ product
   ┃ ┃ ┗ users
   ┃ ┣ providers
   ┃ ┃ ┗ database
   ┃ ┣ app.controller.ts
   ┃ ┣ app.module.ts
   ┃ ┣ global.d.ts
   ┃ ┗ main.ts
   ┣ .editorconfig
   ┣ .eslintrc.js
   ┣ .prettierrc
   ┣ nest-cli.json
   ┣ ormconfig.js
   ┣ ormconfig.seed.js
   ┣ package.json
   ┣ tsconfig.build.json
   ┣ tsconfig.json
```
