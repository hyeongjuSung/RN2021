RN2021 201740220 성형주
=============
React Native 수업 내용 정리
-------------
# 05.28
> NaviApp
https://github.com/hyeongjuSung/NaviApp
> HelloExpo
https://github.com/hyeongjuSung/HelloExpo
## 05.21
> git graph 활용
```
 - git graph를 통한 checkout시 내용 참고만 하되 수정 및 커밋은 되도록 지양
```
> 예제 코드(4.11~12) 복사 후 발생하는 에러 수정
```
- 코드 전체 복사가 아닌 render() 안에 내용만 수정할 경우 정상적으로 동작
```
> Text 컴포넌트에 스타일 적용하기
### Text 컴포넌트 vs View 컴포넌트
```
- flex속성을 제외하고 View에서 사용되는 대부분의 스타일을 Text에서도 사용 가능
- 반대로 Text에서 사용하는 스타일을 View에서는 사용 불가
```
### 폰트 스타일
```javascript
1. font-family
- css와는 달리 fontFamily 속성에 여러 개의 폰트 지정 불가
- iOS에서는 monospace	옵션을 사용 불가
- 안드로이드에서는 지원하지 않는 폰트가 지정되면 기본 폰트를 사용
- 기본 폰트 외에 다른 폰트를 사용하려면 Platform	컴포넌트를 이용

 ...Platform.select({
            ios: {
                fontFamily: 'American Typewriter'
            },
            android: {
                fontFamily: 'monospace',
                fontStyle: 'italic'
            },
        }),

2. font-size
- Text 요소의 텍스트 크기를 조정
- 기본 크기는 14px

3. fontStyle
- normal과 italic	두개의 옵션만 사용 가능
- 기본 값은 normal

4. fontWeigjt
- 폰트의 두께 지정
- 기본값은 normal 또는 400
```
### 텍스트 장식하기
```javascript
- textShadowColor, textShadowOffset, textShadowRadius 속성을 이용해 텍스트에 음영넣기

textShadowColor: 'blue',
        textShadowOffset: {
            height: 2,
            width: 2
        },
        textShadowRadius: 3,
```
## 5장 고급 스타일링 기법
> 플랫폼별 크기와 스타일
```
1. 픽셀
- 디스플레이에 표현되는 프로그래밍할 수 있는 가장 작은 단위의 색상
- 빨간색, 노란색, 파란색의 색 요소로 구성

2. 화면 크기
- 한 모서리부터 대각선 모서리까지의 대각선 길이

3. 해상도
- 디스플레이에 표시되는 픽셀 수
```
> 프로필 카드 예제에 음영 넣기
```javascript
- 안드로이드에서는 elevation 속성을 통해 음영 효과를 적용
- ios만큼 음영 효과가 두드러지지 않음

...Platform.select({    
            ios: {
              shadowColor: 'black',
              shadowOffset: {
                height: 10
              },
              shadowOpacity: 1
            },
            android: {
              elevation: 15
            }
          })
```
## 6장 내비게이션
> 탭, 스택, 드로어 내비게이션
```
1. 탭 내비게이션
- 화면의 위나 아래에 탭이 있고, 탭을 터치하면 연결된 페이지로 라우팅 되는 형태

2. 스택 내비게이션
- 기존의 화면위에 다른 화면이 스택 구조로 쌓이는 형태
- 화면 이동 후에는 스택에 있는 이전 화면으로 되돌아가거나 계속해서 다음 화면으로 이동 가능

3. 드로어 내비게이션
- 화면의 왼쪽 혹은 오른족에서 나오는 전형적인 사이드 메뉴
- 메뉴항목을 선택하면 드로어가 닫히고 메뉴 화면으로 이동
- 리액트 네이티브에서는 내비게이션 라이브러리가 포함 X
```
## 05.14
> View 컴포넌트에 스타일 적용하기
### borderRadius를 이용해 모양 만들기
```
- borderRadius 속성은 borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius, borderTopLeftRadius로 지정
- borderRadius: [top], [right], [bottom], [left] 와 같이 한번에 지정 가능
```
> Text 컴포넌트의 bounding box가 원과 겹치는 문제 해결 방법
```
- margin 속성을 이용
- centeredeText 스타일에 backgroundColor를 transparent로 지정
```
### 프로필 카드 컴포넌트에 테두리 추가하기
```javascript
import React, {Component} from 'react'
import {Image, StyleSheet, View} from 'react-native'

class App extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage}        
                               source={require('./user.png')}/>        
                    </View>
                </View>
            </View>
        );
    }
}
// 여러 곳에서 사용할 경우를 대비해서 프로필 카드의 색상을 변수에 정의함
const profileCardColor = 'dodgerblue'

const styles = StyleSheet.create({
    container: {    // 가장 바깥쪽 컴포넌트가 사용할 스타일
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {    // 프로필 카드에서 사용할 스타일
        borderColor: 'black',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: profileCardColor,
        width: 300,
        height: 400
    },
    cardImageContainer: { // 이미지 컨테이너는 120 x 120 크기의 정사각형, borderRadius 속성을 60으로 지정해서 원으로 나타남
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        width: 120,
        height: 120,
        borderRadius: 60
    },
    cardImage: {
        width: 80,
        height: 80
    }
    
});

export default App
```
### 컴포넌트의 위치를 margin과 padding으로 지정하기
```
- 컴포넌트의 위치는 상대적으로 지정하는 것이 반응형에 적합
- margin을 이용해 각 컴포넌트 사이의 위치를 상대적으로 정의
- padding을 이용해 컴포넌트의 테두리부터 컴포넌트의 상대 위치를 정의
```
### margin 속성 이용하기
```
- margin 속성으로 컴포넌트의 주변 둘레 정의 가능
- margin, marginTop, marginRight, marginBottom, marginLeft 속성 
- 안드로이드에서 음수 값의 margin이 적용될 때 리액트 네이티브의 버전이 낮은 경우 컴포넌트가 잘려 나가는 경우 발생
```
### padding 속성 이용하기
```
- padding 속성으로 컴포넌트의 내용이 해당 컴포넌트의 경계선에 제한되지 않도록 지정 가능
- padding, paddingLeft paddingRight, paddingTop, paddingBottom 속성
- 컴포넌트와 부모 컴포넌트 사이의 공간을 지정하는 margin과 달리 padding은 컴포넌트의 테두리부터 자식 엘리먼트에 적용
```
### position을 이용해 컴포넌트 배치하기
```
- 기본적으로 리액트 네이티브에서 모든 요소는 다른 요소들에 상대적으로 배치
- position 속성에는 relative(상대값)와 absolute(절대값) 존재
- css의 static, fixed 지원 X
```
### 프로필 카드의 위치 지정하기
```javascript
- 원과 사용자 이미지에 여백을 주고 모든 요소를 중앙으로 정렬

cardContainer: {              // 프로필 카드에서 사용할 스타일
        alignItems: 'center', // 프로필 카드를 수평축에서 중앙으로 정렬
        borderColor: 'black',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: profileCardColor,
        width: 300,
        height: 400
    },
    cardImageContainer: {
        alignItems: 'center', // 사용자 이미지를 수평축에서 중앙으로 정렬
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 30,       // 프로필 카드와 원의 상단의 간격
        paddingTop: 15       // 원과 안쪽 이미지 사이의 간격
    },
```
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
```javascript
var foo = ["one", "two", "three"];

var [one, two, three] = foo;
console.log(one); // "one"
console.log(two); // "two"
console.log(three); // "three"
```
### 객체 구조 분해
```javascript
var o = {p: 42, q: true};
var {p, q} = o;

console.log(p); // 42
console.log(q); // true
```
> View 컴포넌트에 스타일 적용하기(~p.152)
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
```javascript
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
```javascript
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
```javascript
import { styles, buttons } from './component/styles'    
<View style={styles.container}>    
  <TouchableHighlight style={buttons.primary} />    
    ...
  </TouchableHighlight>
</View>

```
### spread 연산자
```javascript
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
```javascript
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
```javascript
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
```javascript
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
```javascript
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
```javascript
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
