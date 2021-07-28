import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import GardenCard from './GardenCard';
// import Plant from "./Plant";


export interface MainPageProps {
  sessionToken: string;
  

}

export interface MainPageState {
  
}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = { 
            
    };
    console.log(this.props);
  }

  

  render () {
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h2>
                Welcome, -first_name-.
              </h2>
              <p>
                Wouldn't a quote about gardening, growth or the seasons be nice here? Yeah, I thought so, too.
              </p>
              <p>
                <Link to="/start">
                  <Button style={{ background: '#6785A0'}}>Add a new Garden</Button>
                </Link>
                            
              </p>
            </div>

            

            <div className="row">
            {/* <GardenCard /> */}
              <div className="col-md-4">
                <div className="card">
                  <h5 className="card-header">
                  &lt;garden.name&gt;
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                    Caretaker: &lt;garden.caretaker&gt;
                    </p>
                  </div>
                  <div className="card-footer">
                  &lt;Garden.imageURL&gt;
                  </div>
                </div>
              </div>
              <div className="col-md-4">
              <div className="card">
                  <h5 className="card-header">
                  &lt;garden.name&gt;
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                    Caretaker: &lt;garden.caretaker&gt;
                    </p>
                  </div>
                  <div className="card-footer">
                  &lt;Garden.imageURL&gt;
                  </div>
                </div>
              </div>
              <div className="col-md-4">
              <div className="card">
                  <h5 className="card-header">
                  &lt;garden.name&gt;
                  </h5>
                  <div className="card-body">
                    <p className="card-text">
                    Caretaker: &lt;garden.caretaker&gt;
                    </p>
                  </div>
                  <div className="card-footer">
                  &lt;Garden.imageURL&gt;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
          );
        }
      }

export default MainPage;