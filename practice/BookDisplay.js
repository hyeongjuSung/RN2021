import React, {Component} from 'react'
import {View, Text} from 'react-native'

const BookDisplay = (props) => {
    let leapYear
    let {topics} = props
    const {info} = props
    topics = topics.map((topic, i) => {
        return <Text>{topic}</Text>
    })
    if(props.leapYear) {
        leapYear = <Text>this is a leapYear</Text>
    }

    return (
        <View>
            {leapYear}
            <Text>book type: {info.type}</Text>
            {topics}
        </View>
    )
}

export default BookDisplay