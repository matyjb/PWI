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

class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    error:{
      email: null,
      password: null,
    }
  }
  componentDidUpdate(){
    if(this.props.login.id !== ""){
      this.props.history.push("/");
    }
  }

  submit = async () => {
    //TODO: validation

    const rawResponse = await fetch('https://matyjbpwi.azurewebsites.net/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: this.state.email, password: this.state.password})
    });
    const content = await rawResponse.json();
    if(!content.token){
      this.setState({error: {email: true,password:true}});
    }else{
      this.props.setLogin(content);
      this.props.history.push("/");
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
              label={t("loginPage.email")}
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
              error={this.state.error.password}
              id="password-input"
              label={t("loginPage.password")}
              type="password"
              autoComplete="current-password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange('password')}
              />
          </Grid>
        </Grid>
        <Divider style={styles.divider}/>
        <Button color="primary" onClick={this.submit}>{t("loginPage.login")}</Button>
        <Divider style={styles.divider}/>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="caption">{t("loginPage.noAccount")}</Typography>
          </Grid>
          <Grid item>
            <Button color="primary" onClick={()=>this.props.history.push("/register")}>{t("loginPage.register")}</Button>
          </Grid>
        </Grid>
        <Divider style={styles.divider}/>
        <Button color="primary" onClick={()=>this.props.history.push("/forgot")}>{t("loginPage.forgotPass")}</Button>        
      </Paper>
    )
  }
}
export default connect(
  state => state.login,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(translate(LoginPage));