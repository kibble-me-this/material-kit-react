import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import * as nearAPI from "near-api-js";

import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Stack, Button, Modal, Box, Typography, Backdrop } from '@mui/material';
import EmptyContent from '../components/empty-content';
// components
import { magic } from "../magic";
import Loading from "./Loading";
// import Iconify from '../components/iconify';
// sections

import {
  _bankingContacts,
  _bankingCreditCard,
  _bankingRecentTransitions,
} from '../_mock/arrays';
import { ReserveSpotInLine } from '../sections/@dashboard/general/banking';


 let near;


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();
  const [userMetadata, setUserMetadata] = useState();
  const [nearBalance, setNearBalance] = useState(null);
  const navigate = useNavigate();
  const networkId = "testnet"; // testnet, betanet, or mainnet
  const [open, setOpen] = useState(true);
  const [isEmptyWallet, setIsEmptyWallet] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

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
      });
    } else {
      // If no user is logged in, redirect to `/login`
      navigate('/login', { replace: true });
    }
  });
}, []);   

const handleFetchBalance = async (account_id) => {
  try {
    const account = await near.account(account_id);
    const bal = await account.getAccountBalance();
    setNearBalance(nearAPI.utils.format.formatNearAmount(bal.total));
    if (bal.total) {
      setIsEmptyWallet(false);
    }
    setIsLoading(false);
  } catch (error) {
    // Handle the error when the account is not active or does not exist
    console.error('Error fetching account balance:', error);
    setIsEmptyWallet(true);
    setIsLoading(false);
  }
};





return userMetadata ? (
  <>
    <Helmet>
      <title>Dashboard | Petastic</title>
    </Helmet>

    <Container maxWidth="xl">
      {!isLoading ? (
        <>
          {isEmptyWallet && !isLoading ? (
            <Modal
              open={open}
              onClose={handleClose}
              BackdropProps={{
                style: {
                  ClickBackdrop: false,
                  background: 'url(https://www.petastic.com/static/media/gradient-glow.32c37d10.svg)',
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  outline: 'none',
                }}
              >
                <Container>
                  <Grid container>
                    {/* Render the section when isEmptyWallet is true */}
                    <ReserveSpotInLine title="" subheader="" list={_bankingContacts} user={userMetadata} />
                  </Grid>
                </Container>
              </Box>
            </Modal>
          ) : (
            <>
            {!isLoading && navigate('/dashboard/pets')}
              <Typography variant="h4" sx={{ mb: 5 }}>
                Hi, Welcome back
              </Typography>
              <EmptyContent
                title="Welcome to the future of pet care."
                description="Let's add your furry friends."
                isEmptyWallet={isEmptyWallet}
                handleClose={handleClose}
              />
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </Container>
  </>
) : (
  <Loading />
);

}
