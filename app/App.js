import React, {Component} from 'react'
import {Image, StyleSheet, View} from 'react-native'

class App extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage}        
                               source={require('./user.png')}/>        
                    </View>
                </View>
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
        borderColor: black,
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: profileCardColor,
        width: 300,
        height: 400
    },
    cardImageContainer: {
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        width: 120,
        height: 120,
        borderRadius: 60
    },
    cardImage: {
        width: 80,
        height: 80
    }
    
});

export default App