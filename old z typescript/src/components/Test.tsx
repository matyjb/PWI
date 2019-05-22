import React, { Component, useContext, useState } from 'react';
import GlobalContext from './../contexts/GlobalContext';

export default class Test extends Component {
  static contextType = GlobalContext;
  render() {
    let ctx = this.context;
    return (
      <div>
        {ctx.count}
        <button onClick={() => {ctx.incrementCount()}}>
          hehe
        </button>
      </div>
    )
  }
}
