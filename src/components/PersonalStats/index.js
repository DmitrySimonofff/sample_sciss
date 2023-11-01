import React, { useState } from "react";
import { useEthers, useEtherBalance, shortenAddress } from "@usedapp/core";
import { ethers } from "ethers";
import { rpsAddress } from "../../config";
import { rpsInterface } from "../../sdk";
import { notify } from "../../helpers/alerts";
import { useBalanceOf, useGetClaimableAmount } from "../../hooks";
import { formatEther } from "ethers/lib/utils";

import { useGetPlayer } from "../../hooks";
import { Box, Button, Card, CardActions, CardContent, Grid, Tooltip, Typography, tooltipClasses } from "@mui/material";
import accountImage from "../../images/account.png";
import balanceCard from "../../images/balance-card.png";
import balanceRectangle from "../../images/balance-rectangle.png";
import balanceImage from "../../images/balance.png";
import balanceBg from "../../images/balance-bg.png";
import balanceNft from "../../images/nft-balance.png";
import infoIcon from "../../images/info-icon.png";
import infoIconDark from "../../images/info-icon-dark.png";
import percentImage from "../../images/percent.png";
import cabinetRectangle from "../../images/cabinet-rectangle.png";
import square from "../../images/square.png";
import referralText from "../../images/referral-text.png";
import referralTextMob from "../../images/referral-text-mob.png";
import qrBg from "../../images/qr-bg.png";
import qrCode from "../../images/qr-code.png";
import linkBg from "../../images/link-bg.png";
import copyLinkBtn from "../../images/copy-link.png";
import linkBgMob from "../../images/link-bg-mob.png";
import copyLinkBtnMob from "../../images/copy-link-mob.png";
import refBg from "../../images/ref-bg.png";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useRef } from "react";

