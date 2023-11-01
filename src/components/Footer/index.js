import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import EllipseLeft from "../../images/ellipse-left.png";
import EllipseRight from "../../images/ellipse-right.png";
import { Link } from "react-router-dom";
import btnFooter from "../../images/button-footer.svg";
import btnSocialFooter from "../../images/button-footer-social.svg";
import facebook from "../../images/facebook-footer.svg";
import linkedin from "../../images/linkedin-footer.svg";
import twitter from "../../images/twitter-footer.svg";
import instagram from "../../images/instagram-footer.svg";
import faqFooter from "../../images/faq-footer.png";
import howFooter from "../../images/how-footer.png";
import flipFooter from "../../images/flip-footer.png";
import closeIcon from "../../images/close-icon.svg";
import accept from "../../images/accept.png";
import decline from "../../images/decline.png";
import dayjs from "dayjs";
import { useState } from "react";
import { useTheme } from "@emotion/react";


const Footer = () => {

  const customBtn = {
    background: `url(${btnFooter}) no-repeat 0 0, linear-gradient(180deg, rgba(1, 3, 5, 0.13) 0%, rgba(255, 255, 255, 0.13) 100%), #1c4238`,
    width: '389px',
    textAlign: 'center',
    height: '89px',
    boxShadow: '1px 1px 0px 0px rgba(255, 255, 255, 0.15) inset, -1px -1px 0px 0px #000 inset, 0px 22px 24px 0px rgba(4, 15, 31, 0.28)',
    cursor: 'pointer',
    color: '#24F2A7',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '1.19px',
    textTransform: 'uppercase',
    borderRadius: '0',
    transition: 'filter .15s ease-in-out',
    mx: 1.5,
    "&:hover": {
      filter: 'brightness(130%)',
      transition: 'filter .15s ease-in-out'
    }
  };

  const customBtnMob = {
    width: '283.5px',
    textAlign: 'center',
    height: '54px',
    filter: {
      xs: 'none',
      md: 'drop-shadow(0 62px 167px rgba(53,70,160,.34)) drop-shadow(0 27.0463px 43.4119px rgba(53,70,160,.14)) drop-shadow(0 14.1788px 21.0649px rgba(53,70,160,.07)) drop-shadow(0 7.22212px 16.5187px rgba(53,70,160,.12)) drop-shadow(0 2.89113px 11.7815px rgba(53,70,160,.03))'
    },
    cursor: 'pointer',
    color: '#24F2A7',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    letterSpacing: '1.19px',
    textTransform: 'uppercase',
    border: 'none',
    borderRadius: '0',
    my: 2,
    mx: 1.5,
    "&:hover": {
      border: 'none'
    }
  };

  const customSocialBtn = {
    ...customBtn,
    width: '89px',
    background: `url(${btnSocialFooter}) no-repeat 0 0, transparent`,
    mx: 6,
    zIndex: '10',
    display: {
      xs: 'none',
      lg: 'inline-flex'
    }
  };

  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {window.innerWidth < 600 ? (
        <Grid container>
          <Grid item xs={12} py={10} textAlign={'center'}>
            <Button sx={customBtnMob} onClick={handleClickOpen} variant="outlined">
              <img src={faqFooter} alt="FAQ" />
            </Button>
            <Button sx={customBtnMob} onClick={handleClickOpen} variant="outlined">
              <img src={howFooter} alt="How to play" />
            </Button>
            <Button sx={customBtnMob} onClick={handleClickOpen} variant="outlined">
              <img src={flipFooter} alt="Flip responsibly" />
            </Button>
          </Grid>
          <Grid item py={3} xs={12} sx={{ textAlign: 'center', background: '#17322B', zIndex: '10' }}>
            <Typography variant="body2" gutterBottom sx={{
              textTransform: 'uppercase',
              color: 'rgba(194, 205, 218, 0.73)',
              letterSpacing: '5.33px',
              mb: 0
            }}>
              {'©' + dayjs().year() + ' all rights reserved RockPaperScissors'}
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <Grid container pt={28} position={'relative'} sx={{ background: "#1C4238" }}>
          <Grid item xs={12} textAlign={'center'}>
            <Button sx={customBtn} variant="outlined" onClick={handleClickOpen}>Faq</Button>
            <Button sx={customBtn} variant="outlined" onClick={handleClickOpen}>How to play</Button>
            <Button sx={customBtn} variant="outlined" onClick={handleClickOpen}>Flip responsibly</Button>
            <Divider sx={{ background: '#24F2A7', mt: 14 }} variant="middle" />
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h2" gutterBottom sx={{
              mt: 9.8,
              fontSize: '35px',
              textTransform: 'uppercase',
              color: '#FFFFFF'
            }}>
              rockpaperscissors
            </Typography>
            <Typography variant="body1" gutterBottom sx={{
              mt: 9,
              color: 'rgba(255, 255, 255, 0.46)',
              lineHeight: '273%',
              fontSize: '18px',
              letterSpacing: '0.36px'
            }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed <br /> dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas <br /> eget condimentum velit, sit amet feugiat lectus.
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 16, mb: 11 }}>
            <Button sx={customSocialBtn} target="_blank" component={Link} to="https://facebook.com/" variant="outlined"><img src={facebook} alt="Facebook" /></Button>
            <Button sx={customSocialBtn} target="_blank" component={Link} to="https://linkedin.com/" variant="outlined"><img src={linkedin} alt="LinkedIn" /></Button>
            <Button sx={customSocialBtn} target="_blank" component={Link} to="https://twitter.com/" variant="outlined"><img src={twitter} alt="Twitter" /></Button>
            <Button sx={customSocialBtn} target="_blank" component={Link} to="https://instagram.com/" variant="outlined"><img src={instagram} alt="Instagram" /></Button>
          </Grid>
          <Grid item py={3} xs={12} sx={{ textAlign: 'center', background: '#17322B', zIndex: '10' }}>
            <Typography variant="body2" gutterBottom sx={{
              textTransform: 'uppercase',
              color: 'rgba(194, 205, 218, 0.73)',
              letterSpacing: '5.33px',
              mb: 0
            }}>
              {'©' + dayjs().year() + ' all rights reserved RockPaperScissors'}
            </Typography>
          </Grid>
          <img src={EllipseLeft} style={{ position: 'absolute', bottom: '0', left: '-10%' }} />
          <img src={EllipseRight} style={{ position: 'absolute', bottom: '0', right: '0' }} />
        </Grid>
      )}
      <Dialog
        fullScreen={fullScreen}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ textTransform: 'uppercase' }}>
          {"Lorem ipsum dolor sit popup"}
          <IconButton sx={{ float: 'right' }} onClick={handleClose}>
          <img src={closeIcon} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
          </DialogContentText>
          <DialogContentText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button sx={{
            width: 284,
            height: 55,
            color: '#24F2A7',
            background: `url(${accept})`
          }} autoFocus onClick={handleClose}>
            Accept
          </Button>
          <Button sx={{
            width: 285,
            height: 55,
            background: `url(${decline})`
          }} onClick={handleClose} autoFocus>
            Decline
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Footer;
