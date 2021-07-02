import React from "react";
import MainPage from "./components/MainPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Auth from "./auth/Auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateGarden from './components/CreateGarden';



//import './App.css';

type UpdateToken = {
  sessionToken: string,
}

export interface AppProps{

}
export interface AppState {
  sessionToken: string,
  
  

}

class App extends React.Component<AppProps, AppState> {

  constructor(props: string){
    super(props);
    this.state = { 
      sessionToken: '',
      
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem('sessionToken', newToken);
    console.log(newToken);
    this.setState({
      sessionToken: newToken,
    });
    
  }  

  protectedViews = () => {
    return ( localStorage.getItem('sessionToken') ? <MainPage sessionToken={this.state.sessionToken}/>
    : <Auth updateToken={this.updateToken}/>)
  }

  render() {
    return (
    <div>
        <Header />
        <Router>
        <Switch>
              <Route exact path="/" >{this.protectedViews()}</Route>
              <Route path="/CreateGarden" component={CreateGarden} />
            </Switch>
        </Router>
            
        <Footer />
    </div>
    )
  }
}

export default App;