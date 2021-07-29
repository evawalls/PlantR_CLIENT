import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {Form, Label, Input}  from 'reactstrap';

import APIURL from '../Helpers/environment';

export interface SignupProps {
  updateToken: (newToken: string) => void; 
  handleToggle: () => void;
}

export interface SignupState {
  username:string;
  password:string;
  first_name:string;
  last_name:string;
  email:string;
  role:string;
}



class Signup extends React.Component<SignupProps, SignupState> {
  constructor(props: SignupProps) {
    super(props);
    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      email: "",
      role: ""    
    };
  }

  handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    fetch(`${APIURL}/user/register`, {
           method: 'POST',
           body: JSON.stringify({
             user: {
               username: this.state.username, 
               password: this.state.password, 
               first_name: this.state.first_name, 
               last_name: this.state.last_name, 
               email: this.state.email, 
               role: this.state.role}}),
           headers: new Headers({
               'Content-Type': 'application/json'
           })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken)
            console.log(data);
        })
    }

render() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="Signup">

        <Typography
         component="h1" variant="h5">
          Sign up!
        </Typography>
        <Form onSubmit={this.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <Label htmlFor='firstname'>First Name</Label>
              <Input 
                placeholder='Enter your first name'
                required
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                onChange={(e) => this.setState({first_name: e.currentTarget.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <Label htmlFor='lastname'>Last Name</Label>
              <Input placeholder='Enter your last name'
                required
                onChange={(e) => this.setState({last_name: e.currentTarget.value})}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <Label htmlFor='username'>User Name</Label>
              <Input placeholder='Enter your user name'
                required
                onChange={(e) => this.setState({username: e.currentTarget.value})}
                name="username"
                autoComplete="uname"
              />
            </Grid>
            <Grid item xs={12}>
            <Label htmlFor='email'>Email</Label>
              <Input type='email' placeholder='Enter valid email address' pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" required onChange={(e) => this.setState({email: e.currentTarget.value})} name='email'/>
          
            <Label htmlFor='password'>Password</Label>           
            <Input type='password' placeholder='must contain' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required onChange={(e) => this.setState({password: e.currentTarget.value})} name='password'/>
            </Grid>
            <Grid item xs={12}>
              <Label htmlFor='role'>Role</Label>
              <Input placeholder='Admin or Gardener'
                
                onChange={(e) => this.setState({role:e.currentTarget.value})}
                name="role"
                autoComplete="role"
              />
            </Grid>
          </Grid>
          <Button
            type="submit">
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={this.props.handleToggle}>
                Already a PlantR? Login 
                
              </Button>
            </Grid>
          </Grid>
        </Form>
      </div>
    </Container>
  );
}
}
export default Signup;