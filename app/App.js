import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

class App extends Component {
    render(){
        return(
            <View style={styles.container}> 
            <Example style={{borderWidth: 1}}>    
               <Text>borderWidth: 1</Text>
           </Example>
           <Example style={{borderWidth: 3, borderLeftWidth: 0}}>    
               <Text>borderWidth: 3, borderLeftWidth: 0</Text>
           </Example>
           <Example style={{borderWidth: 3, borderLeftColor: 'red'}}>    
               <Text>borderWidth: 3, borderLeftColor: 'red'</Text>
           </Example>
           <Example style={{borderLeftWidth: 3}}>    
               <Text>borderLeftWidth: 3</Text>
           </Example>
           <Example style={{borderWidth: 1, borderStyle: 'dashed'}}>    
               <Text>borderWidth: 1, borderStyle: 'dashed'</Text>
           </Example>
            </View>
        );
    }
}
// 여러 곳에서 사용할 경우를 대비해서 프로필 카드의 색상을 변수에 정의함
//const profileCardColor = 'dodgerblue'
const Example = (props) => {
    <View style={[styles.example, props.style]}>
        {props.children}
    </View>
};

const styles = StyleSheet.create({
    container: {    // 가장 바깥쪽 컴포넌트가 사용할 스타일
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // cardContainer: {    // 프로필 카드에서 사용할 스타일
    //     backgroundColor: profileCardColor,
    //     width: 300,
    //     height: 400
    // }
    example: {
        marginBottom: 15
    }
});

export default App