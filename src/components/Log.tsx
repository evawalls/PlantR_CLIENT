import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import APIURL from '../Helpers/environment';


export interface LogProps {
    sessionToken: string;
    fetchLogs: Function;
    uploadImage: Function;

  }
  
  export interface LogState {
    date: string;
    log: string;
    loading: boolean;
    imageURL: string;
    secure_url: string;
  }
  
   class Log extends React.Component<LogProps, LogState> {
    constructor(props: LogProps) {
      super(props);
      this.state = { 
        date: '',
        log: '',
        loading: true,
        imageURL: '',
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
        fetch(`${APIURL}/createlocation`, {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
          }),
          body: JSON.stringify({ log: {date: this.state.date, log: this.state.log, imageURL: this.state.imageURL } })
        })
        .then(response => response.json())
        .then(logData => {
          console.table(logData);
          this.setState({ date: ''});
          this.setState({ log: ''});
          this.setState({ imageURL: ''});
          this.props.fetchLogs();
        })
      }


    render () {
        return (
            <div>
                 <Container>

    <h3>Add a new log</h3>
    <br/>
    <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Date"
                type="date"
                InputLabelProps={{
                shrink: true,
                }}
                onChange={(e) => this.setState({date: e.target.value})}
                name='date'
                value={this.state.date}
                autoComplete="date"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="log"
                name="log"
                variant="outlined"
                required
                fullWidth
                
                onChange={(e) => this.setState({log: e.target.value})}
                value={this.state.log}
                id="log"
                label="Log"
                autoFocus
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
            Log entry!
          </Button >
    </Container>
    
            </div>
        );    
    }
  }
  export default Log;
