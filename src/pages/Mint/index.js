import React, { useState } from "react";
import {
  useMaxSupply,
  useTotalSupply,
  useCost,
  useMaxPerAccount,
  useMaxPerTransaction,
} from "../../hooks";
import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import { notify } from "../../helpers/alerts";
import { cryptoHandsAddress } from "../../config";
import { cryptoHandsInterface } from "../../sdk";
import { Box, Button, Card, CardContent, Grid, Link, Typography } from "@mui/material";
import leftSide from "../../images/left-side-mint.png";
import rightSide from "../../images/right-side-mint.png";
import slide1 from "../../images/slide1.png";
import arrowLeft from "../../images/arrow-left.png";
import arrowRight from "../../images/arrow-right.png";
import slide1Second from "../../images/slide1-2.png";
import slide2Second from "../../images/slide2-2.png";
import slide1SecondMob from "../../images/slide1-2-mob.png";
import slide2SecondMob from "../../images/slide2-2-mob.png";
import progress from "../../images/progress.png";
import progressArrow from "../../images/progress-arrow.png";
import mintBg from "../../images/mint-bg.png";
import mintBgMob from "../../images/mint-bg-mob.png";
import etherSymbolGreen from "../../images/ether-symbol-green.png";
import etherSymbolOrange from "../../images/ether-symbol-orange.png";
import minusBtn from "../../images/minus-btn.png";
import plusBtn from "../../images/plus-btn.png";
import minusBtnMob from "../../images/minus-btn-mob.png";
import plusBtnMob from "../../images/plus-btn-mob.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WalletConnectButton from "../../components/WalletConnectButton";
import { useEffect } from "react";
import { Link as rLink } from "react-router-dom";


