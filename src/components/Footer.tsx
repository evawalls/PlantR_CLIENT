import * as React from "react";
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';



export interface FooterProps {}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.evawalls.com/" target="_blank">
        evawalls
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const Footer: React.SFC<FooterProps> = () => {
  return <footer><Copyright /></footer>;
};

export default Footer;