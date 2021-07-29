import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import APIURL from '../Helpers/environment';


export interface BiodataProps {
    sessionToken: string;
    fetchBiodata: Function;
  }
  
  export interface BiodataState {
    name: string;
    caretaker: string;
    imageURL: string;
    locationId: string;
    loading: boolean;
    secure_url: string;
  }
  
//   const useStyles = makeStyles((theme) => ({
//     palette: {
//       primary: {
//         main: '#aecbea',
//       },
//       secondary: {
//         main: '#c2b092',
//       },
//     },
//     paper: {
//       marginTop: theme.spacing(8),
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//     },
//     BirdrIcon: {
//       margin: theme.spacing(1),
//       backgroundColor: '#c2b092',
//     },
//     form: {
//       width: '100%', 
//       marginTop: theme.spacing(1),
//     },
//     button: {
//       margin: theme.spacing(3, 0, 2),
//       backgroundColor: '#eae3cb',
//     },
//     checkbox: {
//       backgroundColor: '#b65f50',
//     },
//   }));
  

  class Biodata extends React.Component<BiodataProps, BiodataState> {
    constructor(props: BiodataProps) {
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

     uploadImage = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const target = (e.target as HTMLInputElement);
        const files: File = (target.files as FileList)[0];
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'cloudinary-plantr')
        this.setState({loading: true})
        console.log(data)
        const res = await fetch('https://api.cloudinary.com/v1_1/plantr/image/upload', {
            method: 'POST',
            body: data
        })
        const file = await res.json()
        this.setState({imageURL: file.secure_url})
        console.log(this.state.imageURL)
        this.setState({secure_url: ''});
        
    }
    handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        fetch(`${APIURL}/createGarden`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
          }),
          body: JSON.stringify({ garden: {name: this.state.name, caretaker: this.state.caretaker, imageURL: this.state.imageURL,  locationId: this.state.locationId } })
        })
        .then(response => response.json())
        .then(logData => {
          console.table(logData);
          this.setState({ name: ''});
          this.setState({ caretaker: ''});
          this.setState({ imageURL: ''});
          this.setState({ locationId: ''});
          this.props.fetchBiodata();
        })
      }


    render () {
        return (
            <div>
                 <Container>

    <h3>Submit</h3>
    <br/>
    <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Name"
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
  export default Biodata;
