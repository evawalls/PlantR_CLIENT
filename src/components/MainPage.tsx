import * as React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import GardenCard from './GardenCard';
// import Plant from "./Plant";
import APIURL from '../Helpers/environment';
import { GardenList } from "./PlantrInterfaces";


export interface MainPageProps {
  sessionToken: string;
  first_name: string;
  

}

export interface MainPageState {
  first_name: string;
  id: string;
  gardens: GardenList[];
  gardenToUpdate: {};
  updateActive: boolean;
  
  


}

class MainPage extends React.Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = { 
      first_name: '',
      id: '',
      gardens: [{
        id: '',
        name: '',
        caretaker: '',
        imageURL: '',
        locationId: '',
        // loading: false,
        secure_url: ''
      }],
      gardenToUpdate: '',
      updateActive: false
    };
    console.log(this.props);
  }

  fetchgardens() {
    fetch(`${APIURL}/garden/getgarden`, {
    method: 'GET',
    headers: new Headers({
    'Content-Type': 'application/json',
    'Authorization': `${localStorage.getItem('sessionToken')}`
    })
    })
    .then(response => response.json())
    .then((MainPageData) => {
    console.log(MainPageData)
    this.setState({gardens: MainPageData});
    });
    }
    editUpdateGarden = (garden: number) => {
    this.setState({gardenToUpdate: garden});
    console.log(garden);
    }
    
    updateOn = () => this.setState({updateActive: true});
    updateOff = () => this.setState({updateActive: false});  
  
    // displayGardens() {
    // return this.state.gardens.length > 0 ? this.state.gardens.map((garden) => <GardenCard garden={garden} gardens={this.state.gardens} editUpdateGarden={this.editUpdateGarden} updateOn={this.updateOn} fetchgardens={this.fetchgardens.bind(this)} sessionToken={this.props.sessionToken} />) : null;
    // }
    
    
  

  render () {
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="jumbotron">
              <h2>
                Welcome, {this.props.first_name}.
              </h2>
              <p>
                Wouldn't a quote about gardening, growth or the seasons be nice here? Yeah, I thought so, too.
              </p>
              <p>
                <Link to="/start">
                  <Button style={{ background: '#008037'}}>Add a new Garden</Button>
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