const Mint = () => {
  const { account } = useEthers();
  const [amount, setAmount] = useState(1);

  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const cost = useCost();
  const maxPerAcc = useMaxPerAccount();
  const maxPerTx = useMaxPerTransaction();

  const formattedTotalSupply = totalSupply ? totalSupply.toNumber() : 0;
  const formattedMaxSupply = maxSupply ? maxSupply.toNumber() : 0;
  const formattedCost = cost ? cost.toString() : 0;
  const formattedPerAcc = maxPerAcc ? maxPerAcc.toNumber() : 0;
  const formattedMaxPerTx = maxPerTx ? maxPerTx.toNumber() : 0;

  const increase = () => {
    if (amount < formattedMaxPerTx) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const mint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = amount * Number(formattedCost);
      const formattedTxCost = txCost.toString();

      const contract = new ethers.Contract(
        cryptoHandsAddress,
        cryptoHandsInterface,
        signer
      );

      let tx = await contract.mintHands(amount, { value: formattedTxCost });
      await notify(
        "Waiting for Confirmation",
        "Please Wait while confirmation of transaction",
        "info"
      );
      await tx.wait();

      await notify(
        "Bet Successfull",
        "You have successfully minted",
        "success"
      );
    } catch (error) {
      // notify("Error", "Something Went Wrong While Minting", "error");
      notify(error);
      console.log(error);
    }
  };

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: `url(${arrowLeft})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: 17,
          height: 31,
          zIndex: 10
        }}
        onClick={onClick}
      />
    );
  }

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: `url(${arrowRight})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: 17,
          height: 31,
          zIndex: 10
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    dots: true,
    infinite: true,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true,
    adaptiveHeight: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const sliderImages = [
    {
      image: slide1,
    },
    {
      image: slide1,
    },
    {
      image: slide1,
    },
    {
      image: slide1,
    },
    {
      image: slide1,
    }
  ];

  const sliderImages2 = [
    {
      image: window.innerWidth < 600 ? slide1SecondMob : slide1Second,
    },
    {
      image: window.innerWidth < 600 ? slide2SecondMob : slide2Second,
    },
  ];

  const [slider, setSlider] = useState([...sliderImages]);
  const [slider2, setSlider2] = useState([...sliderImages2]);

  return (
    <Grid container textAlign={'center'}>
      <Grid item xs={12} pt={5}>
        <Typography variant="h1" gutterBottom sx={{
          fontSize: '96px',
          lineHeight: '114.8%',
          textAlign: 'center',
          textTransform: 'capitalize',
          backgroundImage: 'linear-gradient(90deg, #9C480B -2.37%, #FCB853 51.6%, #BF590F 97.95%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '400',
          typography: { xs: 'h4', sm: 'h3', md: 'h1' }
        }}>
          Sale Open
        </Typography>
      </Grid>
      <Grid item xs={12} md={4} position={'relative'} minHeight={355} sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={leftSide} alt="Left Side" style={{ position: 'absolute', left: '0' }} />
      </Grid>
      <Grid item xs={12} md={4} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box
          sx={{
            m: 0,
            p: 0,
            width: window.innerWidth < 600 ? 309 : 375,
            height: window.innerWidth < 600 ? 247 : 300
          }}>
          <Slider {...settings}>
            {slider.map((item, i) => (
              <div key={'slider-item' + i}>
                <img
                  src={item.image}
                  alt={'Slider item ' + i}
                  width={window.innerWidth < 600 ? 309 : 375}
                  height={window.innerWidth < 600 ? 247 : 300}
                />
              </div>
            ))}
          </Slider>
        </Box>
      </Grid>
      <Grid item xs={12} md={4} position={'relative'} minHeight={355} sx={{ display: { xs: 'none', md: 'block' } }}>
        <img src={rightSide} alt="Left Side" style={{ position: 'absolute', right: '0' }} />
      </Grid>
      <Grid item xs={12} pt={12.5} pb={7.5}>
        <Card sx={{
          width: window.innerWidth < 600 ? '100%' : 1200,
          mx: 'auto',
          overflow: 'inherit',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)'
        }}>
          <CardContent sx={{ pt: 5, pb: '64px !important', textAlign: 'center' }}>
            <Box
              sx={{
                m: 0,
                mx: 'auto',
                p: 0,
                width: window.innerWidth < 600 ? 306 : 758,
                border: '1px solid #2B5A4D',
                transform: 'skew(-40deg)',
                position: 'relative'
              }}>
              <Box
                sx={{
                  m: 0.25,
                  p: 0,
                  width: formattedTotalSupply / (formattedMaxSupply + formattedTotalSupply) * 100 + '%',
                  height: 42,
                  background: `url(${progress})`,
                  backgroundRepeat: 'space no-repeat'
                }}>
              </Box>
              <Typography variant="h6" component="div" sx={{
                textTransform: 'uppercase',
                color: '#44444D',
                position: 'absolute',
                top: '20%',
                right: '3%',
                transform: 'skew(40deg)'
              }}>
                {formattedMaxSupply} Left
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  m: 0,
                  p: 0,
                  width: 69,
                  height: 64,
                  background: `url(${progressArrow})`,
                  position: 'absolute',
                  top: '-64px',
                  left: 'calc(' + formattedTotalSupply / (formattedMaxSupply + formattedTotalSupply) * 100 + '% - 64px)',
                  transform: 'skew(40deg)',
                  filter: 'drop-shadow(0 62px 167px rgba(53,70,160,.34)) drop-shadow(0 27.0463px 43.4119px rgba(53,70,160,.14)) drop-shadow(0 14.1788px 21.0649px rgba(53,70,160,.07)) drop-shadow(0 7.22212px 16.5187px rgba(53,70,160,.12)) drop-shadow(0 2.89113px 11.7815px rgba(53,70,160,.03))'
                }}>
                <Typography variant="h6" component="div" sx={{
                  textTransform: 'uppercase',
                  color: '#44444D'
                }}>
                  {formattedTotalSupply}
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" component="div" sx={{
              textTransform: 'uppercase',
              color: '#44444D',
              mt: 6,
              mb: 3
            }}>
              price per nft: <span style={{ color: '#00CD94' }}>{formatEther(formattedCost)}</span> <img src={etherSymbolGreen} alt="Ether Symbol" />
            </Typography>
            {account ? (
              <>
                <Button sx={{
                  background: `url(${minusBtn})`,
                  verticalAlign: 'middle',
                  display: {xs: 'none', md: 'inline-block'},
                  width: 93,
                  height: 88,
                  mr: 7.5,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  "&:hover": {
                    backgroundColor: 'transparent'
                  }
                }}
                  onClick={mint}
                >
                </Button>
                <Box
                  sx={{
                    mb: 0,
                    px: 5,
                    pt: '30px',
                    width: window.innerWidth < 600 ? 359 : 587,
                    height: 88,
                    background: window.innerWidth < 600 ? `url(${mintBgMob})` : `url(${mintBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                    color: '#44444D',
                    textAlign: 'center'
                  }}>
                  <Typography variant="h5" component="div" sx={{
                    textTransform: 'uppercase',
                    color: '#44444D',
                    fontFamily: 'Avenir',
                    fontWeight: '600'
                  }}>
                    Mint <span style={{ color: '#FC9A53' }}>{amount}</span> for <span style={{ color: '#FC9A53' }}>{amount * formatEther(formattedCost)}</span> <img src={etherSymbolOrange} width={25} alt="Ether Symbol" />
                  </Typography>
                </Box>
                <Button sx={{
                  background: `url(${plusBtn})`,
                  verticalAlign: 'middle',
                  display: {xs: 'none', md: 'inline-block'},
                  width: 93,
                  height: 88,
                  ml: 7.5,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  "&:hover": {
                    backgroundColor: 'transparent'
                  }
                }}
                  onClick={increase}
                >
                </Button>
                <Button sx={{
                  background: `url(${minusBtnMob})`,
                  verticalAlign: 'middle',
                  display: {xs: 'inline-block', md: 'none'},
                  width: 170,
                  height: 88,
                  mt: 1,
                  mr: 1,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  "&:hover": {
                    backgroundColor: 'transparent'
                  }
                }}
                  onClick={mint}
                >
                </Button>
                <Button sx={{
                  background: `url(${plusBtnMob})`,
                  verticalAlign: 'middle',
                  display: {xs: 'inline-block', md: 'none'},
                  width: 170,
                  height: 88,
                  mt: 1,
                  ml: 1,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  "&:hover": {
                    backgroundColor: 'transparent'
                  }
                }}
                  onClick={increase}
                >
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" component="div" sx={{
                  textTransform: 'uppercase',
                  color: '#44444D',
                  fontFamily: 'Avenir',
                  fontWeight: '600'
                }}>
                  Please Connect Your Wallet
                </Typography>
                <br />
                <WalletConnectButton />
              </>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} pb={7.5} sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box
          sx={{
            m: 0,
            p: 0,
            width: window.innerWidth < 600 ? 393 : 1200,
            height: window.innerWidth < 600 ? 1237 : 405,
            boxShadow: window.innerWidth < 600 ? 'none' : '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)'
          }}>
          <Slider {...settings} dots={false} arrows={window.innerWidth < 600 ? false : true}>
            {slider2.map((item, i) => (
              <div key={'slider2-item' + i} className="rel-pos">
                <img
                  src={item.image}
                  alt={'Slider2 item ' + i}
                  width={window.innerWidth < 600 ? 393 : 1200}
                  height={window.innerWidth < 600 ? 1237 : 405}
                />
                <Link sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 10,
                  width: window.innerWidth < 600 ? '100%' : '33%',
                  height: window.innerWidth < 600 ? '33%' : '100%',
                  display: i === 1 ? 'block' : 'none'
                }} component={rLink} to="/"></Link>
                <Link sx={{
                  position: 'absolute',
                  top: window.innerWidth < 600 ? '33%' : 0,
                  left: window.innerWidth < 600 ? 0 : '33%',
                  zIndex: 10,
                  width: window.innerWidth < 600 ? '100%' : '33%',
                  height: window.innerWidth < 600 ? '33%' : '100%',
                  display: i === 1 ? 'block' : 'none'
                }} component={rLink} to="/cabinet"></Link>
                <Link sx={{
                  position: 'absolute',
                  top: window.innerWidth < 600 ? '66%' : 0,
                  left: window.innerWidth < 600 ? 0 : '66%',
                  zIndex: 10,
                  width: window.innerWidth < 600 ? '100%' : '33%',
                  height: window.innerWidth < 600 ? '33%' : '100%',
                  display: i === 1 ? 'block' : 'none'
                }} component={rLink} to="/mint"></Link>
              </div>
            ))}
          </Slider>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Mint;