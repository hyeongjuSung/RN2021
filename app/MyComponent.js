import React, {Component} from 'react'
import {Button, View, StyleSheet} from 'react-native'
// 외부로 분리해 둔 getStyleSheet 함수 가져오기
import getStylesheet from './MyComponentStyles'

export default class MyComponent extends Component{
    constructor(props){
        super(props);
        // 기본 테마 색을 밝은 색으로 컴포넌트의 state 초기화하기
        this.state = {
            darkTheme: false
        }
        // 예외가 발생하지 않도록 toggleTheme함수를 컴포넌트에 bind
        this.toggleTheme = this.toggleTheme.bind(this);
    }

    toggleTheme() {
        // 호출할 때마다 스타일을 toggle
        this.setState({darkTheme: !this.state.darkTheme})
    };

    render(){ // 표시할 테마에 적합한 스타일시트를 가져오기 위해 getStyleSheet함수 사용
        const styles = getStylesheet(this.state.darkTheme);
        const backgroundColor = StyleSheet.flatten(styles.container).backgroundColor; // StyleSheet의 flatten을 이용해서 StyleSheet객체를 JavaScript 객체로 변환
        return(
            <View style={styles.container}> 
                <View style={styles.box}>
                    <Button title={backgroundColor} onPress={this.toggleTheme}/>
                </View>
            </View>
            
        
        )
    }
}