import React from 'react';

import APIURL from '../Helpers/environment';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Form, Label, Input}  from 'reactstrap';

export interface LoginProps {
  updateToken: (newToken: string) => void; 
  handleToggle: ()=> void;
}
 
export interface LoginState {
    username: string,
    password: string
}
 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { 
            username: '', 
            password: ''  
        };
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user: {
              username: this.state.username, 
              password: this.state.password}}),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
          this.props.updateToken(data.sessionToken)
            console.log(data.sessionToken);
        })
    }

    render() { 
        return ( 
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Form noValidate onSubmit={this.handleSubmit}>
          
        <Label htmlFor='username'>Username </Label>
                    <Input type='text' placeholder='Enter your username'  onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ username: e.currentTarget.value })} name="username" required/><br/>
          <Label htmlFor='password'>Password </Label>           
          <Input type='password' placeholder='Min 5 characters with Capital and Lowercase' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.currentTarget.value })} 
          name="password"
          required/>
          
          <Button type="submit">
            Sign In
          </Button><br/>
          <Grid container>
            
            <Grid item>
              <Button onClick={this.props.handleToggle}>
              No account? Register today
              </Button>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
            
        );
    }
}
 
export default Login;