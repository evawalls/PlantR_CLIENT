import React from 'react';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//import BirdEdit from './BirdEdit';
import APIURL from '../Helpers/environment';


// const useStyles = makeStyles({
//     table: {
//         minWidth: 650,
//       },
//     root: {
//       maxWidth: 340,
//       margin: 20,
      
//     },
//     media: {
//       height: 240,
//     },
//   });
  

  export interface GardenCardProps {
    sessionToken: string;
    open: boolean;
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
    fetchGardens: Function;
    gardens: GardenObject[];

  }
  export interface GardenObject {
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
  }

  export interface GardenCardState {
    gardens: GardenObject[];
    open: boolean;
    id: string;
    name: string;
    caretaker: string;
    imageURL: string;
  }

  class GardenCard extends React.Component<GardenCardProps, GardenCardState> {
    constructor(props: GardenCardProps) {
        super(props);
        this.state = {
            open: false,
            gardens: [{          
                name: '',
                id: '',
                caretaker: '',
                imageURL: ''
            }],
            name: '',
                id: '',
                caretaker: '',
                imageURL: ''
        };
    }

    handleClickOpen = () => {
    this.setState({ open: true});
    };

    handleClose = () => {
    this.setState({ open: false});
    };


    
    fetchGardens() {  
        fetch(`${APIURL}/garden/getgardens/`, {
        method: 'GET',
        headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('sessionToken')}`
      })
    })
    .then(response => response.json())
    .then((GardenObject) => {
    this.setState({gardens: GardenObject});
        //    this.setState({garden: gardenData})}
    // .then(() => this.props.fetchGardens())
  });
}

componentDidMount = () => {

    this.fetchGardens();
     console.log(this.state.gardens)
  }
  
//   displayCard() {
//     return this.state.climbs.length > 0 ? this.state.climbs.map((climb) => <OutdoorClimbs climb={climb} climbs={this.state.climbs} editUpdateClimb={this.editUpdateClimb} updateOn={this.updateOn} fetchClimbs={this.fetchClimbs.bind(this)} sessionToken={this.props.sessionToken} />) : null;
  

 
  render () {
    return (
    <div>
    
        <Card style={{ width: '100%' }}>
      <CardActionArea>        
        <CardContent>
          <Typography align='center' gutterBottom variant="h5" component="h2">
          {this.props.name}
          </Typography>
          <Typography align='center' variant="body2" color="textSecondary" component="p">
          {this.props.caretaker}
          </Typography>
        </CardContent>
        <CardMedia
          image={this.props.imageURL}
          title={this.props.name}
        />
      </CardActionArea>
      <CardActions style={{justifyContent: 'center'}}>
      {/* <Button  color="primary" onClick={() => {this.props.editUpdateBird(this.props.bird); handleClickOpen(); this.props.updateOn()}} >Visit</Button> */}
      </CardActions>
    </Card>
        {/* </tbody>
      </Table> */}
    </div>
  );
};
  }
export default GardenCard;