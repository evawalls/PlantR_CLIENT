import React from 'react';
import { createStyles, makeStyles, Theme, } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Logo from './images/PlantRLogo.png'
import Menu from './Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    }),
);


export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static"style={{ background: '#7ACFB3' }}>
        <Toolbar>
          <Menu />
          <Typography variant="h6" className={classes.title}>
          <Link to="/"> <img style={{ width: 150 }} src={String(Logo)} alt="PlantR" />
          </Link></Typography>
          <Button onClick={() => { localStorage.clear() }}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}