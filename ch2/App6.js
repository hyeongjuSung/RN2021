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
 
 //예제2.17 shouldComponentUpdate
 class App extends Component{
   shouldComponentUpdate(nextProps, nextState) {
     if(nextProps.name !== this.props.name) {
       return true
     }
     return false
   }
   render() {
     return <SomeComponent />
   }
 }
 
 //예제2.18 componentDidUpdate
 //리액트17 버전에서는 UNSAFE_componentWillUpdate로 변경 
 class App extends Component{
   componentDidUpdate(prevProps, prevState) {
     if(prevState.showToggled === this.state.showToggled) {
          this.setState({
         showToggled: !showToggled
       })
     }
   }
   render() {
     return <SomeComponent />
   }
 }
 
 //예제2.19 componentWillUnmount
 class App extends Component{
   handleClick() {
     this._timeout = setTimeout(() => {
       this.openWidget();
     }, 2000);
   }
   componentWillUnmount() {
     clearTimeout(this._timeout); 
   }
   render() {
     return <SomeComponent 
              handleClick={() => this.handleClick()} />
   }
 }
 
 
 export default App;
