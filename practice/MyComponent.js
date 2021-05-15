import React, {Component} from 'react'
import {Text, View} from 'react-native'
import BookDisplay from './BookDisplay'

class MyComponent extends Component {
    constructor() {
        super()
        this.state = {
            leapYear: true,
            info: {
                type: 'programming'
            }
        }
    }
    render() {
        return (
            <BookDisplay
                leapYear={this.state.leapYear}
                info={this.state.info}
                topics={['react', 'native']}/>
        )
    }
}


export default MyComponent