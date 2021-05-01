 import React, {Component} from 'react';
 import {ScrollView, StyleSheet, View } from 'react-native';
 import Heading from './Heading'
 import Input from './Input'
 import Button from './Button'
 import TodoList from './TodoList'
 import TabBar from './TabBar' 
let todoIndex = 0
//예제3.13
 class App extends Component{
   constructor(){
     super()
     this.state = {
       inputValue: '', //todo들을 추가하는 TextInput의 현재 state를 저장하는 값
       todos: [],      //todo를 다루는 배열
       type: 'All'
     }
     this.submitTodo = this.submitTodo.bind(this) //메서드를 생성자 내 클래스에 바인딩
     this.toggleComplete = this.toggleComplete.bind(this)
     this.deleteTodo = this.deleteTodo.bind(this)
     this.setType =  this.setType.bind(this)
   }

   inputChange(inputValue){
     console.log('Input Value: ', inputValue)
     this.setState({inputValue})
   }

   submitTodo(){ //inputValue가 비어 있는지, 공백만 있는지 확인, 비어 있으면 아무것도 하지 않고 반환
     if(this.state.inputValue.match(/^\s*$/)){
       return 
     }
     const todo = { //inputValue가 비어 있지 않으면 todo 변수를 생성하고 title, todoIndex, complete 객체를 할당
       title: this.state.inputValue,
       todoIndex,
       complete: false
     }
     todoIndex++
     const todos = [...this.state.todos, todo] //새로운 todo를 기존배열에 추가
     this.setState({todos, inputValue: ''}, () =>{ //todo의 state를 지정해 this.state.todos의 갱신된 배열과 일치하게 만들고 inputValue를 빈문자열로 재지정
       console.log('State: ', this.state)
     })
   }

   deleteTodo(todoIndex){ //todoIndex를 인수로 하며, todos를 필터링해 전달된 인덱스의 todo를 제외한 모든 todo를 반환, 이 후 state를 나머지 todo로 재지정
     let {todos} = this.state
     todos = todos.filter((todo) => todo.todoIndex !== todoIndex)
     this.setState({todos})
   }

   toggleComplete(todoIndex){ //todoIndex를 인수로 하며, 주어진 인덱스의 todo를 만날 때까지 todos를 반복, 
     let todos = this.state.todos
     todos.forEach((todo) => {
       if(todo.todoIndex === todoIndex){
         todo.complete = !todo.complete
       }
     })
     this.setState({todos})
   }

   setType(type){
     this.setState({type})
   }

  render(){
    const {todos, inputValue, type} = this.state
    return(
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps='always'
          style={styles.content}>
          <Heading />
          <Input
            inputValue = {inputValue}
            inputChange = {(text) => this.inputChange(text)}/>
            <TodoList
              type = {type}
              toggleComplete = {this.toggleComplete}
              deleteTodo = {this.deleteTodo}
              todos = {todos}/>
           <Button submitTodo = {this.submitTodo}/>
          </ScrollView>
          <TabBar type={type} setType={this.setType}/>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    paddingTop: 60
  }
})
 
 export default App;
