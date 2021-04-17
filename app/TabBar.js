import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';
import TabBarItem from './TabBarItem';

const TabBar = ({setType, type}) => (
    <View style = {StyleSheet.container}>
        <TabBarItem type = {type} title='All'
            setType = {() => setTypea('All')}/>
        <TabBarItem type = {type} border title='Active'
            setType = {() => setType('Active')}/>
        <TabBarItem type = {type} border title='Complete'
            setType = {() => setType('Complete')}/>
    </View>
)

const styles = StyleSheet.create({
    container: {
      height: 70,
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#dddddd'
    }
  })

  export default TabBar