/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
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

//예제2.16 getDerivedStateFromProps
class App extends Component{
  constructor(){
    super()
    this.state = {loading: true, data: {}}
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        loading: false,
        data: {name: 'Hyeongju', age: 24}
      })
    }, 2000)
  }

  render(){
    if(this.state.loading){
      return <Text>loading</Text>
    }
    const {name, age} = this.state.data
    return(
      <View>
        <Text>Name: {name}</Text>
        <Text>Age: {age}</Text>
      </View>
    )
  }
}

export default App;

