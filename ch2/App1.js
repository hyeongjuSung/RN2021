/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// 예제2.1 MyComponent -> App 
// 예제2.2 state를 constuctor에 넣기 
class App extends React.Component{
  // constructor(){
  //   super()
  //   this.state = {
  //     year: 2016, 
  //     name: 'Hyeongju Sung',
  //     colors: ['blue']
  //   }
   constructor(){
     super()
     this.state = {
      year: 2016, 
      name: 'Hyeongju Sung',
      colors: ['blue'],
      leapYear: true,
      topics: ['React', 'React Native', 'JavaScript'],
      info: {
        paperback: true,
        length: '335 pages',
        type: 'programming'
      }
    }
  }

  updateYear(){
    this.setState({
      year:2021
    })
  }

  render(){
    let leapyear = <Text>This is not a leapyear!</Text>
    if(this.state.leapYear){
      leapyear = <Text>This is a leapyear!</Text>
    }
    return(
      <View>  
        <Text>My name is: {this.state.name}</Text>
        <Text onPress = {() => this.updateYear()}>
          The year is: {this.state.year}
        </Text>
        <Text>My colors are: {this.state.colors[0]}</Text>
        <Text>Length: {this.state.info.length}</Text>
        <Text>Type: {this.state.info.type}</Text>
        <Text>Topics: {this.state.topics[1]}</Text>
        {leapyear}
      </View>
    )
  }
}

export default App;
