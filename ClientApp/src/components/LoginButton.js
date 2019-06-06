import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Login';
import { translate } from 'react-multi-lang';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

class LoginButton extends Component {
  render() {    
    const {t} = this.props;
    return (
      <>
        {this.props.login.id ? 
        <Button variant="outlined" color="inherit" style={{marginLeft: 8}} onClick={()=>this.props.logout()}>{t("loginButton.logout")}</Button>      
        :
        <Button variant="outlined" color="inherit" style={{marginLeft: 8}} onClick={()=>this.props.history.push("/login")}>{t("loginButton.login")}</Button>
        }
      </>
    )
  }
}
export default connect(
  state => state.login,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(withRouter(translate(LoginButton)));
