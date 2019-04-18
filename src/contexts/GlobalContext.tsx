import { createContext } from "react";
import React, { Component } from 'react'


const GlobalContext = createContext({count: 0,
  fbContent: {
    isLoggedIn: false,
    userID: "",
    first_name: "",
    email: "",
    picture: ""
  }});

export class GlobalContextProvider extends Component {
  state = {
    count: 0,
    fbContent: {
      isLoggedIn: false,
      userID: "",
      first_name: "",
      email: "",
      picture: ""
    },
    setFbContent: (value: any) => {return this.setState({fbContent: value})},
    clearFbContent: () => {return this.setState({fbContent: {
      isLoggedIn: false,
      userID: "",
      first_name: "",
      email: "",
      picture: ""
    }})},
    incrementCount: () => {
      return this.setState({count: this.state.count + 1});
    }
  }
  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export default GlobalContext;