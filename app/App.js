import React, {Component} from 'react'
import {Image, StyleSheet, View, Text, Platform} from 'react-native'

class App extends Component {
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.cardContainer}>
                    <View style={styles.cardImageContainer}>
                        <Image style={styles.cardImage}        
                               source={require('./user.png')}/>        
                    </View>
                    <View>
                        <Text style={styles.cardName}>
                            sung hj
                        </Text>
                    </View>
                    <View style={styles.cardOccupationContainer}>
                        <Text style={styles.cardOccupation}>
                            React native developer
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.cardDescription}>
                        Sung is a really great JavaScript developer. He
                         loves using JS to build React Native applications
                            for iOS and Android.
                        </Text>
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
        alignItems: 'center', // 프로필 카드를 수평축에서 중앙으로 정렬
        borderColor: 'black',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 20,
        backgroundColor: profileCardColor,
        width: 300,
        height: 400
    },
    cardImageContainer: {
        alignItems: 'center', // 사용자 이미지를 수평축에서 중앙으로 정렬
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: 30,       // 프로필 카드와 원의 상단의 간격
        paddingTop: 15       // 원과 안쪽 이미지 사이의 간격
    },
    cardImage: {
        width: 80,
        height: 80
    },
    cardName: {
        color: 'white',
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        ...Platform.select({
            ios: {
                fontFamily: 'American Typewriter'
            },
            android: {
                fontFamily: 'monospace',
                fontStyle: 'italic'
            },
        }),
    },
    cardOccupationContainer: {
        borderColor: 'black',
        borderBottomWidth: 3
    },
    cardOccupation: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    cardDescription: {  
        fontStyle: 'italic',  
        marginTop: 10,
        marginRight: 40,
        marginLeft: 40,
        marginBottom: 10
    }
    
});

export default App