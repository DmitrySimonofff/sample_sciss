import React from "react";
import WalletConnectButton from "../WalletConnectButton";
import { Link } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import logo from "../../images/logo.svg";
import btn from "../../images/button.png";
import btnSocial from "../../images/button-social.png";
import facebook from "../../images/facebook.svg";
import linkedin from "../../images/linkedin.svg";
import twitter from "../../images/twitter.svg";
import instagram from "../../images/instagram.svg";

const Navbar = () => {

  const customBtn = {
    width: {
      xs: '85px',
      sm: '158px'
    },
    height: {
      xs: '29px',
      sm: '54px'
    },
    fontSize: {
      xs: '11px',
      sm: '14px'
    },
    border: 'none',
    borderRadius: '0',
    mx: '10px',
    backgroundSize: 'contain !important',
    filter: {
      xs: 'none',
      md: 'drop-shadow(0 62px 167px rgba(53,70,160,.34)) drop-shadow(0 27.0463px 43.4119px rgba(53,70,160,.14)) drop-shadow(0 14.1788px 21.0649px rgba(53,70,160,.07)) drop-shadow(0 7.22212px 16.5187px rgba(53,70,160,.12)) drop-shadow(0 2.89113px 11.7815px rgba(53,70,160,.03))'
    },
    background: `url(${btn}) no-repeat 0 0, transparent`,
    lineHeight: '40px',
    transition: 'none',
    "&:hover": {
      border: 'none',
      backgroundColor: 'transparent'
    }
  };

  const customSocialBtn = {
    ...customBtn,
    width: '57px',
    minWidth: '57px',
    background: `url(${btnSocial}) no-repeat 0 0, transparent`,
    display: {
      xs: 'none',
      lg: 'inline-flex'
    },
    "&:hover": {
      border: 'none',
      backgroundColor: 'transparent'
    }
  };

  return (
    <Grid container spacing={2} alignItems={'center'} py={4.7} px={3}>
      <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'block' } }} textAlign={'left'}>
        <Link to="/">
          <img src={logo} />
        </Link>
      </Grid>
      <Grid item xs={12} sm={8} textAlign={'center'}>
        <Button sx={customBtn} component={Link} to="/" variant="outlined">Home</Button>
        <Button sx={customBtn} component={Link} to="/cabinet" variant="outlined">Cabinet</Button>
        <Button sx={customBtn} component={Link} to="/mint" variant="outlined">Mint</Button>
        <Button sx={customSocialBtn} target="_blank" component={Link} to="https://facebook.com/" variant="outlined"><img src={facebook} alt="Facebook" /></Button>
        <Button sx={customSocialBtn} target="_blank" component={Link} to="https://linkedin.com/" variant="outlined"><img src={linkedin} alt="LinkedIn" /></Button>
        <Button sx={customSocialBtn} target="_blank" component={Link} to="https://twitter.com/" variant="outlined"><img src={twitter} alt="Twitter" /></Button>
        <Button sx={customSocialBtn} target="_blank" component={Link} to="https://instagram.com/" variant="outlined"><img src={instagram} alt="Instagram" /></Button>
      </Grid>
      <Grid item xs={2} sx={{ display: { xs: 'none', sm: 'block' } }} textAlign={'right'}>
        <WalletConnectButton />
      </Grid>
    </Grid>
  );
};

export default Navbar;
