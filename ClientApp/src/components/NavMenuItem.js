import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

class NavMenuItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.anchorEl = React.createRef();
  }

  setOpen(open) {
    this.setState({open: open});
  }

  handleClick = event => {
    this.setState({open: !this.state.open})
  };

  render() {
    return (
        <Button
          aria-owns={this.state.open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={()=>this.props.history.push(this.props.link)}
          // onMouseEnter={()=>this.setOpen(true)}
          // onMouseLeave={()=>this.setOpen(false)}
          style={{color: "white"}}
        >
          {this.props.children}
        </Button>
    )
  }
}

export default withRouter(NavMenuItem);