const PersonalStats = () => {
  const { account } = useEthers();
  const userAccount = account ? account : ethers.constants.AddressZero;
  const etherBalance = useEtherBalance(account);
  const cryptoHandsBalance = useBalanceOf(userAccount);
  const formattedCryptoHandsBalance = cryptoHandsBalance
    ? cryptoHandsBalance.toString()
    : 0;
  const userBalance = etherBalance ? etherBalance : 0;

  const player = useGetPlayer(userAccount);

  const [copyLink, setCopyLink] = useState(false);
  const claimableAmount = useGetClaimableAmount(userAccount);
  const formattedClaimableAmount = claimableAmount
    ? claimableAmount.toString()
    : 0;

  const formattedPlayer = player
    ? player.toString().split(",")
    : [0, 0, 0, 0, 0, 0, 0, 0, ethers.constants.AddressZero];

  const copyToClip = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopyLink(true);
    setTimeout(() => {
      setCopyLink(false);
    }, 3000);
  };

  const claim = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const rpsContract = await new ethers.Contract(
        rpsAddress,
        rpsInterface,
        signer
      );

      let tx = await rpsContract.claim();
      await notify(
        "Waiting for confirmation",
        "waiting for blockchain confirmation",
        "info"
      );
      await tx.wait();

      await notify("Success", "Succesfully claimed", "success");
    } catch (error) {
      await notify("Error", "Something went wrong", "error");
    }
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip leaveTouchDelay={3000} enterTouchDelay={0} {...props} classes={{ popper: className }} arrow placement="top-start" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(92, 110, 144, 0.58)',
      boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)',
      fontSize: '15px',
      fontFamily: 'Avenir',
      padding: '20px'
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white
    }
  }));

  const [margin, setMargin] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        const element = ref.current;
        const rect = element.getBoundingClientRect();
        setMargin(rect.left);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Grid container textAlign={'center'}>
      <Grid item xs={12} md={3} px={2} sx={{ pt: { xs: 0, md: 7 }, pb: 7 }}>
        <Card ref={ref} sx={{
          width: 285,
          mx: 'auto',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)'
        }}>
          <CardContent sx={{ paddingBottom: '16px !important' }}>
            <img src={accountImage} alt="Account image" style={{ marginLeft: 'auto', height: '100%' }} />
            <Typography variant="h6" component="div" sx={{ textTransform: 'uppercase', fontSize: '14px', color: '#44444D' }}>
              Account
            </Typography>
            <Typography sx={{
              mb: 0,
              background: 'linear-gradient(90deg, #FC9A53 0%, #FCB853 47.92%, #FC9A53 100%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              WebkitBackgroundClip: 'text'
            }} color="text.secondary">
              {shortenAddress(userAccount)}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{
          mt: 1.25,
          mx: 'auto',
          width: 285,
          height: 54,
          borderRadius: '30px',
          overflow: 'visible',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)',
          transform: 'translateZ(0)',
        }}>
          <CardContent sx={{
            padding: '7px !important',
            background: `url(${balanceCard})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}>
            <Typography variant="h6" component="div" sx={{
              textTransform: 'uppercase',
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#44444D'
            }}>
              Balance
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 0,
                ml: 2.5,
                width: '145px',
                height: '40px',
                display: 'inline-flex',
                background: `url(${balanceRectangle})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                fontSize: '14px',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center'
              }} color="text.secondary">
              {ethers.utils.formatEther(userBalance)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sx={{ pt: { xs: 0, md: 7 }, pb: 7 }}>
        <Card className="rel-pos" sx={{
          width: 285,
          mx: 'auto',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)'
        }}>
          <CardContent sx={{ paddingBottom: '16px !important' }}>
            <img src={balanceImage} alt="Balance image" style={{ marginLeft: 'auto', height: '100%' }} />
            <Typography variant="h6" component="div" sx={{ textTransform: 'uppercase', fontSize: '14px', color: '#44444D' }}>
              Nft balance
            </Typography>
            <Card sx={{
              mt: 4.25,
              background: `url(${balanceBg})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              width: 244,
              height: 53,
              boxShadow: 'none',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              <CardContent sx={{ padding: '5.5px !important' }}>
                <Typography variant="h5" component="div" sx={{
                  textTransform: 'uppercase',
                  color: '#01C894',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '60px',
                  verticalAlign: 'middle'
                }}>
                  {Number(formattedPlayer[5]) + Number(formattedCryptoHandsBalance)}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  onClick={claim}
                  sx={{
                    mb: 0,
                    ml: 1,
                    width: 160.5,
                    height: 42.5,
                    display: 'inline-flex',
                    background: `url(${balanceNft})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    fontSize: '14px',
                    color: 'white',
                    textTransform: 'uppercase',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }} color="text.secondary">
                  Claim
                </Typography>
              </CardContent>
            </Card>
          </CardContent>
          <LightTooltip title="NFT win chance is your chance to win NFT when you play. Each time you play, your NFT win chance increases. This mechanism guarantees that you will eventually win an NFT.">
            <Button sx={{
              position: 'absolute !important',
              top: 5,
              right: -35,
              background: `url(${infoIcon})`,
              width: 22.5,
              height: 20,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              "&:hover": {
                backgroundColor: 'transparent'
              }
            }}></Button>
          </LightTooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sx={{ pt: { xs: 0, md: 7 }, pb: 7 }}>
        <Card className="rel-pos" sx={{
          width: 285,
          mx: 'auto',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)'
        }}>
          <CardContent sx={{ paddingBottom: '16px !important' }}>
            <img src={percentImage} alt="Percent image" style={{ marginLeft: 'auto', height: '100%' }} />
            <Typography variant="h6" component="div" sx={{ textTransform: 'uppercase', fontSize: '14px', color: '#44444D' }}>
              Nft win percentage
            </Typography>
            <Typography variant="h4" component="div" sx={{
              textTransform: 'uppercase',
              my: 2.9,
              color: '#01C894',
              fontFamily: 'Avenir',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '60px',
              verticalAlign: 'middle'
            }}>
              {formattedPlayer[6] / 100000000} %
            </Typography>
          </CardContent>
          <LightTooltip title="NFT win chance is your chance to win NFT when you play. Each time you play, your NFT win chance increases. This mechanism guarantees that you will eventually win an NFT.">
            <Button sx={{
              position: 'absolute !important',
              top: 5,
              right: -35,
              background: `url(${infoIcon})`,
              width: 22.5,
              height: 20,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              "&:hover": {
                backgroundColor: 'transparent'
              }
            }}></Button>
          </LightTooltip>
        </Card>
      </Grid>
      <Grid item xs={12} md={3} sx={{ pt: { xs: 0, md: 7 }, pb: 7 }}>
        <Card sx={{
          mx: 'auto',
          width: 285,
          height: 69,
          borderRadius: '30px',
          overflow: 'visible',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)',
          transform: 'translateZ(0)',
        }}>
          <CardContent sx={{
            padding: '13px !important',
            background: `url(${cabinetRectangle})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}>
            <Typography variant="h6" component="div" sx={{
              textTransform: 'uppercase',
              fontSize: '14px',
              minWidth: '184px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'left',
              color: '#44444D'
            }}>
              Games played
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 0,
                ml: 2.5,
                width: '54px',
                height: '45px',
                display: 'inline-flex',
                background: `url(${square})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                fontSize: '14px',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center'
              }} color="text.secondary">
              {formattedPlayer[0]}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{
          mt: '19px',
          mx: 'auto',
          width: 285,
          height: 69,
          borderRadius: '30px',
          overflow: 'visible',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)',
          transform: 'translateZ(0)'
        }}>
          <CardContent sx={{
            padding: '13px !important',
            background: `url(${cabinetRectangle})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}>
            <Typography variant="h6" component="div" sx={{
              textTransform: 'uppercase',
              fontSize: '14px',
              minWidth: '184px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'left',
              color: '#44444D'
            }}>
              Games won
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 0,
                ml: 2.5,
                width: '54px',
                height: '45px',
                display: 'inline-flex',
                background: `url(${square})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                fontSize: '14px',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center'
              }} color="text.secondary">
              {formattedPlayer[1]}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{
          mt: '19px',
          mx: 'auto',
          width: 285,
          height: 69,
          borderRadius: '30px',
          overflow: 'visible',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)',
          transform: 'translateZ(0)'
        }}>
          <CardContent sx={{
            padding: '13px !important',
            background: `url(${cabinetRectangle})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
          }}>
            <Typography variant="h6" component="div" sx={{
              textTransform: 'uppercase',
              fontSize: '14px',
              minWidth: '184px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'left',
              color: '#44444D'
            }}>
              Nft won
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 0,
                ml: 2.5,
                width: '54px',
                height: '45px',
                display: 'inline-flex',
                background: `url(${square})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                fontSize: '14px',
                color: 'white',
                alignItems: 'center',
                justifyContent: 'center'
              }} color="text.secondary">
              {formattedPlayer[6]}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{
        display: {
          xs: 'none',
          md: 'flex'
        },
      }}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            mb: 0,
            mx: window.innerWidth < 600 ? 'auto' : margin + 'px',
            width: '100%',
            height: 90,
            background: `url(${referralText}), linear-gradient(90deg, transparent, #00CC94 50%, #00CC94 100%)`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            fontWeight: 600,
            fontSize: '20px',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            backgroundPosition: 'left'
          }}>
          Share your referral link or QR code and get commission for referred token purchases <br /> instantly to your wallet.
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{
        display: {
          xs: 'flex',
          md: 'none'
        },
        backgroundColor: 'white',
        pt: 3
      }}>
        <Typography
          variant="body1"
          component="div"
          sx={{
            mb: 0,
            mx: 'auto',
            px: 1,
            width: 333,
            height: 214,
            background: `url(${referralTextMob})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            color: 'white',
            fontWeight: 600,
            fontSize: '20px',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            backgroundPosition: 'center'
          }}>
          Share your referral link or QR code and get commission for referred token purchases instantly to your wallet.
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{
        pt: { xs: 0, md: 2 },
        pb: 7
      }}>
        <Card sx={{
          width: 'auto',
          mx: window.innerWidth < 600 ? 'auto' : margin + 'px',
          boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)'
        }}>
          <CardContent sx={{ px: '16px !important', py: '24px !important' }}>
            <Grid container textAlign={'center'}>
              <Grid item xs={12} md={4} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box
                  sx={{
                    width: 236,
                    height: 129,
                    background: `url(${qrBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex'
                  }}
                >
                  <img src={qrCode} alt="QR code" style={{ width: '168px', margin: 'auto' }} />
                </Box>
              </Grid>
              <Grid item xs={12} md={8} sx={{
                display: {
                  xs: 'none',
                  md: 'flex'
                },
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Box
                  sx={{
                    mb: 0,
                    px: 5,
                    pt: '19px',
                    width: 527,
                    height: 61,
                    background: `url(${linkBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                    color: '#44444D',
                    textAlign: 'center'
                  }}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {window.location.origin + "/?ref=" + userAccount}
                  </Typography>
                </Box>
                <Button sx={{
                  background: `url(${copyLinkBtn})`,
                  verticalAlign: 'middle',
                  display: 'inline-block',
                  width: 218,
                  height: 60,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  "&:hover": {
                    backgroundColor: 'transparent'
                  }
                }}
                  onClick={() => {
                    copyToClip(window.location.origin + "/?ref=" + userAccount);
                  }}
                >
                  {copyLink ? "Copied" : "Copy Link"}
                </Button>
              </Grid>
              <Grid item xs={12} md={8} sx={{
                display: {
                  xs: 'flex',
                  md: 'none'
                },
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                pt: 3
              }}>
                <Box
                  sx={{
                    mb: 0,
                    px: 5,
                    pt: '19px',
                    width: 333,
                    height: 59,
                    background: `url(${linkBgMob})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    verticalAlign: 'middle',
                    color: '#44444D',
                    textAlign: 'center'
                  }}>
                  <Typography
                    variant="body1"
                    component="div"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {window.location.origin + "/?ref=" + userAccount}
                  </Typography>
                </Box>
                <Button sx={{
                  background: `url(${copyLinkBtnMob})`,
                  verticalAlign: 'middle',
                  width: 333,
                  height: 60,
                  mt: 3,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  color: 'white',
                  "&:hover": {
                    backgroundColor: 'transparent'
                  }
                }}
                  onClick={() => {
                    copyToClip(window.location.origin + "/?ref=" + userAccount);
                  }}
                >
                  {copyLink ? "Copied" : "Copy Link"}
                </Button>
              </Grid>
              <Grid item xs={12} md={4} pt={3}>
                <Box
                  className="rel-pos"
                  sx={{
                    mb: 0,
                    width: 236,
                    height: 90,
                    background: `url(${refBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    color: 'white',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: 'white',
                      textTransform: 'uppercase'
                    }}>
                    {formattedPlayer[4]}
                  </Typography>
                  <LightTooltip title="NFT win chance is your chance to win NFT when you play. Each time you play, your NFT win chance increases. This mechanism guarantees that you will eventually win an NFT.">
                    <Button sx={{
                      position: 'absolute !important',
                      top: 5,
                      right: -35,
                      background: `url(${infoIconDark})`,
                      width: 22.5,
                      height: 20,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      "&:hover": {
                        backgroundColor: 'transparent'
                      }
                    }}></Button>
                  </LightTooltip>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    mt: 3,
                    color: '#44444D',
                    textTransform: 'uppercase',
                    fontSize: '14px'
                  }}>
                  Number of referrers
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} pt={3}>
                <Box
                  className="rel-pos"
                  sx={{
                    mb: 0,
                    width: 236,
                    height: 90,
                    background: `url(${refBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    color: 'white',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: 'white',
                      textTransform: 'uppercase'
                    }}>
                    {(formattedPlayer[7] / 10000).toFixed(4)}<sup>%</sup>
                  </Typography>
                  <LightTooltip title="NFT win chance is your chance to win NFT when you play. Each time you play, your NFT win chance increases. This mechanism guarantees that you will eventually win an NFT.">
                    <Button sx={{
                      position: 'absolute !important',
                      top: 5,
                      right: -35,
                      background: `url(${infoIconDark})`,
                      width: 22.5,
                      height: 20,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      "&:hover": {
                        backgroundColor: 'transparent'
                      }
                    }}></Button>
                  </LightTooltip>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    mt: 3,
                    color: '#44444D',
                    textTransform: 'uppercase',
                    fontSize: '14px'
                  }}>
                  Referral NFT win percentage <br /> increase
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} pt={3}>
                <Box
                  className="rel-pos"
                  sx={{
                    mb: 0,
                    width: 236,
                    height: 90,
                    background: `url(${refBg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    color: 'white',
                    mx: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      color: 'white',
                      textTransform: 'uppercase'
                    }}>
                    <sup>$</sup>{ethers.utils.formatEther(formattedPlayer[3]).split('.')[0]}<small style={{ fontSize: '10px' }}>{'.' + ethers.utils.formatEther(formattedPlayer[3]).split('.')[1]}</small>
                  </Typography>
                  <LightTooltip title="NFT win chance is your chance to win NFT when you play. Each time you play, your NFT win chance increases. This mechanism guarantees that you will eventually win an NFT.">
                    <Button sx={{
                      position: 'absolute !important',
                      top: 5,
                      right: -35,
                      background: `url(${infoIconDark})`,
                      width: 22.5,
                      height: 20,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      "&:hover": {
                        backgroundColor: 'transparent'
                      }
                    }}></Button>
                  </LightTooltip>
                </Box>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{
                    mt: 3,
                    color: '#44444D',
                    textTransform: 'uppercase',
                    fontSize: '14px'
                  }}>
                  Referral earnings
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PersonalStats;