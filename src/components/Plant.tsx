import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import APIURL from '../Helpers/environment';


export interface PlantProps {
    sessionToken: string;
    fetchPlants: Function;
    uploadImage: Function;

  }
  
  export interface PlantState {
    name: string;
    quantity: string;
    caretaker: string;
    imageURL: string;
    loading: boolean;
    secure_url: string;
  }
  
   class Plant extends React.Component<PlantProps, PlantState> {
    constructor(props: PlantProps) {
      super(props);
      this.state = { 
        name: '',
        quantity: '',
        caretaker: '',
        imageURL: '',
        loading: true,
        secure_url: '',
      };
    }
    uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        const data = new FormData();
        data.append("file", files![0])
        data.append('upload_preset', 'plantr')
        this.setState({loading: true})
        console.log(data)
        const res = await fetch(`https://api.cloudinary.com/v1_1/plantr/image/upload`, {
            method: 'POST',
            body: data
        })
        const file = await res.json()
        this.setState({imageURL: file.secure_url})
        console.log(this.state.imageURL)
        // this.setState({secure_url: ''});
        
    }
    handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('sessionToken');
        e.preventDefault();
        fetch(`${APIURL}/garden/createplant`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token ? token : ''
          }),
          body: JSON.stringify({ plant: {name: this.state.name, quantity: this.state.quantity, caretaker: this.state.caretaker,  imageURL: this.state.imageURL } })
        })
        .then(response => response.json())
        .then(plantData => {
          console.table(plantData);
          this.setState({ name: ''});
          this.setState({ quantity: ''});
          this.setState({ caretaker: ''});
          this.setState({ imageURL: ''});
          //this.props.fetchPlants();
        })
      }


    render () {
        return (
            <div>
                 <Container>

    <h3>Add a new plant</h3>
    <br/>
    <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                
                onChange={(e) => this.setState({name: e.target.value})}
                value={this.state.name}
                id="name"
                label="Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                onChange={(e) => this.setState({quantity: e.target.value})}
                value={this.state.quantity}
                name="quantity"
                autoComplete="quantity"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="caretaker"
                label="Caretaker"
                onChange={(e) => this.setState({caretaker: e.target.value})}
                value={this.state.caretaker}
                name="caretaker"
                autoComplete="caretaker"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="upload-photo"
                type="file"
                onChange={this.uploadImage}
                id="image"
                autoComplete="image"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            onClick={this.handleSubmit}
            fullWidth
            variant="contained"
          >
            Enter Plant!
          </Button >
    </Container>
    
            </div>
        );    
    }
  }
  export default Plant;
