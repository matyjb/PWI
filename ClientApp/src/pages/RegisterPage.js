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
}

export default class RegisterPage extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    cpassword: "",
  }
  handleChange = name => event => {
    this.setState({[name]: event.target.value});
  };
  render() {
    return (
      <Paper style={styles.paper}>
        {/* <Typography variant="h4">Zarejestruj się</Typography>
        <Divider style={styles.divider}/> */}
        <Grid container direction="column">
          <Grid item>
            <TextField
              required
              id="outlined-username"
              label="Username"
              margin="normal"
              variant="outlined"
              value={this.state.username}
              onChange={this.handleChange('username')}
              />
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-email-input"
              label="Email"
              type="email"
              name="email"
              margin="normal"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange('email')}
              />
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-password-input"
              label="Password"
              type="password"
              margin="normal"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange('password')}
              />
          </Grid>
          <Grid item>
            <TextField
              required
              id="outlined-confirm-password-input"
              label="Confirm password"
              type="password"
              margin="normal"
              variant="outlined"
              value={this.state.cpassword}
              onChange={this.handleChange('cpassword')}
              />
          </Grid>
        </Grid>
        <Divider style={styles.divider}/>
        <Button color="primary">Zarejestruj</Button>
      </Paper>
    )
  }
}