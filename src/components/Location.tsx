import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';
import APIURL from '../Helpers/environment';


export interface LocationProps {
    sessionToken: string;
    fetchLocations: Function;
    // uploadImage: Function;

  }
  
  export interface LocationState {
    street: string;
    city: string;
    state: string;
    zipcode: string;
  }
  
   class Location extends React.Component<LocationProps, LocationState> {
    constructor(props: LocationProps) {
      super(props);
      this.state = { 
        street: '',
        city: '',
        state: '',
        zipcode: '',
      };
    }

    handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetch(`${APIURL}/createlocation`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
          }),
          body: JSON.stringify({ location: {street: this.state.street, city: this.state.city, state: this.state.state,  zipcode: this.state.zipcode } })
        })
        .then(response => response.json())
        .then(logData => {
          console.table(logData);
          this.setState({ street: ''});
          this.setState({ city: ''});
          this.setState({ state: ''});
          this.setState({ zipcode: ''});
          this.props.fetchLocations();
        })
      }


    render () {
        return (
            <div>
                 <Container>

    <h3>Add a  new location</h3>
    <br/>
    <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="street"
                name="street"
                variant="outlined"
                required
                fullWidth
                
                onChange={(e) => this.setState({street: e.target.value})}
                value={this.state.street}
                id="street"
                label="Street"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                onChange={(e) => this.setState({city: e.target.value})}
                value={this.state.city}
                name="city"
                autoComplete="city"
              />
            </Grid>
            <Grid item xs={12}>
            <InputLabel id="demo-simple-select">State</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                variant="outlined"
                required
                fullWidth
                name="state"
                onChange={(e: any) => this.setState({state: e.target.value})}
                value={this.state.state}
                label="State"
                id="state"
                autoComplete="State"
                >
                  <MenuItem value='Alabama'>Alabama</MenuItem>
                  <MenuItem value='Alaska'>Alaska</MenuItem>
                  <MenuItem value='Arizona'>Arizona</MenuItem>
                  <MenuItem value='California'>California</MenuItem>
                  <MenuItem value='Colorado'>Colorado</MenuItem>
                  <MenuItem value='Connecticut'>Connecticut</MenuItem>
                  <MenuItem value='Delaware'>Delaware</MenuItem>
                  <MenuItem value='Florida'>Florida</MenuItem>
                  <MenuItem value='Georgia'>Georgia</MenuItem>
                  <MenuItem value='Hawaii'>Hawaii</MenuItem>
                  <MenuItem value='Idaho'>Idaho</MenuItem>
                  <MenuItem value='Illinois'>Illinois</MenuItem>
                  <MenuItem value='Indiana'>Indiana</MenuItem>
                  <MenuItem value='Iowa'>Iowa</MenuItem>
                  <MenuItem value='Kansas'>Kansas</MenuItem>
                  <MenuItem value='Kentucky'>Kentucky</MenuItem>
                  <MenuItem value='Louisiana'>Louisiana</MenuItem>
                  <MenuItem value='Maine'>Maine</MenuItem>
                  <MenuItem value='Maryland'>Maryland</MenuItem>
                  <MenuItem value='Massachusetts'>Massachusetts</MenuItem>
                  <MenuItem value='Michigan'>Michigan</MenuItem>
                  <MenuItem value='Michigan'>Minnesota</MenuItem>
                  <MenuItem value='Mississippi'>Mississippi</MenuItem>
                  <MenuItem value='Missouri'>Missouri</MenuItem>
                  <MenuItem value='Montana'>Montana</MenuItem>
                  <MenuItem value='Nebraska'>Nebraska</MenuItem>
                  <MenuItem value='Nevada'>Nevada</MenuItem>
                  <MenuItem value='New Hampshire'>New Hampshire</MenuItem>
                  <MenuItem value='New Jersey'>New Jersey</MenuItem>
                  <MenuItem value='New Mexico'>New Mexico</MenuItem>
                  <MenuItem value='New York'>New York</MenuItem>
                  <MenuItem value='North Carolina'>North Carolina</MenuItem>
                  <MenuItem value='North Dakota'>North Dakota</MenuItem>
                  <MenuItem value='Ohio'>Ohio</MenuItem>
                  <MenuItem value='Oklahoma'>Oklahoma</MenuItem>
                  <MenuItem value='Oregon'>Oregon</MenuItem>
                  <MenuItem value='Pennsylvania'>Pennsylvania</MenuItem>
                  <MenuItem value='Rhode Island'>Rhode Island</MenuItem>
                  <MenuItem value='South Carolina'>South Carolina</MenuItem>
                  <MenuItem value='South Dakota'>South Dakota</MenuItem>
                  <MenuItem value='Tennessee'>Tennessee</MenuItem>
                  <MenuItem value='Texas'>Texas</MenuItem>
                  <MenuItem value='Utah'>Utah</MenuItem>
                  <MenuItem value='Vermont'>Vermont</MenuItem>
                  <MenuItem value='Virginia'>Virginia</MenuItem>
                  <MenuItem value='Washington'>Washington</MenuItem>
                  <MenuItem value='West Virginia'>West Virginia</MenuItem>
                  <MenuItem value='Wisconsin'>Wisconsin</MenuItem>
                  <MenuItem value='Wyoming'>Wyoming</MenuItem>
                </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={this.handleSubmit}
            fullWidth
            variant="contained"
          >
            Create Garden!
          </Button >
    </Container>
    
            </div>
        );    
    }
  }
  export default Location;
