RN2021 201740220 성형주
=============
React Native 수업 내용 정리
-------------
## 05.07
> 중간고사 코드 리뷰
```
- props의 개념, 전달 방법 및 사용법
- 구조 분해 할당을 통한 변수명 재할당
```
### 구조 분해 할당
```javascript
- 배열이나 객체의 속성을 해체하여, 그 값을 개별 변수에 담을 수 있게 하는 JavaScript 표현식
- 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

[객체에서 변수를 재할당하는 방법]
const foobar = {
  foo: 1000,
  bar: 500
}

[foobar에 있는 foo property를 woo로 바꿀 경우]
1. 구조분해 할당없이 변수명 재할당
const woo = foobar.foo

2. 구조분해 할당을 이용하는 방법
const {foo:woo} = foobar
console.log(woo) //1000
console.log(foobar) // let basket = {foo:1000, bar:500}

3. React에서 자주 사용되는 구조분해 할당
this.state = {
  foo: 100,
  bar: 200
}
const {foo, bar} = this.state
```
### 배열 구조 분해
```
var foo = ["one", "two", "three"];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```
### 객체 구조 분해
```
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
```
> View 컴포넌트에 스타일 적용하기
### 배경색 설정하기
|         지원형식              |          예                 |
|-------------------------------|-----------------------------|
| #rgb                          | '#06f'                      |
| #rgba                         | '#06fc'                     |
| #rrggbb                       | '#0066ff'                   |
| #rrggbbaa                     | '#ff00ff00'                 |
| rgb                           | 'rgb(0,102,255)'            |
| rgb(숫자,숫자,숫자,알파값)     | 'rgba(0,102,255,.5)'        |
| hsl(색상,채도,명도)            | 'hsl(216,100%,50%)'         |
| 투명배경                       | 'transparent'               |
| css 지정색 이름                | 'dodgerblue'                |
### border 속성 지정하기
```
- borderColor & borderWidth
 각 측면의 테두리에 각각의 속성 적용 가능
 - borderRadius
 각 모서리에 사용하는 속성
 - borderStyle
 모든 모서리에 공통으로 하나만 적용
```
```
- color, width, style 속성으로 테두리 만들기
<View style={styles.container}>
           <Example style={{borderWidth: 1}}>    // borderWidth를 1로 지정
               <Text>borderWidth: 1</Text>
           </Example>
           <Example style={{borderWidth: 3, borderLeftWidth: 0}}>    // borderWidth를 3으로 늘리고 왼쪽의 테두리를 없애고 borderLeftWidth를 0으로 지정
               <Text>borderWidth: 3, borderLeftWidth: 0</Text>
           </Example>
           <Example style={{borderWidth: 3, borderLeftColor: 'red'}}>    // borderWidth를 3으로 지정하고 왼쪽 테두리를 다시 만들고 테두리 색상을 빨간색으로 지정
               <Text>borderWidth: 3, borderLeftColor: 'red'</Text>
           </Example>
           <Example style={{borderLeftWidth: 3}}>    // 왼쪽 테두리만 지정하고 borderLeftWidth를 3으로 지정
               <Text>borderLeftWidth: 3</Text>
           </Example>
           <Example style={{borderWidth: 1, borderStyle: 'dashed'}}>    // borderStyle을 기본 solid에서 dashed로 변경
               <Text>borderWidth: 1, borderStyle: 'dashed'</Text>
           </Example>
         </View>
```
## 04.30
> 리액트 네이티브에서 스타일 적용하기
```
- 인라인 스타일(예제4.1)
- StyleSheet에 정의된 스타일 참조(예제4.2)
- 스타일 파일 분리
```
### 스타일 구성
```
- 리액트 네이티브에서는 컴포넌트 단위로 적용
- 별도의 스타일 파일을 만드는 경우 확장자는 css가 아닌 js로 사용
```
### 컴포넌트의 스타일시트를 외부로 분리하기
```
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({    
  container: {    
    marginTop: 150,
    backgroundColor: '#ededed',
    flexWrap: 'wrap'
  }
})
```
### 외부 스타일시트 가져오기
```
import { styles, buttons } from './component/styles'    
<View style={styles.container}>    
  <TouchableHighlight style={buttons.primary} />    
    ...
  </TouchableHighlight>
</View>

```
### spread 연산자
```
- 배열의 요소 및 객체의 속성에 접근할 때 사용
const arr = [1, 2, 3, 4, 5];

console.log(arr); // [ 1, 2, 3, 4, 5 ]
console.log(...arr); // 1, 2, 3, 4, 5
console.log(1, 2, 3, 4, 5); // 1, 2, 3, 4, 5
```
### flatten 메서드
```
- 스타일 객체를 병합하여 하나의 배열로 만드는데 사용
```
### binding
```
- 객체의 외부에서 사용할 때 활용
- React에서는 생성자에서 binding 하는 것이 일반적
let foo = {  
    prop: 'Hello',
    bar: function() {
        console.log( this.prop );
    }
};
foo.bar(); //"Hello"

let fooBar = foo.bar.bind(foo);
fooBar();
```
## 04.16
> TodoApp 만들기 2
### Todo, TodoList 컴포넌트 생성
```
- todos 배열에 추가한 todo들을 렌더링 하기 위해 Todo, TodoList 컴포넌트 생성
- TodoList 컴포넌트는 todos 배열을 매핑해 각각의 todo에 대해 새로운 Todo 컴포넌트 생성, 각 Todo 컴포넌트에 속성으로 todo 객체 전달
```
### toggleComplete, deleteTodo 메서드 추가
```
- todo 완료 여부 전환을 위해 toggleComplete 메서드 생성
- todo 제거를 위해 deleteTodo 메서드 생성
```
### TodoButton.js 파일 생성
```
- toggleComplete, deleteTodo 메서드와 연결을 위해 todo에 전달할 버튼 컴포넌트 필요
- 두 메서드들을 TodoList 컴포넌트에 props로 전달, 이 후 TodoList 컴포넌트는 두 메서드를 Todo 컴포넌트에 props로 전달
```
### TabBar, TabBarItem 컴포넌트 생성
```
- setType, type을 props로 가지는 TabBar 컴포넌트
- tile, setType, type을 props로 가지는 TabBarItem 컴포넌트
```
### TabBar 컴포넌트 구현하기
```
- state에서 type을 구조분해 할당하여 이것을 TabBar, TodoList 컴포넌트에 전달
- setType 메서드를 props로 TabBar 컴포넌트에 전달
```
### TodoList 컴포넌트 갱신하기
```
- 필터를 추가하여, 선택한 탭에 따라 복원하려는 타입의 todo들만 반환하도록 지정 필요
- todos 변수를 getVisibleTodos가 반환한 값으로 지정
```
## 04.09
> TodoApp 만들기 1(~예제 3.13)
### App 컴포넌트 만들기
```
- ScrollView 컴포넌트
ScrollView 플랫폼을 감싸는 것으로 스크롤이 가능한 View 컴포넌트
- keyboardShouldPersistTaps='always'
키보드가 열려있으면 닫아서 UI가 이벤트를 모두 처리 
- flex:1
해당 컴포넌트가 상위 컨테이너 영역 전체를 채우도록 하는 스타일 값
- TouchableHighlight 컴포넌트
뷰를 감싸는 역할 밎 뷰가 터치 이벤트에 적절히 대응하도록 하는 컴포넌트
```
> 안드로이드 에뮬레이터에서 개발자 메뉴 열기
```
- [ctrl]+M
```
### inputChange 메서드 작성
```
- inputChange 메서드는 인수가 하나로 TextInput의 값을 전달
- TextInput에서 반환된 값으로 state인 inputValue를 갱신
```
### inputChange와 inputValue를 TextInput에 추가
```
- Input 컴포넌트에서 TextInput과 메서드를 연결하기 위해 Input.js 파일에 TextInput컴포넌트를 새로운 inputValue와 inputChange props로 갱신
- props로 전달된 inputValue와 inputChange props를 구조분해할당 처리
```
### submitTodo 메서드 추가
```
- todo 목록에 항목을 추가하는 버튼 생성
```
### Button 컴포넌트 생성
```
- this.submitTodo라는 props로 Button에 submitTodo를 전달
- TouchableHighlight는 HTML의 button 엘리먼트와 유사
``` 
## 04.02
> state & props 구조 분해 할당
```
- this.state와 this.state로 state와 props를 참조하면 반복적이게 되면서 DRY원칙을 위배
- 이를 위해 구조 분해 할당 개념 도입
```
### 구조분해할당: 객체에서 속성들을 가져와 앱에서 변수로 사용
```
const person = { name: 'Jeff', age: 22 }
const { age } = person
console.log(age)
```
### stateless 컴포넌트에서의 props
```
- 재사용해야하는 컴포넌트를 만들 때 유용 
- props에 접근하려면 메서드의 첫 번째 인수로 props를 전달
const BookDisplay = (props) => {
```
> 리액트 컴포넌트 스펙
- 스펙과 생명주기를 연결해 컴포넌트가 수행하는 동작을 제어
```
- render메서드
- constructor메서드
- statics객체
```
### render메서드
```
- 컴포넌트가 생성될 때 필수적으로 필요한 유일한 메서드
- 하나의 자식 요소나 null 혹은 false만을 반환
- 다른 곳에서 정의한 컴포넌트 반환 가능
- 조건문, 로직, 값에 따라 다른 컴포넌트 반환 가능
```
### 속성 초기화와 생성자 사용하기
```
- state는 생성자에서 만들거나 속성 초기화를 사용해서 만듦
- 생성자에서 다른 속성들도 this.property 형식으로 설정 가능
- 생성자 이용 시 반드시 super 키워드를 this 키워드 전에 사용해야 함
- props를 이용해 state를 지정 X
```
> 리액트 생명주기 메서드
```
- 다양한 메서드들이 컴포넌트 생명주기 동안 특정 시접에 실행
- 생성(Mounting), 갱신, 파기(Unmounting)로 나뉨
```
1. getDerivedStateFromProps 메서드
```
- 컴포넌트가 생성될 때와 컴포넌트가 새 props를 전달받을 때 모두 호출
- 새로운 props와 가장 최근의 state를 인수로 전달받아서 하나의 객체를 반환
- 객체의 데이터는 컴포넌트의 state로 갱신
```
2. componentDidMount 메서드
```
- 컴포넌트가 로딩되고 나서 바로 한 번만 호출
- Ajax 호출로 가져온 데이터를 처리
- 지정된 실행 후에 실행되는 setTimeout 처리
```
3. shouldComponentUpdate
```
- boolean을 반환
- 컴포넌트의 렌더링 여부 결정
```
4. componentDidUpdate
```
- 컴포넌트가 갱신되면서 재랜더링된 후 바로 호출
- 이전 state와 props를 인수로 가짐
```
5. componentWillUnmount
```
- 앱에서 컴포넌트가 파기되기 전에 호출
```
## 03.26
> 컴포넌트 데이터를 다루는 state & props
### state
```
- 컴포넌트가 다루는 값들의 집합체
- 컴포넌트가 생성될 때 생성자나 속성 초기화를 이용해 초기화
- 초기화된 state는 this.state.를 통해 사용 가능
- this.setState()의 호출을 통해서 갱신

import React {Component} from 'react'

class MyComponent extends Component {
    constructor(){
      super()
      this.state = {
        year: 2016,
      }
    }
    updateYear() {
      this.setState({
        year: 2017
      })
    }  
    render() {
      return (
        <View>
          <Text
            onPress={() => this.updateYear()}>
            The year is: { this.state.year }
          </Text>
        </View>
      )
    }
 }
```
> app.js에서 type script 관련 오류 해결 방법
```
 설정 -> 검색(javascript validate) -> javascript 항목 disable
```
### props
```
- 부모 컴포넌트로부터 전달된 속성값이거나, 컴포넌트가 상속받은 값
- 컴포넌트에 상속되고 나면 변경 불가
```
### props vs. state
| props                         | state                       |
|-------------------------------|-----------------------------|
| 외부 데이터                   | 내부 데이터                 |
| 변경 불가능                   | 변경 가능                   |
| 부모로부터 상속               | 컴포넌트에서 생성           |
| 부모 컴포넌트가 변경 가능     | 컴포넌트에서만 갱신         |
| props로 전달받을 수 있음      | props로 전달받을 수 있음    |
| 컴포넌트 내부에서 변경 불가능  | 컴포넌트 내부에서 변경 가능 |
### 정적 props
```
- props로 전달받은 값은 자식 컴포넌트에서 this.props로 사용 가능
- 중괄호와 문자열 값 사용, 변수를 다룰 때처럼 리터럴 전달 가능

class MyComponent extends Component {
  render() {
    return (
      <BookDisplay book="React Native in Action" />
    )
  }
}
class BookDisplay extends Component {
  render() {
    return (
      <View>
        <Text>{ this.props.book }</Text>
      </View>
    )
  }
}
```
### 동적 props
```
- 외부에서 변경하는 속성

class MyComponent extends Component {
  constructor() {
    super()
    this.state = {
      book: 'React Native in Action'
    }
  }
  render() {
    return (
      <BookDisplay book={this.state.book} />
    )
  }
}
class BookDisplay extends Component {
  render() {
    return (
      <View>
        <Text>{ this.props.book }</Text>
      </View>
    )
  }
}
```
