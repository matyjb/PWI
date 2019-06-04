import React, { Component } from 'react';
import { Paper, Typography, Divider, TextField, Grid, Button} from "@material-ui/core";

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
  // input:{
    
  // },
  // email:{

  // },
  // username:{

  // },
  // password:{

  // }
}

export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    error:{
      email: null,
      password: null,
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
    }

    console.log(content);
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
    var er = this.state.error;
    er[name] = null;
    this.setState({error: er});
  };
  render() {
    return (
      <Paper style={styles.paper}>
        {/* <Typography variant="h4">Zaloguj się</Typography>
        <Divider style={styles.divider}/> */}
        <Grid container direction="column">
          <Grid item>
            <TextField
              required
              error={this.state.error.email}
              id="email-input"
              label="Email"
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
              label="Password"
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
        <Button color="primary" onClick={this.submit}>Zaloguj</Button>
        <Divider style={styles.divider}/>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="caption">Nie masz konta?</Typography>
          </Grid>
          <Grid item>
            <Button color="primary" onClick={()=>this.props.history.push("/register")}>Zarejestruj się</Button>
          </Grid>
        </Grid>
      </Paper>
    )
  }
}