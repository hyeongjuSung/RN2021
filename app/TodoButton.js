import React, {Component} from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';

const TodoButton = ({onPress, complete, name}) => (
    <TouchableHighlight
        onPress = {onPress}
        underlayColor = '#efefef'
        style = {styles.button}>
        <Text style = {[
            styles.text,
            complete ? styles.complete : null, //complete가 true인지 확인하고 스타일 작용
            name === 'Delete' ? styles.deleteButton : null ]}>
            {name}
        </Text>        
    </TouchableHighlight>
)

const styles = StyleSheet.create({
    button: {
      alignSelf: 'flex-end',
      padding: 7,
      borderColor: '#ededed',
      borderWidth: 1,
      borderRadius: 4,
      marginRight: 5
    },
    text: {
      color: '#666666'
    },
    complete: {
      color: 'green',
      fontWeight: 'bold'
    },
    deleteButton: {
      color: 'rgba(175, 47, 47, 1)'
    }
  })

  export default TodoButton