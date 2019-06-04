import React, { Component } from 'react';
import { Paper, Typography, Divider, TextField} from "@material-ui/core";

var styles={
  paper: {
    marginTop: 10,
    padding: 10,
    textAlign: "center"
  },
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
    username: "",
    email: "",
    password: "",
    cpassword: "",
  }
  render() {
    return (
      <Paper style={styles.paper}>
        <Typography variant="h4">Zaloguj się</Typography>
        <Divider/>
        <TextField/>
      </Paper>
    )
  }
}