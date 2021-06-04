import React, {createContext, Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

const ThemeContext = React.createContext()    
class App extends Component {
  state = { themeValue: 'light' }    
  toggleThemeValue = () => {    
    const value = this.state.themeValue === 'dark' ? 'light' : 'dark'    
    this.setState({ themeValue: value })    
  }    
  render() {
    return (
      <ThemeContext.Provider    
        value={{
          themeValue: this.state.themeValue,
          toggleThemeValue: this.toggleThemeValue
        }}
      >
        <View style={styles.container}>
          <Text>Hello World</Text>
        </View>
        <Child1 />
      </ThemeContext.Provider>
    );
  }
}

const Child1 = () => <Child2 />    

const Child2 = () => (    
  <ThemeContext.Consumer>
    {(val) => (
        <View style={[styles.container, 
                      val.themeValue === 'dark' && 
                     { backgroundColor: 'black' }]}>
          <Text style={styles.text}>Hello from Component2</Text>
          <Text style={styles.text} 
                onPress={val.toggleThemeValue}>
              Toggle Theme Value
          </Text>
        </View>
      )}
  </ThemeContext.Consumer>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 22,
    color: '#666'
  }
})

export default App