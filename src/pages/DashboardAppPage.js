import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import * as nearAPI from "near-api-js";

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Button, Modal, Box, Typography, Backdrop } from '@mui/material';
// components
import { magic } from "../magic";
import Loading from "./Loading";
import Iconify from '../components/iconify';
// sections

import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '../_mock/arrays';
import { BankingQuickTransfer } from '../sections/@dashboard/general/banking';


 let near;


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();


  const [userMetadata, setUserMetadata] = useState();
  const [petCount, setPetCount] = useState(null);
  const [nearBalance, setNearBalance] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const navigate = useNavigate();
  const networkId = "testnet"; // testnet, betanet, or mainnet
  const [open, setOpen] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'escapeKeyDown') {
      setOpen(false);
    }
  };

  useEffect(() => {
    // Create NEAR instance
    (async () => {
      const { connect, keyStores } = nearAPI;

      const config = {
        networkId,
        keyStore: new keyStores.BrowserLocalStorageKeyStore(),
        nodeUrl: `https://rpc.${networkId}.near.org`,
        walletUrl: `https://wallet.${networkId}.near.org`,
        helperUrl: `https://helper.${networkId}.near.org`,
        explorerUrl: `https://explorer.${networkId}.near.org`,
      };
    
      // connect to NEAR
      near = await connect(config);
    })();  
  
  // If user is logged in, retrieve the authenticated user's profile.
  magic.user.isLoggedIn().then(magicIsLoggedIn => {
    if (magicIsLoggedIn) {
      magic.user.getMetadata().then(user => {
        setUserMetadata(user);
        handleFetchBalance(user.publicAddress);
        handleFetchPassports(user.publicAddress); 
      });
    } else {
      // If no user is logged in, redirect to `/login`
      navigate('/login', { replace: true });
    }
  });
}, []);   

 async function handleFetchPassports(account_id) {
      
  const provider = new nearAPI.providers.JsonRpcProvider(
     `https://rpc.${networkId}.near.org`
  );

  const jsonstring = JSON.stringify({account_id});
  const encodedData = window.btoa(jsonstring);

  const rawResult = await provider.query({
     request_type: "call_function",
     account_id: "ilovepets-m2.testnet",
     method_name: "ppp_tokens_for_owner",
     args_base64: encodedData,
     finality: "optimistic",
  });

  const encodedResult = new Uint8Array(rawResult.result);
  const decoder = new TextDecoder();
  const decodedResult = decoder.decode(encodedResult);
  const res = JSON.parse(decodedResult);

  setUserPets(res);
  setPetCount(res.length);
}

const handleFetchBalance = async (account_id) => {
  const account = await near.account(account_id);
  account.getAccountBalance().then(bal => {
    setNearBalance(nearAPI.utils.format.formatNearAmount(bal.total));
    if(bal.total) 
      navigate('/dashboard/pets', { replace: true });
  });
}

const isEmptyCart = !petCount;
const isEmptyWallet = !nearBalance;

return userMetadata ? 
  <>
    <Helmet>
      <title> Dashboard | Petastic </title>
    </Helmet>

    <Container maxWidth="xl">
      {isEmptyWallet ? (
        <Modal open={open} 
        onClose={handleClose} 
        BackdropProps={{style: {ClickBackdrop: false, background: 'url(https://www.petastic.com/static/media/gradient-glow.32c37d10.svg)'}}}
        >
          <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: 'none' }}>
            <Container>
              <Grid container>
                <BankingQuickTransfer title="" subheader="" list={_bankingContacts} user={userMetadata}/>
              </Grid>
            </Container>
          </Box>
        </Modal>
      ) : (
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>
      )}
    </Container>
  </>: <Loading />

}
