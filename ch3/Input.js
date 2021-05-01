import React, {Component} from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Input = ({inputValue, inputChange}) => ( // inputValue와 inputChange prop들을 구조분해할당
    <View style={styles.inputContainer}>
        <TextInput
            value={inputValue}
            style={styles.input}
            placeholder='what needs to be done?'
            placeholderTextColor="#CACACA"
            selectionColor='#666666'
            onChangeText={inputChange}/>
    </View>
)

const styles = StyleSheet.create({
    inputContainer: {
        marginLeft: 20,
        marginRight: 20,
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowColor: '#000000',
        shadowOffset: {width:2, height:2}
    },
    input:{
        height: 60,
        backgroundColor: '#ffffff',
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default Input
