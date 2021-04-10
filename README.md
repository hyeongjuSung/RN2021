RN2021 201740220 성형주
=============

React Native 수업 내용 정리
-------------
## 04.09
## TodoApp 만들기 1
### App 컴포넌트 만들기
- ScrollView 컴포넌트
ScrollView 플랫폼을 감싸는 것으로 스크롤이 가능한 View 컴포넌트
- keyboardShouldPersistTaps='always'
키보드가 열려있으면 딛아서 UI가 이벤트를 모두 처리 
- flex:1
해당 컴포넌트가 상위 컨테이너 영역 전체를 채우도록 하는 스타일 값
- TouchableHighlight 컴포넌트
뷰를 감싸는 역할 밎 뷰가 터치 이벤트에 적절히 대응하도록 하는 컴포넌트

### 안드로이드 에뮬레이터에서 개발자 메뉴 열기
- [ctrl]+M

## 04.02
### state & props 구조 분해 할당
- this.state와 this.state로 state와 props를 참조하면 반복적이게 되면서 DRY원칙을 위배
- 이를 위해 구조 분해 할당 개념 도입

### 구조분해할당: 객체에서 속성들을 가져와 앱에서 변수로 사용

### stateless 컴포넌트에서의 props
- 재사용해야하는 컴포넌트를 만들 때 유용, 
- props(속성)에 접근하려면 메서드의 첫 번째 인수로 props를 전달

### 리액트 컴포넌트 스펙
- 스펙과 생명주기를 연결해 컴포넌트가 수행하는 동작을 제어
```
- render메서드
- constructor메서드
- statics객체
```

#### render메서드
- 컴포넌트가 생성될 때 필수적으로 필요한 유일한 메서드
- 하나의 자식 요소나 null 혹은 false만을 반환
- 다른 곳에서 정의한 컴포넌트 반환 가능
- 조건문, 로직, 값에 따라 다른 컴포넌트 반환 가능

#### 속성 초기화와 생성자 사용하기
- state는 생성자에서 만들거나 속성 초기화를 사용해서 만듦
- 생성자에서 다른 속성들도 this.property 형식으로 설정 가능
- 생성자 이용 시 반드시 super 키워드를 this 키워드 전에 사용해야 함
- props를 이용해 state를 지정 X

### 리액트 생명주기 메서드
- 다양한 메서드들이 컴포넌트 생명주기 동안 특정 시접에 실행
- 생성(Mounting), 갱신, 파기(Unmounting)로 나뉨

#### getDerivedStateFromProps 메서드
- 컴포넌트가 생성될 때와 컴포넌트가 새 props를 전달받을 때 모두 호출
- 새로운 props와 가장 최근의 state를 인수로 전달받아서 하나의 객체를 반환
- 객체의 데이터는 컴포넌트의 state로 갱신

#### componentDidMount 메서드
- 컴포넌트가 로딩되고 나서 바로 한 번만 호출
- Ajax 호출로 가져온 데이터를 처리
- 지정된 실행 후에 실행되는 setTimeout 처리

#### shouldComponentUpdate
- boolean을 반환
- 컴포넌트의 렌더링 여부 결정

#### componentDidUpdate
- 컴포넌트가 갱신되면서 재랜더링된 후 바로 호출
- 이전 state와 props를 인수로 가짐

#### componentWillUnmount
- 앱에서 컴포넌트가 파기되기 전에 호출


## 03.26
### 컴포넌트 데이터를 다루는 state & props
#### state
- 컴포넌트가 다루는 값들의 집합체
- 컴포넌트가 생성될 때 생성자나 속성 초기화를 이용해 초기화
- 초기화된 state는 this.state.를 통해 사용 가능
- this.setState()의 호출을 통해서 갱신

## app.js에서 type script 관련 오류 해결 방법
 (설정 -> 검색(javascript validate) -> javascript 항목 disable)

### props
- 부모 컴포넌트로부터 전달된 속성값이거나, 컴포넌트가 상속받은 값
- 컴포넌트에 상속되고 나면 변경 불가
#### 정적 props
- props로 전달받은 값은 자식 컴포넌트에서 this.props로 사용 가능
- 중괄호와 문자열 값 사용, 변수를 다룰 때처럼 리터럴 전달 가능
#### 동적 props
- 외부에서 변경하는 속성
