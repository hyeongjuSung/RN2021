RN2021 201740220 성형주
=============
React Native 수업 내용 정리
-------------
## 06.05
## 8장 리덕스 데이터 아키텍처 라이브러리 이용하기
> 리덕스란?
```
- 자바스크립트 앱을 위한 예측 가능한 state 컨테이너
- 앱에 단 하나밖에 없는 전역 상태 객체
- 이 전역 state 객체는 리액트 네이티브 컴포넌트에서 props로 전달됨
- 리덕스 state의 데이터가 변경되면, 변경된 새 데이터가 전체 앱에 props로 전달됨
- 앱의 state를 모두 store라는 곳으로 이동시켜 데이터 관리를 편리하게 함
- 리액트의 context라는 기능을 이용해서 동작함
*context: 전역 state를 만들고 관리하는 메커니즘
```
> context를 이용해서 앱의 전역 상태 관리하기
```javascript
- context는 앱 전체에서 참조할 수 있는 전역 변수를 만드는 React API
- context를 전달받는 컴포넌트는 context를 만든 컴포넌트의 자식 컴포넌트여야 함
- context를 이용하면 props를 사용할 필요가 없음

// 예제 8.1
const ThemeContext = React.createContext()    // context를 참조하는 ThemeContext 변수 생성
...
 return (
      <ThemeContext.Provider                  // 자식 컴포넌트에 context 전달, 
        value={{                              // Provider로 감싼 모든 데이터나 함수는 Consumer로 감싼 자식 컴포넌트에서 참조 가능
          themeValue: this.state.themeValue,
          toggleThemeValue: this.toggleThemeValue
        }}
      >
        <View style={styles.container}>
          <Text>Hello World</Text>
        </View>
        <Child1 />
      </ThemeContext.Provider>
    );
  }
}

const Child1 = () => <Child2 />               // 컴포넌트를 반환하는 stateless함수,
                                              // 부모 컨테이너와 Child2 컴포넌트 사이에 props가 전달되지 않는 것을 보여줌
const Child2 = () => (                        // ThemeContext.Consumer가 감싸고 있는 컴포넌트를 반환하는 stateless 함수
  <ThemeContext.Consumer>
    {(val) => (
        <View style={[styles.container, 
                      val.themeValue === 'dark' && 
                     { backgroundColor: 'black' }]}>
          <Text style={styles.text}>Hello from Component2</Text>
          <Text style={styles.text} 
                onPress={val.toggleThemeValue}>
              Toggle Theme Value
          </Text>
        </View>
      )}
  </ThemeContext.Consumer>
)
...
```
> 리액트 네이티브 앱에 리덕스 구현하기
### 도서 목록 관리 앱
```
1. 리덕스 관련 의존성 라이브러리 설치
> npm install redux react-redux
2. 프로젝트 root에 src폴더를 생성하고, 이 폴더에 Books.js와 actions.js파일 추가
3. src 폴더에 reducers폴더를 생성하고, 이 폴더에 bookReducer.js와 index.js파일 추가
![src 폴더 구조](https://drek4537l1klr.cloudfront.net/dabit/Figures/c08_02.png)
```
> 리덕스 리듀서로 리덕스 state 관리하기
```javascript
- 리듀서는 객체를 반환하는 함수로, 여러 리듀서를 묶어 전역 state를 만듦
- src/reducers/index.js 파일에 앱에서 사용할 모든 reducer를 결합해서 전역 state를 구성

// 예제 8.2 
// bookReducer.js에 첫 번째 reducer 만들기
const initialState = {          // 초기상태 만들기
  books: [{ name: 'East of Eden', author: 'John Steinbeck' }]    
}    
const bookReducer = (state = initialState) => {    // state 인수의 기본 값을 initialState로 지정
  return state    
}

export default bookReducer

// 예제 8.3
// reducers/index.js에 전역 state 만들기
import { combineReducers } from 'redux'           // redux에서 combineReducers 가져오기
import bookReducer from './bookReducer'           // bookReducer 가져오기

const rootReducer = combineReducers({             // 모든 리듀서를 포함하는 루트 리듀서를 만듦
  bookReducer
})

export default rootReducer

```
> provider를 추가하고 스토어 만들기
```javascript
- provider는 자식 컴포넌트에 데이터를 전달하는 부모 컴포넌트
- 리덕스에서 provider는 앱 전체에 전역 state를 전달함

// 예제 8.4
// App.js에 provider와 스토어 추가하기
import React from 'react'

import Books from './src/Books'             // 예제 8.5에서 만들 Books 컴포넌트 가져오기
import rootReducer from './src/reducers'    // rootReducer 가져오기

import { Provider } from 'react-redux'      // react-redux에서 Provider 래퍼 가져오기
import { createStore } from 'redux'         // redux에서 createStore 가져오기

const store = createStore(rootReducer)      // rootReducer를 이용해서 store 객체 생성

export default class App extends React.Component {
  render() {
    return (                                // Provider 컴포넌트로 감싼 Books 컴포넌트 반환, Provider의 prop으로 store를 전달
      <Provider store={store} >             
        <Books />    
      </Provider>    
    )
  }
}

```
> connect 함수를 이용해서 데이터 참조하기
```javascript
- react-redux의 connect 함수를 이용해 자식 컴포넌트에서 store를 참조
- connect 함수의 첫 번째 인수는 리덕스의 전역 state를 참조할 수 있게 해주는 함수
- connect는 다른 함수를 반환하는 커링 함수
- connect(args)(args)
- connect 함수의 첫 번째 인수로 실행된 결과로 만들어진 객체는 두 번째 인수로 전달된 컴포넌트의 props로 사용 가능

// 예제 8.5
// Book.js에 있는 connect 함수
connect(
  (state) => {                                // redux의 전역 상태 객체를 인수로 함
    return {    
      books: state.bookReducer.books         // 함수의 결과를 반환되는 객체
    }
  }
)(Books)                                     // 첫 번째 함수의 결과에서 반환된 객체를 Books 컴포넌트에 전달

// 예제 8.6
// redux store와 bookReducer 데이터 참조하기
...
import { connect } from 'react-redux'             // react-redux에서 connect 가져오기

class Books extends React.Component<{}> {
  render() {
    const { books } = this.props                  // connect 함수가 books 배열을 반환하므로 이 배열을 props로 참조 가능

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Books</Text>
        <ScrollView
          keyboardShouldPersistTaps='always'
          style={styles.booksContainer}
        >
          {
            books.map((book, index) => (         // 배열과 매핑해서 각 도서의 이름과 저자를 표시
              <View style={styles.book} key={index}>    
                <Text style={styles.name}>{book.name}</Text>    
                <Text style={styles.author}>{book.author}</Text>    
              </View>    
            ))    
          }
        </ScrollView>
      </View>
    )
  }
}
...
const mapStateToProps = (state) => ({              // 리덕스의 state 객체를 인수로 전달받고 하나의 키를 포함한 객체를 반환,
  books: state.bookReducer.books                   // 이 키는 books 배열을 포함
})    

export default connect(mapStateToProps)(Books)     // connect 함수의 결과를 외부에 export

```
> 액션 추가하기
```javascript
- 도서를 추가하는 기능을 만들기 위해 액션을 사용
- 액션은 스토어에 데이터를 보내고, 리듀서를 업데이트하는 객체를 반환하는 함수
- 스토어의 데이터는 액션을 통해서만 변경 가능
- 리덕스 dispatch 함수로 액션을 호출하면, 앱의 모든 리듀서에 액션이 전달됨
- 리듀서가 액션을 전달받으면, 액션의 type 속성을 확인하고 리듀서와 관련된 액션에 따라 리듀서가 반환된 것을 업데이트 함

// 예제 8.7
// 첫 번째 액션 만들기
export const ADD_BOOK = 'ADD_BOOK'          // 리듀서에서 재사용할 수 있도록 ADD_BOOk 상수를 만들어 export

export function addBook (book) {            // addBook이라는 함수를 만들고 type 정보와 하나의 인수로 전달된 도서 객체를 반환
  return {
    type: ADD_BOOK,
    book
  }
}

//예제 8.8
// addBook 액션을 이용할 수 있도록 bookReducer 수정하기
import { ADD_BOOK } from '../actions'                         // actions.js에서 ADD_BOOK 상수를 가져옴

const initialState = {
  books: [{ name: 'East of Eden', author: 'John Steinbeck' }]
}

const bookReducer = (state = initialState, action) => {       // bookReducer의 두 번째 인수로 액션을 추가
  switch(action.type) {                                       // 액션의 type에 따라 분기하는 switch문 추가 
    case ADD_BOOK:
      return {
        books: [    
          ...state.books,
          action.book
        ]
      }
    default:    
      return state
  }
}

export default bookReducer
```
> 리듀서에서 리덕스 스토어에 저장된 내용 지우기
```javascript
- 도서 목록에서 도서를 삭제하는 것처럼 배열에서 항목을 제거하려면, 먼저 도서를 고유하게 식별할 수 있어야 함
- uuid 라이브러리를 이용하여 고유한 식별자를 만들기가 가능
> npm install uuid

// 예제 8.12
// uuid 가져와서 이용하기
import uuidV4 from 'uuid/v4'                  // v4 알고리즘 가져오기
import { ADD_BOOK } from '../actions'

const initialState = {                       // initialState에 id 속성을 추가하고 id 속성에 새로운 고유 식별자를 지정
  books: [{ name: 'East of Eden', author: 'John Steinbeck', id: uuidV4() }]
}

// 예제 8.13
// actions.js에 removeBook 액션 만들기
export const ADD_BOOK = 'ADD_BOOK'
export const REMOVE_BOOK = 'REMOVE_BOOK'    
import uuidV4 from 'uuid/v4'    

export function addBook (book) {
  return {
    type: ADD_BOOK,
    book: {
      ...book,
      id: uuidV4()                          // bood에 새 키를 추가, id에 uuidV4 함수를 이용해 새로 생성된 고유 식별자를 지정
    }
  }
}

export function removeBook (book) {         // removeBook 함수를 추가, 이 함수는 type과 인수로 전달된 book을 포함한 객체를 반환
  return {
    type: REMOVE_BOOK,
    book
  }
}

// 예제 8.14 
// 리덕스 리듀서의 배열에서 항목 삭제하기
import uuidV4 from 'uuid/v4'
import { ADD_BOOK, REMOVE_BOOK } from '../actions'        // REMOVE_BOOK 상수 가져오기

const initialState = {                                    // initialState에 id 속성을 추가하고 id 속성에 새로운 고유 식별자를 지정
  books: [{ name: 'East of Eden', author: 'John Steinbeck', id: uuidV4() }]
}
const bookReducer = (state = initialState, action) => {   // bookReducer의 두 번째 인수로 액션을 추가
  switch(action.type) {                                   // 액션의 type에 따라 분기하는 switch문 추가
    ...
    case REMOVE_BOOK:                                     // type이 REMOVE_BOOK인 액션을 처리하기 위한 switch문 추가
      const index = state.books.findIndex(
                        book => book.id === action.book.id)    
      return {
        books: [                                          // 기존 books 배열에서 삭제할 도서의 index를 제외하고 나머지 항목을 포함한 새 배열을 반환
          ...state.books.slice(0, index),
          ...state.books.slice(index + 1)
        ]
      }
    ...
  }
}

export default bookReducer

// 예제 8.15
// removeBook 기능을 Books.js에 구현
...
import { addBook, removeBook } from './actions'    // actions.js의 addBook, removeBook 함수 가져오기
...
  removeBook = (book) => {                         // removeBook이라는 새 클래스 메서드를 만들고,
    this.props.dispatchRemoveBook(book)            // mapDispatchToProps의 새 키로 this.props.dispatchRemoveBook을 호출
  }
...

{
            books.map((book, index) => (          // 새 Text 컴포넌트를 반환하고 Text 컴포넌트의 onPress 이벤트에 removeBook 연결
              <View style={styles.book} key={index}>    
                <Text style={styles.name}>{book.name}</Text>    
                <Text style={styles.author}>{book.author}</Text>    
                <Text onPress={() => this.removeBook(book)}>    
                    Remove    
                </Text>    
              </View>    
            ))
          }

...
const mapDispatchToProps = {                    // mapDispatchToProps에 dispatchRemoveBook 함수 추가
  dispatchAddBook: (book) => addBook(book),
  dispatchRemoveBook: (book) => removeBook(book)    
}
```
## 05.28
> NaviApp
https://github.com/hyeongjuSung/NaviApp
-------------
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
