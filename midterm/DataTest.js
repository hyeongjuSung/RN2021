import React from 'react'
import {Text, View} from 'react-native'

const DataTest = (props) => {
    let {id} = props
    let {name} = props
    let {foo} = props
    foo = foo.map((foo, i) => {
        return <Text key={i}>{foo}</Text>
    })
    return (
        <View>
            <Text>
                학번: {id}
                {'\n'}
                이름: {name}
            </Text>
            {foo}
        </View>
    )
}
export default DataTest