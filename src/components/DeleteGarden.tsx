import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { sizing } from '@material-ui/system';
//import GardenEdit from './GardenEdit';
import APIURL from '../Helpers/environment';
import { stringify } from 'querystring';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    root: {
      maxWidth: 340,
      margin: 20,
      
      },
      media: {
      height: 240,
      },
  }});
  const classes = useStyles();


export interface DeleteGardenProps {
    sessionToken: string;
    open: boolean;
    id: string;
    fetchGardens: Function;

  }
  
  export interface DeleteGardenState {
    open: boolean;
    id: string;
  }
  
  class DeleteGarden extends React.Component<DeleteGardenProps, DeleteGardenState> {
    constructor(props: DeleteGardenProps) {
      super(props);
      this.state = { 
        open: false,
        id: '',
      };
    }
    
    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
      this.setState({ open: false});
    };
    deleteGarden = (e: React.ChangeEvent<HTMLInputElement>) => {

    fetch(`${APIURL}/garden/deletegarden/${this.props.id}`, {
    method: 'DELETE',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.sessionToken
        })
        })
        .then(() => this.props.fetchGardens())
    };

    
     render() {
      return (
          <div>

      {/* <Table alignItem="baseline">
        <tbody> */}
        {/* <Card className={classes.root} style={{ width: '100%' }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.bird.image_id}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography align='center' gutterBottom variant="h5" component="h2">
          {props.bird.species}
          </Typography>
          <Typography align='center' variant="body2" color="textSecondary" component="p">
          {props.bird.location}
          </Typography>
          <Typography align='center' variant="body2" color="textSecondary" component="p">
          {props.bird.date} || {props.bird.time}
          </Typography>
          <Typography align='center' variant="body2" color="textSecondary" component="p">Rarity Rating: {props.bird.rarity}
          </Typography>
          <Typography align='center' variant="body2" color="textSecondary" component="p">
          {props.bird.secret}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent: 'center'}}>
      <Button  color="warning" onClick={() => {props.editUpdateGarden(props.bird); handleClickOpen(); props.updateOn()}} >Update</Button>
      <Button  color="danger" onClick={() => deleteGarden(props.garden)}>Delete</Button>
      </CardActions>
    </Card> */}
        {/* </tbody>
      </Table> */}
    
          {/* </div> */}
          </div>
          );
        }
      }
      
      export default DeleteGarden;

  


