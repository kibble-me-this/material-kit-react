import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as nearAPI from "near-api-js";


// @mui
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// components
import { magic } from "../magic";
import Loading from "./Loading";
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Iconify from '../components/iconify';
// mock
// import PRODUCTS from '../_mock/products';

let near;


// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [userMetadata, setUserMetadata] = useState();
  const [openFilter, setOpenFilter] = useState(false);
  const [petCount, setPetCount] = useState(null);
  const [userPets, setUserPets] = useState([]);
  const navigate = useNavigate();
  const networkId = "testnet"; // testnet, betanet, or mainnet

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
          getPPPTokensForOwner(user.publicAddress); 
        });
      } else {
        // If no user is logged in, redirect to `/login`
        navigate('/login', { replace: true });
      }
    });
  }, []);   

   async function getPPPTokensForOwner(account_id) {
        
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

  return userMetadata ?
    <>
      <Helmet>
        <title> Pets | Petastic </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          My Pets
          </Typography>
          <Link to="/dashboard/blank">
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Pet
          </Button>
        </Link>
        </Stack>
        <Box borderBottom="1px solid #CED4DA" width="100%" mt={1} />

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <ProductList pets={userPets} />
      </Container>
    </>: <Loading />
}
