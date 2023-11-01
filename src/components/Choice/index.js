import React, { useState } from "react";
import rock from "../../images/rock.png";
import paper from "../../images/paper.png";
import scissors from "../../images/scissors.png";
import rockBtn from "../../images/rock-btn.svg";
import paperBtn from "../../images/paper-btn.svg";
import scissorsBtn from "../../images/scissors-btn.svg";
import polygon from "../../images/polygon.png";
import walletIcon from "../../images/wallet-icon.png";
import { rpsInterface } from "../../sdk";
import { graphEndpoint, rpsAddress } from "../../config";
import { ethers } from "ethers";
import { notify } from "../../helpers/alerts";
import { useGetBetAmounts } from "../../hooks";
import AnimationLeft from "../AnimationLeft";
import AnimationRight from "../AnimationRight";
import { Button, Grid, Typography } from "@mui/material";
import btn from "../../images/button.png";
import leftSide from "../../images/Left-side.png";
import rightSide from "../../images/Right-Side.png";
import { observer } from "mobx-react-lite";
import homeState from "../../store/homeState";
import WalletConnectButton from "../WalletConnectButton";
import axios from "axios";

const Choice = observer(() => {
  const betAmounts = useGetBetAmounts();
  const formattedBetAmounts = betAmounts
    ? betAmounts.toString().split(",")
    : [
      "1000000000000000",
      "2000000000000000",
      "3000000000000000",
      "4000000000000000",
      "5000000000000000",
    ];

  const queryParameters = new URLSearchParams(window.location.search);
  const referrer = queryParameters.get("ref");

  const makeBet = async (amount) => {    
    const betRefrrer = referrer
      ? referrer.toString()
      : ethers.constants.AddressZero.toString();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const rpsContract = new ethers.Contract(rpsAddress, rpsInterface, signer);

      let tx = await rpsContract.makeBet(store.selHand, betRefrrer, {
        value: amount,
        gasLimit: 1000000,
      });

      store.changeSpeed(1000);
      await notify(
        "Waiting for Confirmation",
        "Waiting for transaction to confirm",
        "info"
      );
      let res = await tx.wait();
      axios.post(graphEndpoint, {
        query: `
        {
          resultsDeclareds(where:{_player:"${res.from}"}){
            id,
            _outcome,
            _time
          }
        }
        `
      })
        .then(res => {
          store.changeSpeed(3000);
          let sortered = res.data.data.resultsDeclareds.sort((a, b) => b._time - a._time);
          store.changeRightHand(sortered[0]._outcome);
        })
        .catch(err => {
        })
        .finally(() => {
        });
        await notify(
          "Bet Successfull",
          "You have successfully entered",
          "success"
        );
    } catch (error) {
      console.log(error);
      // notify("Error !", "Failed Bet Please Try Again", "error");
      notify(error);
      store.changeSpeed(3000);
    }
  };

  const Svg = (props) => {
    return (
      <svg width="248" height="248" viewBox="0 0 248 248" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M123 0H45.5L9 44.5V247.5H123H134H206L248 213.5V11.5L238.5 0H134H123Z" className="sel-but-1" fill={props.selected ? "#a65514" : "#148062"}></path>
        <path fillRule="evenodd" clipRule="evenodd" d="M114 0H36.5L0 44.5V247.5H114H125H207L239 220.5V0H125H114Z" className="sel-but-2" fill={props.selected ? "#f4af50" : "#00CD94"}></path>
        <mask id="path-3-inside-1_45_1750" fill="white"><path d="M40.6674 6.9541H232.5V178H6V49.2198L40.6674 6.9541Z"></path></mask>
        <path d="M40.6674 6.9541H232.5V178H6V49.2198L40.6674 6.9541Z" className="sel-but-1" fill={props.selected ? "#a65514" : "#417B6B"}></path>
        <path d="M40.6674 6.9541V5.9541H40.1942L39.8942 6.31992L40.6674 6.9541ZM232.5 6.9541H233.5V5.9541H232.5V6.9541ZM232.5 178V179H233.5V178H232.5ZM6 178H5V179H6V178ZM6 49.2198L5.22682 48.5856L5 48.8621V49.2198H6ZM231.5 6.9541V178H233.5V6.9541H231.5ZM232.5 177H6V179H232.5V177ZM7 178V49.2198H5V178H7ZM6.77318 49.854L41.4405 7.58829L39.8942 6.31992L5.22682 48.5856L6.77318 49.854ZM40.6674 7.9541H232.5V5.9541H40.6674V7.9541Z" fill="black" mask="url(#path-3-inside-1_45_1750)"></path>
        <mask id="path-5-inside-2_45_1750" fill="white"><path fillRule="evenodd" clipRule="evenodd" d="M114.709 186H6V199.741V239H114.709H123.291H207L232 216.851V186H123.291H114.709Z"></path></mask>
        <path fillRule="evenodd" clipRule="evenodd" d="M114.709 186H6V199.741V239H114.709H123.291H207L232 216.851V186H123.291H114.709Z" fill="white"></path>
        <path d="M6 186V185H5V186H6ZM6 239H5V240H6V239ZM207 239V240H207.379L207.663 239.748L207 239ZM232 216.851L232.663 217.599L233 217.301V216.851H232ZM232 186H233V185H232V186ZM6 187H114.709V185H6V187ZM7 199.741V186H5V199.741H7ZM7 239V199.741H5V239H7ZM114.709 238H6V240H114.709V238ZM123.291 238H114.709V240H123.291V238ZM207 238H123.291V240H207V238ZM231.337 216.102L206.337 238.252L207.663 239.748L232.663 217.599L231.337 216.102ZM231 186V216.851H233V186H231ZM123.291 187H232V185H123.291V187ZM114.709 187H123.291V185H114.709V187Z" fill="#2B5A4D" mask="url(#path-5-inside-2_45_1750)"></path>
      </svg>
    );
  };

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
    px: '10px',
    backgroundSize: 'contain !important',
    filter: 'drop-shadow(0 62px 167px rgba(53,70,160,.34)) drop-shadow(0 27.0463px 43.4119px rgba(53,70,160,.14)) drop-shadow(0 14.1788px 21.0649px rgba(53,70,160,.07)) drop-shadow(0 7.22212px 16.5187px rgba(53,70,160,.12)) drop-shadow(0 2.89113px 11.7815px rgba(53,70,160,.03))',
    background: `url(${btn}) no-repeat 0 0, transparent`,
    lineHeight: '40px',
    "&:hover": {
      border: 'none',
      backgroundColor: 'transparent'
    }
  };

  const [store] = useState(homeState);

  const makeChoice = (c) => {
    store.changeSelectedHand(c);
    store.changeChanged(true);
  }

  return (
    <>
      {window.innerWidth < 600 ? (
        <>
        <Grid item xs={12} position={'relative'} height={215}>
          <img src={leftSide} alt="Left Side" style={{ position: 'absolute', left: '0' }} />
          <img src={rightSide} alt="Left Side" style={{ position: 'absolute', right: '0' }} />
        </Grid>
        <Grid item xs={12} height={215}>
        {store.selHand == 0 ? (
          <Button sx={{ my: 1, mx: 8, border: 'none', boxShadow: 'none', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined">
            <img src={rockBtn} alt="Rock hand" style={{ filter: 'hue-rotate(236deg)' }} />
          </Button>
        ) : (
          <Button className="card-choice" sx={{ my: 1, mx: 8, border: 'none', boxShadow: 'none', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined" onClick={() => makeChoice(0)}>
            <img src={rockBtn} alt="Rock hand" />
          </Button>
        )}
        {store.selHand == 1 ? (
          <Button sx={{ my: 1, mx: 8, border: 'none', boxShadow: 'none', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined">
            <img src={paperBtn} alt="Paper hand" style={{ filter: 'hue-rotate(236deg)' }} />
          </Button>
        ) : (
          <Button className="card-choice" sx={{ my: 1, mx: 8, border: 'none', boxShadow: 'none', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined" onClick={() => makeChoice(1)}>
            <img src={paperBtn} alt="Paper hand" />
          </Button>
        )}
        {store.selHand == 2 ? (
          <Button sx={{ my: 1, mx: 8, border: 'none', boxShadow: 'none', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined">
            <img src={scissorsBtn} alt="Scissors hand" style={{ filter: 'hue-rotate(236deg)' }} />
          </Button>
        ) : (
          <Button className="card-choice" sx={{ my: 1, mx: 8, border: 'none', boxShadow: 'none', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined" onClick={() => makeChoice(2)}>
            <img src={scissorsBtn} alt="Scissors hand" />
          </Button>
        )}
        </Grid>
        </>
      ) : (
      <Grid item xs={12}>
        {store.selHand == 0 ? (
          <Button sx={{ mx: 8, border: 'none', boxShadow: 'none', position: 'relative', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined">
            <Svg selected={true} />
            <img src={rock} alt="Rock hand" style={{ position: 'absolute', bottom: '71px', left: '0' }} />
            <span style={{ position: 'absolute', bottom: '27px', lineHeight: '16px', color: '#44444D', width: '100%', textAlign: 'center' }}>Rock</span>
          </Button>
        ) : (
          <Button className="card-choice" sx={{ mx: 8, border: 'none', boxShadow: 'none', position: 'relative', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined" onClick={() => makeChoice(0)}>
            <Svg selected={false} />
            <img src={rock} alt="Rock hand" style={{ position: 'absolute', bottom: '71px', left: '0' }} />
            <span style={{ position: 'absolute', bottom: '27px', lineHeight: '16px', color: '#44444D', width: '100%', textAlign: 'center' }}>Rock</span>
          </Button>
        )}
        {store.selHand == 1 ? (
          <Button sx={{ mx: 8, border: 'none', boxShadow: 'none', position: 'relative', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined">
            <Svg selected={true} />
            <img src={paper} alt="Paper hand" style={{ position: 'absolute', bottom: '71px', left: '0' }} />
            <span style={{ position: 'absolute', bottom: '27px', lineHeight: '16px', color: '#44444D', width: '100%', textAlign: 'center' }}>Paper</span>
          </Button>
        ) : (
          <Button className="card-choice" sx={{ mx: 8, border: 'none', boxShadow: 'none', position: 'relative', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined" onClick={() => makeChoice(1)}>
            <Svg selected={false} />
            <img src={paper} alt="Paper hand" style={{ position: 'absolute', bottom: '71px', left: '0' }} />
            <span style={{ position: 'absolute', bottom: '27px', lineHeight: '16px', color: '#44444D', width: '100%', textAlign: 'center' }}>Paper</span>
          </Button>
        )}
        {store.selHand == 2 ? (
          <Button sx={{ mx: 8, border: 'none', boxShadow: 'none', position: 'relative', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined">
            <Svg selected={true} />
            <img src={scissors} alt="Scissors hand" style={{ position: 'absolute', bottom: '71px', left: '0' }} />
            <span style={{ position: 'absolute', bottom: '27px', lineHeight: '16px', color: '#44444D', width: '100%', textAlign: 'center' }}>Scissors</span>
          </Button>
        ) : (
          <Button className="card-choice" sx={{ mx: 8, border: 'none', boxShadow: 'none', position: 'relative', p: 0, "&:hover": { border: 'none', backgroundColor: 'transparent' } }} variant="outlined" onClick={() => makeChoice(2)}>
            <Svg selected={false} />
            <img src={scissors} alt="Scissors hand" style={{ position: 'absolute', bottom: '71px', left: '0' }} />
            <span style={{ position: 'absolute', bottom: '27px', lineHeight: '16px', color: '#44444D', width: '100%', textAlign: 'center' }}>Scissors</span>
          </Button>
        )}
      </Grid>
      )}
      <Grid item xs={12} mt={7}>
        {formattedBetAmounts.map((price, i) => (
          <Button key={"price" + i} sx={customBtn} variant="outlined" onClick={() => makeBet(price)}>
            {ethers.utils.formatEther(price)}
            <img src={polygon} alt="Polygon icon" style={{ marginLeft: 'auto', height: '100%' }} />
          </Button>
        ))}
      </Grid>
      {window.innerWidth > 600 ? (
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ height: 300 }} mt={6}>
            <Grid item xs={6}>
              <AnimationLeft />
            </Grid>
            <Grid item xs={6}>
              <AnimationRight />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} p={3} mt={3} >
          <Typography variant="h6" gutterBottom mb={3} sx={{
          color: '#44444D',
          textAlign: 'center',
          leadingTrim: 'both',
          textEdge: 'cap',
          fontFamily: 'Sequel',
          fontSize: '15.719px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
          letterSpacing: '1.336px',
          textTransform: 'uppercase',
          typography: { xs: 'h6', sm: 'h5', md: 'h4' }
        }}>
          Trusted and secure
        </Typography>
        <img src={walletIcon} alt="Wallet icon" style={{ width: '100%', margin: '2rem 0' }} />
        <WalletConnectButton variant="mobile" />
      </Grid>
      )}
    </>
  );
});

export default Choice;