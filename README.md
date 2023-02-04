# Quasar App (quasar-boilerplate)

A Quasar Framework app


node js 12.13.0

nvm use 12.13.0

## ui framework 
```
https://v1.quasar.dev/
https://youzan.github.io/vant/v2/#/en-US/
```

window node version manage
## instal quasar cli 
```
npm install -g @quasar/cli
window path 설정하기`
```

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### quasar
```
$ npm install -g @quasar/cli@1.1.3
```

### 프로젝트 실행방법
```
1.모듈들 설치
npm install

2.퀘이샤 설치
npm install -g @quasar/cli@1.1.3

3.프로젝트 실행
quasar serve
```


### 프로젝트 나누면서 느낀점
```
quasar.variables 파일 내의 테마 색상을 변경하는것을 기본 원칙으로한다.
레이아웃
페이지
프로젝트
컴포넌트
로 파일을 나눈다.

아이콘은 메테리얼 아이콘
https://fonts.google.com/icons?selected=Material+Icons

마진 패딩에 대한 유틸리티는 아래에 있다.
https://quasar.dev/style/spacing#other-related

색상은 bg-primary, text-primary등으로 분기해서 처리한다. 
마진은  q-m-a-xs
q (Prefix) 
p m (Type) 
t r b l a x(left&right) y(top&bottom) (Direction) 
none xs sm md lg xl (size)

```
