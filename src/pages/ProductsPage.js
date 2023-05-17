import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as nearAPI from "near-api-js";


// @mui
import { Container, Stack, Typography, Button, Box, Modal, Grid } from '@mui/material';
// components
import { magic } from "../magic";
import Loading from "./Loading";
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Iconify from '../components/iconify';
import EmptyContent from '../components/empty-content';

import UserNewEditForm from '../sections/@dashboard/user/UserNewEditForm';

import useLocalStorage from '../hooks/useLocalStorage';


// mock
// import PRODUCTS from '../_mock/products';

let near;


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);
  const [userMetadata, setUserMetadata] = useState();
  const [petCount, setPetCount] = useState(null);
  const [nearBalance, setNearBalance] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const navigate = useNavigate();
  const networkId = "testnet"; // testnet, betanet, or mainnet
  const storedLastTx = localStorage.getItem('txHash');


  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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
  });
}

 const isEmptyCart = !petCount;
 const isEmptyWallet = !nearBalance;

 const [open, setOpen] = useState(false);

 const handleOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
   handleFetchPassports(userMetadata.publicAddress); 
 };

  return userMetadata ?
    <>
      <Helmet>
        <title> Pets | Petastic </title>
      </Helmet>
      

      <Modal open={open} 
        onClose={handleClose} 
        BackdropProps={{style: {ClickBackdrop: false, background: 'url(https://www.petastic.com/static/media/gradient-glow.32c37d10.svg)'}}}
        >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: 'none' }}>
          <Container>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '50vw' }}>
          <UserNewEditForm handleClose={handleClose} sx={{ alignItems: 'center', justifyContent: 'center' }} />
            </Box>
          </Container>
        </Box>
      </Modal>


      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          My Pets
          </Typography>
           {(petCount>0) &&
            <Button onClick={handleOpen} variant="contained">
              New Pet
            </Button>
          }
        </Stack>
      
        <Box borderBottom="1px solid #CED4DA" width="100%" mt={1} />

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="space-between" sx={{ mb: 5 }}>
        {/* <Box sx={{ flexGrow: 1 }}>
        {storedLastTx && (
          <Link 
            to={`https://explorer.testnet.near.org/transactions/${JSON.parse(storedLastTx)}`} 
            target="_blank"
          >
            TESTING - Latest passport on NEAR
          </Link>
        )}
        </Box>
         <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
          />
          <ProductSort />
        </Stack> */}
      </Stack>

        
        {!isEmptyCart ? (
          <ProductList pets={userPets} />
        ) : (
          <EmptyContent
            title="Welcome to the future of pet care."
            description="Let's add your furry friends."
            isEmptyWallet={isEmptyWallet}
            handleClose={handleClose}
          />          
        )}

      </Container>
    </>: <Loading />
}
