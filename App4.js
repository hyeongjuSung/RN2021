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

//예제2.15 getDerivedStateFromProps
export default class App extends Component{
  state =  {
    userLoggedIn: false
  }
  static getDerivedStateFromProps(nextProps, nextState){
    if(nextProps.authenticated){
      return{
        userLoggedIn: true
      }
    }
    return null
  }
  render(){
    return(
      <View>
        {
          this.state.userLoggedIn && (
            <AuthenticatedComponent/>
          )
        }
      </View>
    );
  }
}
