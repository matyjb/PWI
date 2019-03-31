import { createContext } from "react";
import React, { Component } from 'react'

const GlobalContext = createContext({});

export class GlobalContextProvider extends Component {
  state = {
    count: 0,
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