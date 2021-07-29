import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Signup from './Signup';
import Login from './Login';

export interface AuthProps {
    updateToken: (newToken: string) => void; 
    
}

export interface AuthState {
    showLogin: boolean
}

class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = {
            showLogin: false,
            
        };
    }
    handleToggle = () => {if(this.state.showLogin === true){
        this.setState({ showLogin: false })
    } else {
        this.setState({ showLogin: true })
    }}

    render() { 
        return (
            <Container>
                <Grid container>

                {this.state.showLogin === true ? <Login updateToken={this.props.updateToken} handleToggle={this.handleToggle} /> : <Signup updateToken={this.props.updateToken} handleToggle={this.handleToggle}/>}

                </Grid>
            </Container>
        );
    }
}
 
export default Auth;