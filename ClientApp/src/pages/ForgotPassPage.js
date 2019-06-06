import React, { Component } from 'react';
import { Paper, Typography, Divider, TextField, Grid, Button} from "@material-ui/core";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../store/Login';
import { translate } from 'react-multi-lang';

var styles={
  paper: {
    marginTop: 10,
    padding: 10,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 400,
  },
  divider:{
    margin: "5px 0px",
  }
}

class ForgotPassPage extends Component {
  state = {
    email: "",
    username: "",
    error:{
      email: null,
      username: null,
    },
    password: ""
  }

  submit = async () => {
    //TODO: validation

    const rawResponse = await fetch('https://matyjbpwi.azurewebsites.net/api/auth/forgotpassword', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email, username: this.state.username})
    });
    const content = await rawResponse.json();
    if(!content.password){
      this.setState({error: {email: true,username:true}});
    }else{
      this.setState({password: content.password});
    }
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    var er = this.state.error;
    er[name] = null;
    this.setState({error: er});
  };
  render() {
    const {t} = this.props;
    return (
      <Paper style={styles.paper}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              required
              error={this.state.error.email}
              id="email-input"
              label={t("forgotPassPage.email")}
              type="email"
              autoComplete="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange('email')}
              />
          </Grid>
          <Grid item>
            <TextField
              required
              error={this.state.error.username}
              id="username-input"
              label={t("forgotPassPage.username")}
              autoComplete="current-username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleChange('username')}
              />
          </Grid>
        </Grid>
        <Divider style={styles.divider}/>
        <Grid container direction="column">
          <Grid item>
            <Button color="primary" onClick={this.submit}>{t("forgotPassPage.forgot")}</Button>
          </Grid>
          <Grid item>
            <Typography>{t("forgotPassPage.yourPass")}: {this.state.password}</Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}
export default connect(
  state => state.login,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(translate(ForgotPassPage));