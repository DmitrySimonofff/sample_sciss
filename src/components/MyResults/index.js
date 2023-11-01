import React, { useState, useEffect } from "react";
import { graphEndpoint } from "../../config";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import axios from "axios";
import expandIcon from "../../images/expand-icon.png";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import dayjs from "dayjs";

const MyResults = () => {
  const { account } = useEthers();
  const [results, setResults] = useState([]);
  const userAccount = account ? account : ethers.constants.AddressZero;

  useEffect(() => {
    axios.post(graphEndpoint, {
      query: `
      {
        resultsDeclareds(where:{_player:"${userAccount}"}){
          id,
          _betId,
          _choice,
          _outcome,
          _amount,
          _winAmount,
          _player,
          _result,
          _time
        }
      }
      `
    })
      .then(res => {
        setResults(res.data.data.resultsDeclareds);
      })
      .catch(err => {
      })
      .finally(() => {
      });
  }, [account]);

  const numToChoice = (num) => {
    if (num == 0) {
      return "Rock";
    }
    if (num == 1) {
      return "Paper";
    }
    if (num == 2) {
      return "Scissor";
    }
  };

  const numToResult = (num) => {
    if (num == 0) {
      return "Win";
    }
    if (num == 1) {
      return "Loose";
    }
    if (num == 2) {
      return "Tie";
    }
  };

  const resultToColor = (num) => {
    if (num == 0) {
      return "table-success";
    }
    if (num == 1) {
      return "table-danger";
    }
    if (num == 2) {
      return "table-primary";
    }
  };

  return (
    <>
      <Grid container textAlign={'center'} sx={{ maxHeight: window.innerWidth < 600 ? '100%' : 550 }}>
        <Grid item xs={12} sx={{ position: 'relative', zIndex: '2' }}>
          {window.innerWidth < 600 ? (
            <>
              {results.map((result, i) => (
                <Accordion key={`results${i}`} sx={{ '&::before': { height: 0 } }}>
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id={`results${i}`}
                    sx={{ position: 'relative' }}
                  >
                    <TableContainer component={Paper} sx={{ minWidth: 200, maxWidth: 1400, ml: 'auto', mr: 'auto', borderBottom: 'none', borderRadius: '0', p: 3, boxShadow: 'none' }}>
                      <Table sx={{ minWidth: 200, maxWidth: 1400 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel', width: 'auto', minWidth: 'auto' }}>
                              SR
                            </TableCell>
                            <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel', width: 'auto', minWidth: 'auto' }}>
                              RESULT
                            </TableCell>
                            <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel', width: 'auto', minWidth: 'auto' }}>
                              BET
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            key={i}
                            sx={{ 'td, th': { border: 0 }, background: i % 2 ? '#FEFAF8' : 'inherit' }}
                          >
                            <TableCell sx={{ color: '#FC9A53', fontFamily: 'Sequel', fontSize: '16px', letterSpacing: '0.085em', fontWeight: '400' }} className='pos-orange' align="center" component="th" scope="row">
                              <span>{i < 9 ? '0' + (i + 1) : i + 1}</span>
                            </TableCell>
                            <TableCell sx={{ color: result._result == 0 ? '#00CD94' : result._result == 1 ? '#FF1A1A' : '#5C6E90', textTransform: 'uppercase', fontWeight: '600' }} align="center" color="error">
                              {numToResult(result._result)}
                            </TableCell>
                            <TableCell sx={{ color: '#44444D', fontWeight: '600' }} align="center">{ethers.utils.formatEther(result._amount)}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer><br />
                    <img src={expandIcon} alt="Expand Icon" style={{ position: 'absolute', bottom: '0', left: '50%' }} />
                  </AccordionSummary>
                  <AccordionDetails>
                    <TableContainer component={Paper} sx={{ minWidth: 300, maxWidth: 1400, ml: 'auto', mr: 'auto', borderBottom: 'none', borderRadius: '0', p: 3, boxShadow: 'none' }}>
                      <Table sx={{ minWidth: 300, maxWidth: 1400 }} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel', width: 'auto', minWidth: 'auto' }}>
                              CHOICE/ <br /> OUTCOME
                            </TableCell>
                            <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel', width: 'auto', minWidth: 'auto' }}>
                              WINPOOL
                            </TableCell>
                            <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel', width: 'auto', minWidth: 'auto' }}>
                              TIME
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            key={i}
                            sx={{ 'td, th': { border: 0 }, background: i % 2 ? '#FEFAF8' : 'inherit' }}
                          >
                            <TableCell sx={{ color: '#44444D', fontFamily: 'Sequel', fontSize: '16px', letterSpacing: '0.085em', fontWeight: '400' }} align="center">{numToChoice(result._choice)}/<br /><span style={{ color: '#A0A9BC' }}>{numToChoice(result._outcome)}</span></TableCell>
                            <TableCell sx={{ color: '#00CD94', fontWeight: '600' }} align="center">{ethers.utils.formatEther(result._winAmount)}</TableCell>
                            <TableCell sx={{ color: '#5C6E90' }} align="center">{dayjs.unix(result._time).format("DD/MM/YYYY") + ' ' + dayjs.unix(result._time).format("HH:mm:ss")}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              ))}
            </>
          ) : (
            <TableContainer component={Paper} sx={{ minWidth: 650, maxWidth: 1400, maxHeight: 620, ml: 'auto', mr: 'auto', border: '1px solid #2B5A4D', borderRadius: '0', p: 3, boxShadow: '0px 3.4348926544189453px 2.7479140758514404px 0px rgba(40, 58, 151, 0.02), 0px 8.687101364135742px 6.949680805206299px 0px rgba(40, 58, 151, 0.03), 0px 17.720870971679688px 14.176697731018066px 0px rgba(40, 58, 151, 0.04), 0px 36.501644134521484px 29.201316833496094px 0px rgba(40, 58, 151, 0.05), 0px 100px 80px 0px rgba(40, 58, 151, 0.07)' }}>
              <Table sx={{ minWidth: 650, maxWidth: 1400 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      SR
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      CHOICE
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      OUTCOME
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      RESULT
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      BET
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      WINPOOL
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      DATE
                    </TableCell>
                    <TableCell className="table-head" align="center" sx={{ fontFamily: 'Sequel' }}>
                      TIME
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {results.map((result, i) => (
                    <TableRow
                      key={i}
                      sx={{ 'td, th': { border: 0 }, background: i % 2 ? '#FEFAF8' : 'inherit' }}
                    >
                      <TableCell sx={{ color: '#FC9A53', fontFamily: 'Sequel', fontSize: '16px', letterSpacing: '0.085em', fontWeight: '400' }} className={i % 2 ? 'pos-white' : 'pos-orange'} align="center" component="th" scope="row">
                        <span>{i < 9 ? '0' + (i + 1) : i + 1}</span>
                      </TableCell>
                      <TableCell sx={{ color: '#44444D', fontFamily: 'Sequel', fontSize: '16px', letterSpacing: '0.085em', fontWeight: '400' }} align="center">{numToChoice(result._choice)}</TableCell>
                      <TableCell sx={{ color: '#A0A9BC', fontFamily: 'Sequel', fontSize: '16px', letterSpacing: '0.085em', fontWeight: '400' }} align="center">{numToChoice(result._outcome)}</TableCell>
                      <TableCell sx={{ color: result._result == 0 ? '#00CD94' : result._result == 1 ? '#FF1A1A' : '#5C6E90', textTransform: 'uppercase', fontWeight: '600' }} align="center" color="error">
                        {numToResult(result._result)}
                      </TableCell>
                      <TableCell sx={{ color: '#44444D', fontWeight: '600' }} align="center">{ethers.utils.formatEther(result._amount)}</TableCell>
                      <TableCell sx={{ color: '#00CD94', fontWeight: '600' }} align="center">{ethers.utils.formatEther(result._winAmount)}</TableCell>
                      <TableCell sx={{ color: '#5C6E90' }} align="center">{dayjs.unix(result._time).format("DD/MM/YYYY")}</TableCell>
                      <TableCell sx={{ color: '#5C6E90' }} align="center">{dayjs.unix(result._time).format("HH:mm:ss")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default MyResults;
