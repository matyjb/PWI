import React, { Component } from 'react';
import { Paper, Typography, Divider, TextField, Grid, Button, LinearProgress} from "@material-ui/core";
import { CheckCircleOutlineRounded, HighlightOffRounded } from '@material-ui/icons';
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

class RegisterPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
    error: {
      username: null,
      email: null,
      password: null,
      cpassword: null,
      api: null,
    },
    isSubmiting: false,
  }
  componentDidMount(){
    this.validate("username");
    this.validate("email");
    this.validate("password");
  }
  componentDidUpdate(){
    if(this.props.login.id !== ""){
      this.props.history.push("/");
    }
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value}, ()=>this.validate(name));
  };
  validate = name => {
    var er = this.state.error;
    var regex = {
      username: /^[a-zA-Z][a-zA-Z0-9]+$/ig,
      email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ig,
      password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/ig
    }
    var r = new RegExp(regex[name])
    er[name] = !r.test(this.state[name]);
    er["cpassword"] = false;
    if(this.state.password !== this.state.cpassword) {
      er["cpassword"] = true;
    }
    this.setState({error: er});
  }
  submit = async () => {
    if(this.state.error.username) return;
    if(this.state.error.email) return;
    if(this.state.error.password) return;
    if(this.state.error.cpassword) return;

    const rawResponse = await fetch('https://matyjbpwi.azurewebsites.net/api/auth/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username: this.state.username, email: this.state.email, password: this.state.password})
    });
    const content = await rawResponse.json();
    if(!content.token){
      var er = this.state.error;
      er["api"] = true;
      this.setState({error: er});
    }else{
      this.props.setLogin(content);
      this.props.history.push("/");
    }
    this.setState({isSubmiting: false});
  }
  handleSubmit = async () => {
    this.setState({isSubmiting: true});
    await this.submit();
  }
  render() {
    const {t} = this.props;
    return (
      <Paper style={styles.paper}>
        <Grid container direction="column">
          <Grid item>
            <TextField
              required
              id="outlined-username"
              label={t("registerPage.username")}
              margin="normal"
              variant="outlined"
              error={this.state.error.username}
              value={this.state.username}
              onChange={this.handleChange('username')}
              />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {this.state.error.username ? 
              <HighlightOffRounded style={{color: "red",marginTop: -2, marginRight: 2}}/>
              :  
              <CheckCircleOutlineRounded style={{color: "green",marginTop: -2, marginRight: 2}}/>
            }
                {t("registerPage.firstNoNumber")}
              </Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-email-input"
              label={t("registerPage.email")}
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              error={this.state.error.email}
              onChange={this.handleChange('email')}
              />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {this.state.error.email ? 
              <HighlightOffRounded style={{color: "red",marginTop: -2, marginRight: 2}}/>
              :  
              <CheckCircleOutlineRounded style={{color: "green",marginTop: -2, marginRight: 2}}/>
            }
                {t("registerPage.emailFormat")}
              </Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-password-input"
              label={t("registerPage.password")}
              type="password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              error={this.state.error.password}
              onChange={this.handleChange('password')}
              />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {this.state.error.password ? 
              <HighlightOffRounded style={{color: "red",marginTop: -2, marginRight: 2}}/>
              :  
              <CheckCircleOutlineRounded style={{color: "green",marginTop: -2, marginRight: 2}}/>
            }
                {t("registerPage.passwordReq")}
              </Typography>
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-confirm-password-input"
              label={t("registerPage.cpassword")}
              type="password"
              margin="normal"
              variant="outlined"
              value={this.state.cpassword}
              error={this.state.error.cpassword}
              onChange={this.handleChange('cpassword')}
              />
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              {this.state.error.cpassword ? 
              <HighlightOffRounded style={{color: "red",marginTop: -2, marginRight: 2}}/>
              :  
              <CheckCircleOutlineRounded style={{color: "green",marginTop: -2, marginRight: 2}}/>
            }
                {t("registerPage.passwordsEq")}
              </Typography>
          </Grid>
        </Grid>
        <Divider style={styles.divider}/>
        <Button color="primary" onClick={this.handleSubmit}>{t("registerPage.register")}</Button>
        {this.state.isSubmiting && <LinearProgress />}
      </Paper>
    )
  }
}
export default connect(
  state => state.login,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(translate(RegisterPage));