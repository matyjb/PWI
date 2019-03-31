import React, { Component } from 'react'
import { Button, Popper, Grow, Paper, ClickAwayListener, MenuList, MenuItem } from '@material-ui/core';
import { TopMenuItemType, TopMenuSubItemType } from '../types/TopMenuItemType';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps<any> {
  history: any,
  data: TopMenuItemType,
}
interface IState {
  open: boolean,
}

class TopMenuItem extends Component<IProps, IState>{
  private anchorEl: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
    }
    this.anchorEl = React.createRef();
  }

  setOpen(open: boolean) {
    this.setState({open: open});
  }

  toggleOpen() {
    this.setState({open: !this.state.open});
  }

  render() {
    return (
      <>
        <Button
          buttonRef={this.anchorEl}
          aria-owns={this.state.open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={()=>this.toggleOpen()}
          // onMouseEnter={()=>this.setOpen(true)}
          // onMouseLeave={()=>this.setOpen(false)}
          style={{color: "white"}}
        >
          {this.props.data.title}
        </Button>
        <Popper open={this.state.open} anchorEl={this.anchorEl.current} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              // id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={()=>this.setOpen(false)}>
                  <MenuList>
                    {this.props.data.subItems.map((subItem: TopMenuSubItemType, index: number)=>
                      <MenuItem key={index} onClick={()=>{this.setOpen(false);this.props.history.push(subItem.link) }}>{subItem.title}</MenuItem>
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    )
  }
}

export default withRouter(TopMenuItem);
