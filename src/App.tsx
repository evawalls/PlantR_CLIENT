import React from "react";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./auth/Auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Route, Switch } from 'react-router-dom';
import CreateGarden from './components/CreateGarden';
import Plant from './components/Plant';
import Log from './components/Log';
import './App.css';



export interface AppProps{

}
export interface AppState {
  sessionToken: string,
  role: string,
  json: string,
  results: [],
  first_name: string,

}

class App extends React.Component<AppProps, AppState> {

  constructor(props: string){
    super(props);
    this.state = { 
      sessionToken: '',
      role: '',
      json: '',
      results: [],
      first_name: ''
      
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('sessionToken', newToken);
    console.log(newToken);
    this.setState({
      sessionToken: newToken,
    });
    
  }  

  updateRole = (newRole: string) => {
    localStorage.setItem('role', newRole);
    console.log(newRole);
    this.setState({
      role: newRole
    })
  }

  protectedViews = () => {
    return (localStorage.getItem('sessionToken') ? <MainPage sessionToken={this.state.sessionToken} first_name={this.state.first_name}/>
    : <Auth updateToken={this.updateToken}/>)
  }

  componentDidMount(){
    let sessionToken = localStorage.getItem('sessionToken')
    let role = localStorage.getItem('role')
    let first_name = localStorage.getItem('first_name')

    if (sessionToken){
      this.setState({sessionToken: sessionToken})
    }
    if (role){
      this.setState({
        role: role
      })
    }
    if (first_name) {
      this.setState({first_name: first_name})
    }
  }

  render() {
    return (
    <div>
        <Router>
        <Header />
        <Switch>
              <Route exact path="/" >{this.protectedViews()}</Route>
              <Route path="/start" component={CreateGarden} />
              <Route path="/plant" component={Plant} />
              <Route path="/log" component={Log} />
            </Switch>
        </Router>
            
        <Footer />
    </div>
    )
  }
}

export default App;