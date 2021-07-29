import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import APIURL from '../Helpers/environment';


export interface CreateGardenProps {
    sessionToken: string;
    fetchGardens: Function;
    uploadImage: Function;

  }
  
  export interface CreateGardenState {
    name: string;
    caretaker: string;
    imageURL: string;
    locationId: string;
    loading: boolean;
    secure_url: string;
  }
  
  const useStyles = makeStyles((theme) => ({
    palette: {
      primary: {
        main: '#aecbea',
      },
      secondary: {
        main: '#c2b092',
      },
    },
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
   
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    button: {
      margin: theme.spacing(3, 0, 2),
      backgroundColor: '#ffffff',
    },
    checkbox: {
      backgroundColor: '#b65f50',
    },
  }));
  

  class CreateGarden extends React.Component<CreateGardenProps, CreateGardenState> {
    constructor(props: CreateGardenProps) {
      super(props);
      this.state = { 
        name: '',
        caretaker: '',
        imageURL: '',
        locationId: '',
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
        fetch(`${APIURL}/garden/creategarden`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': token ? token : ''
          }),
          body: JSON.stringify({ garden: {name: this.state.name, caretaker: this.state.caretaker, imageURL: this.state.imageURL,  locationId: this.state.locationId } })
        })
        .then(response => response.json())
        .then(gardenData => {
          console.table(gardenData);
          this.setState({ name: ''});
          this.setState({ caretaker: ''});
          this.setState({ imageURL: ''});
          this.setState({ locationId: ''});
          //this.props.fetchGardens();
        })
      }


    render () {
        return (
            <div>
                 <Container color="">

    <h3>Start a garden!</h3>
    <br/>
    <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Name"
                name="name"
                variant="outlined"
                required
                fullWidth
                color="primary"
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
                id="location"
                label="Location"
                onChange={(e) => this.setState({locationId: e.target.value})}
                value={this.state.locationId}
                name="location"
                autoComplete="location"
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
              <br />
          <Button
            type="submit"
            onClick={this.handleSubmit}
            fullWidth
            variant="contained"
          >
            Start Garden!
          </Button >
    </Container>
    
            </div>
        );    
    }
  }
  export default CreateGarden;
