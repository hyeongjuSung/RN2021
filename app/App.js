import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'

class App extends Component{
    render(){
        return(
            <View style={styles.container}> 
                <View style={styles.cardContainer}/>
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
        backgroundColor: profileCardColor,
        width: 300,
        height: 400
    }
});

export default App