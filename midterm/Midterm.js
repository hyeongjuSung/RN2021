import React, {Component} from 'react'
import DataTest from './DataTest'

class Midterm extends Component {
    constructor() {
        super()
        this.state = {
            id: 201740220,
            name: '성형주'
        }
    }

    render() {
        const {id, name} = this.state
        return (
            <DataTest
                id = {id}
                name = {name}
                foo = {[1, 2, 3, 4, 5]}
            />
        )
    }
}

export default Midterm