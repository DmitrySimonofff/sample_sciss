import React, { useEffect, useState } from "react";
import { useEthers, Mumbai } from "@usedapp/core";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
import { infuraId } from "../../config";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import btnWallet from "../../images/button-wallet.svg";
import btnWalletMobile from "../../images/btn-wallet-mobile.svg";

const WalletConnectButton = (props) => {
  const { account, activate, deactivate, chainId, switchNetwork } = useEthers();
  const [activateError, setActivateError] = useState("");
  const { error } = useEthers();
  useEffect(() => {
    if (error && account) {
      setActivateError(error.message);
      return;
    }
    setActivateError("");

    if (chainId != Mumbai.chainId) {
      switchNetwork(Mumbai.chainId);
    }
  }, [error, account]);


  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: infuraId,
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Rock Paper Scissors",
          infuraId: "",
          rpc: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
          chainId: Mumbai.chainId,
          darkMode: false,
        },
      },
      torus: {
        package: Torus,
        options: {
          networkParams: {
            host: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
            chainId: Mumbai.chainId,
            networkId: Mumbai.chainId,
          },
          config: {
            buildEnv: "development",
          },
        },
      }
    };

    const web3Modal = new Web3Modal({
      providerOptions      
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      setActivateError("");
    } catch (error) {
      setActivateError(error.message);
    }
  };

  const customBtn = {
    width: props.variant === "mobile" ? '341px' : '199px',
    height: props.variant === "mobile" ? '49px' : '54px',
    border: 'none',
    borderRadius: '0',
    color: '#fff',
    filter: {
      xs: 'none',
      md: 'drop-shadow(0 62px 167px rgba(53,70,160,.34)) drop-shadow(0 27.0463px 43.4119px rgba(53,70,160,.14)) drop-shadow(0 14.1788px 21.0649px rgba(53,70,160,.07)) drop-shadow(0 7.22212px 16.5187px rgba(53,70,160,.12)) drop-shadow(0 2.89113px 11.7815px rgba(53,70,160,.03))'
    },
    background: `url(${props.variant === "mobile" ? btnWalletMobile : btnWallet}) no-repeat 0 0, transparent`,
    lineHeight: '40px',
    "&:hover": {
      border: 'none',
      backgroundColor: 'transparent'
    }
  };

  return (
    <>
      {account ? (
        <Button sx={customBtn} variant="outlined" onClick={() => deactivate()}>
          {props.variant === "mobile" ? 'Disconnect wallet' : 'Disconnect'}
          </Button>
      ) : (
        <Button sx={customBtn} variant="outlined" onClick={activateProvider}>
          {props.variant === "mobile" ? 'Connect wallet' : 'Connect'}
          </Button>
      )}
    </>
  );
};

export default WalletConnectButton;
