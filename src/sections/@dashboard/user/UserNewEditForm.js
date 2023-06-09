/* eslint-disable react/no-this-in-sfc, object-shorthand */

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import * as nearAPI from "near-api-js";


// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Button, ButtonGroup, ToggleButtonGroup, ToggleButton, Autocomplete, TextField, CircularProgress, Stepper, Step, StepLabel, LinearProgress} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';


// utils
import BN from 'bn.js';
import { create } from 'ipfs-http-client';

import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// assets

// components
import { magic } from "../../../magic";
import Label from '../../../components/label';
import { useSnackbar } from '../../../components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete
} from '../../../components/hook-form';

import useLocalStorage from '../../../hooks/useLocalStorage';

import PetCard from '../products/PetCard';

import UserNewEditFormStep1 from './UserNewEditFormStep1';
import UserNewEditFormStep2 from './UserNewEditFormStep2';
import UserNewEditFormStep3 from './UserNewEditFormStep3';



// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

let near;

const projectId = "2LIY06BYu1sRP7pEVZEg1Pk4yWg";
const projectSecret = "0a9dca59a54739a793b891629515d83d";
const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString("base64")}`;
const ipfs = create({
   host: "ipfs.infura.io",
   port: 5001,
    protocol: "https",
   apiPath: "/api/v0",
    headers: {
     authorization: auth
   }
 });

 const pet2 ={
  "pet_passport_id": "2ed23244b32ae571885d8a98da9fbc8b23b64392109298275504cc68857a0868-Gigi9998",
  "metadata": {
    "title": "Gigi9998",
    "description": "{\"species\": \"Dog\", \"breed\": \"Shih Tzu\", \"life-stage\": \"puppy\"}",
    "media": "https://ipfs.io/ipfs/QmTd9qqHLzTZmRXSkoDFvT3TcjTMyJWv19nhUh1JhGgHkg"
  },
  "pet_owner_id": "2ed23244b32ae571885d8a98da9fbc8b23b64392109298275504cc68857a0868"
}

export default function UserNewEditForm({ handleClose, isEdit = false, currentUser }) {
  const networkId = "testnet"; // testnet, betanet, or mainnet
  const contractName = "ilovepets-m2.testnet";
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userMetadata, setUserMetadata] = useState();
  const [v1URL, setv1URL] = useState({});
  const [storedLastTx, setStoredLastTx] = useLocalStorage('txHash', "");
  const [txHash, setTxHash] = useState("");
  const [sendingTransaction, setSendingTransaction] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [pet, setPet] = useState(null);


  

  const navigate = useNavigate();

  // steps start
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const steps = ['Step 1', 'Step 2', 'Step 3'];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UserNewEditFormStep1 />;
      case 1:
        return <UserNewEditFormStep2 />;
      case 2:
        return <UserNewEditFormStep3 />;
      default:
        return null;
    }
  }; 
  // end

  const [petType, setPetType] = useState('');
  const handlePetTypeChange = (event, newPetType) => {
    setPetType(newPetType);
    setValue('petType', newPetType);
  };

  const [petGender, setPetGender] = useState('');
  const handlePetGenderChange = (event, newPetGender) => {
    setPetGender(newPetGender);
    setValue('petGender', newPetGender);
  };

  const [puppy_kitten, setPuppyKitten] = useState('BABY');   
  const [petLifeStage, setPetLifeStage] = useState('');
  const handleChangeLifeStage = (event, newLifeStage) => {
    setPetLifeStage(newLifeStage);
    setValue('petLifeStage', newLifeStage);
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [breeds, setBreeds] = useState([]);
  const [responseText, setResponseText] = useState('');
  const [selectedBreed, setSelectedBreed] = useState([]);
  const [loadingBreeds, setLoadingBreeds] = useState(false);


  

  const NewUserSchema = Yup.object().shape({
    petName: Yup.string().required('Pet name is required'),
    petType: Yup.string().required('Pet type is required'),
    petGender: Yup.string().required('Pet gender is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
    // selectedBreed: Yup.array().min(1, 'Must have at least 1 tags'),
  });

  const defaultValues = useMemo(
    () => ({
      petName: currentUser?.name || '',
      petType: currentUser?.petType || null,
      petGender: currentUser?.petType || null,
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      // selectedBreed: currentUser?.tags || [TAGS_OPTION[0]],
    }),
    [currentUser]
  );

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    setLoadingBreeds(true);

    fetch(`https://prd.petastic.com/breeds?search=${searchTerm}&pet_type=${petType}&start=0&limit=10&uxv=v-1.4.0`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const breedNames = data.data.map(breed => breed.primary_name);
        setBreeds(breedNames);
        setResponseText(JSON.stringify(data, null, 2));
        setLoadingBreeds(false);
      })
      .catch(error => {
        console.error(error);
        setLoadingBreeds(false);
      });
  }
  
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

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
        });
      } else {
        // If no user is logged in, redirect to `/login`
        navigate('/login', { replace: true });
      }
    });
  }, []);    

  const handleImageUpload = async (file) => {
    try {
      const fileData = await file.arrayBuffer(); // get the file data from the path property
      const { cid } = await ipfs.add(fileData);
      const v1CID = cid.toV1().toBaseEncodedString('base32');
      const v1URL = `https://${v1CID}.ipfs.dweb.link`;
      const url = `https://ipfs.io/ipfs/${cid.toString()}`;
      console.log(`Image uploaded to IPFS with CID: ${cid.toString()}`);
      return url;
    } catch (error) {
      console.log(`Error uploading image to IPFS: ${error}`);
    }
    return null;
  }

  const handleCreatePassport = async (data) => {
    const {
      petName,
      petType,
      petGender,
      avatarUrl,
      petLifeStage
    } = data;
    
    setSendingTransaction(true);
    setTxHash(false); 

    const imageUrl = await handleImageUpload(avatarUrl);
    if (!imageUrl) {
      console.log('Error uploading image to IPFS');
      return;
    }

    const publicKeyString = await magic.near.getPublicKey();
    const publicKey = nearAPI.utils.PublicKey.fromString(publicKeyString);

    const provider = new nearAPI.providers.JsonRpcProvider(
    `https://rpc.${networkId}.near.org`
    );

    const accessKey = await provider.query(
    `access_key/${userMetadata.publicAddress}/${publicKey.toString()}`,
    ""
    );

    const nonce = accessKey.nonce +1;
    
    const args = new TextEncoder().encode(
      JSON.stringify({
        pet_passport_id: `${userMetadata.publicAddress}-${petName}`,
        metadata: {
          title: data.petName,
          description: `{"species": "${petType}", "gender": "${petGender}", "breed": "${selectedBreed}", "life-stage": "${petLifeStage}"}`,
          media: imageUrl,
        },
        pet_owner_id: userMetadata.publicAddress,
      })
    );    

    const actions = [nearAPI.transactions.functionCall("create_pet_passport",args,300000000000000,new BN("11870000000000000000000"))];

    // Near transactions must be sent with the blockhash of a block mined within the last 24 hours
    const status = await near.connection.provider.status();
    const blockHash = status.sync_info.latest_block_hash;
    const serializedBlockHash = nearAPI.utils.serialize.base_decode(blockHash);  

    const transaction = nearAPI.transactions.createTransaction(
    userMetadata.publicAddress,                                           // sender address
    publicKey,                                                            // sender public key
    contractName,                                                         // destinationAddress, // receiver
    nonce,                                                                // sender account nonce
    actions,                                                              // transaction instructions
    serializedBlockHash                                                   // hash of a block mined within prev 24 hours
    );

    const rawTransaction = transaction.encode();
    const result = await magic.near.signTransaction({rawTransaction, networkID: networkId});
    const signedTransaction = nearAPI.transactions.SignedTransaction.decode(Buffer.from(result.encodedSignedTransaction));
    const receipt = await near.connection.provider.sendTransaction(signedTransaction);
    console.log(receipt);
    setStoredLastTx(receipt.transaction.hash);
    // return receipt.transaction.hash;
  };
  
  const onSubmit = async (data) => {
    try {
      await handleCreatePassport(data);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');

      const pet = {
        pet_passport_id: `${userMetadata.publicAddress}-${data.petName}`,
        metadata: {
          title: data.petName,
          description: JSON.stringify({
            species: data.petType,
            breed: selectedBreed,
            "life-stage": data.petLifeStage,
          }),
          media: data.avatarUrl.preview,
        },
        pet_owner_id: userMetadata.publicAddress,
      };

      setPet(pet);
      setShowCongratulations(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const handleViewPets = () => {
    handleClose(); // Close the modal
    navigate('/dashboard/pets');
  };

  const handleAddAnotherPet = () => {
    reset(); // Reset the form values
    setSelectedBreed([]); // Clear the selected breed tags
    setSearchTerm(''); // Clear the search term
    setLoadingBreeds(false); // Stop loading breeds
    setShowCongratulations(false); // Display the form
  };

  return (
    <>
  <Box sx={{ width: '100%', minWidth: '425px' }}>
  <Stack spacing={3} sx={{ width: '100%', alignItems: 'center' }}>
  <Box sx={{ width: '100%', mb: '20px' }}>
  <Stepper activeStep={showCongratulations ? 1 : 0} orientation="horizontal">
    <Step sx={{ '& .MuiStepLabel-labelContainer': { flexDirection: 'row-reverse' } }}>
    <StepLabel StepIconProps={{ sx: { marginLeft: '10px' } }}>
      <Typography variant="caption" sx={{ fontSize: 9, lineHeight: '1.2', display: 'inline-block', textAlign: 'left' }}>
      Pet Passport</Typography>
      </StepLabel>
    </Step>
    <Step sx={{ '& .MuiStepLabel-labelContainer': { flexDirection: 'row-reverse' } }}>
      <StepLabel>
      <Typography variant="caption" sx={{ fontSize: 9, lineHeight: '1.2', display: 'inline-block', textAlign: 'left' }}>
          Food Profile
        </Typography>
      </StepLabel>
    </Step>
    <Step sx={{ '& .MuiStepLabel-labelContainer': { flexDirection: 'row-reverse' } }}>
      <StepLabel>
      <Typography variant="caption" sx={{ fontSize: 9, lineHeight: '1.2', display: 'inline-block', textAlign: 'left' }}>
          Vax Records
        </Typography>
      </StepLabel>
    </Step>
    <Step sx={{ '& .MuiStepLabel-labelContainer': { flexDirection: 'row-reverse' } }}>
      <StepLabel>
      <Typography variant="caption" sx={{ fontSize: 9, lineHeight: '1.2', display: 'inline-block', textAlign: 'left' }}>
          Care Givers
        </Typography>
      </StepLabel>
    </Step>
  </Stepper>
  <Box sx={{ width: '100%', marginTop: 2 }}>
    <LinearProgress variant="determinate" value={25} />
    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1, ml: 2, width: '90%' }}>
      <Box sx={{ display: 'flex', alignItems: 'left' }}>
        <LockOpenIcon sx={{ marginRight: .5, fontSize: 12 }} />
        <Typography variant="caption" sx={{ fontSize: 8, lineHeight: '1.2', mt:'1.4px' }}>
          + 100 KBL
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'left' }}>
        <LockIcon sx={{ marginRight: 0.5, fontSize: 12, color: '#808080' }} />
        <Typography variant="caption" sx={{ fontSize: 8, lineHeight: '1.2', mt:'1.4px' }}>
        + 250 KBL
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'left' }}>
        <LockIcon sx={{ marginRight: 0.5, fontSize: 12, color: '#808080' }} />
        <Typography variant="caption" sx={{ fontSize: 8, lineHeight: '1.2', mt:'1.4px' }}>
        + 750 KBL
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'left' }}>
        <LockIcon sx={{ marginRight: 0.5, fontSize: 12, color: '#808080' }} />
        <Typography variant="caption" sx={{ fontSize: 8, lineHeight: '1.2', mt:'1.4px' }}>
        + 1000 KBL
        </Typography>
      </Box>
    </Box>
  </Box>
</Box>
    {showCongratulations ? (
      <Box>
        <Grid container spacing={8} alignItems="center">
          <Grid item>
            <Box sx={{ width: '309px' }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Yay! You created {pet.metadata.title}'s Pet Passport.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                She earned 100 Kibble Rewards. What can you do with them? We'll let you know soon.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleViewPets}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '12px 18px',
                      gap: '6px',
                      width: '309px',
                      height: '48px',
                      background: '#2C4CFF',
                      borderRadius: '32px',
                      flex: 'none',
                      order: 0,
                      alignSelf: 'stretch',
                      flexGrow: 0,
                    }}
                  >
                    View My Pets
                  </Button>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleAddAnotherPet}
                  sx={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '12px 18px',
                    gap: '6px',
                    width: '309px',
                    height: '48px',
                    border: '2px solid #2C4CFF',
                    borderRadius: '32px',
                    flex: 'none',
                    order: 0,
                    alignSelf: 'stretch',
                    flexGrow: 0,
                    background: 'transparent',
                    color: '#2C4CFF',
                  }}
                >
                  Add Another Pet
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            <Box sx={{ width: '300px' }}>
              <PetCard product={pet} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      ) : (
        <Box>
          <Typography sx={{
            fontSize: "24px",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "20px"
          }}>One furball at a time.</Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Card sx={{ pt: 10, pb: 5, px: 3, minWidth: 400 }}>
                  {isEdit && (
                    <Label
                      color={values.status === 'active' ? 'success' : 'error'}
                      sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                    >
                      {values.status}
                    </Label>
                  )}

                  <Box sx={{ mb: 5 }}>
                    <RHFUploadAvatar
                      name="avatarUrl"
                      maxSize={3145728}
                      onDrop={handleDrop}
                      helperText={
                        <Typography
                          variant="caption"
                          sx={{
                            mt: 2,
                            mx: 'auto',
                            display: 'block',
                            textAlign: 'center',
                            color: 'text.secondary',
                          }}
                        >
                          Allowed *.jpeg, *.jpg, *.png, *.gif
                          <br /> max size of {fData(3145728)}
                        </Typography>
                      }
                    />
                  </Box>

                  {isEdit && (
                    <FormControlLabel
                      labelPlacement="start"
                      control={
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                            <Switch
                              {...field}
                              checked={field.value !== 'active'}
                              onChange={(event) =>
                                field.onChange(event.target.checked ? 'banned' : 'active')
                              }
                            />
                          )}
                        />
                      }
                      label={
                        <>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            Banned
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Apply disable account
                          </Typography>
                        </>
                      }
                      sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                    />
                  )}
                  <Stack  direction="column" spacing={2} alignItems="flex-end" sx={{ mt: 3 }}>
                    <RHFTextField name="petName" label="Pet Name" />


                    <ToggleButtonGroup
                      fullWidth
                      name="petType"
                      color="primary"
                      exclusive
                      value={petType}
                      onChange={handlePetTypeChange}
                      control={control}
                    >
                      <ToggleButton sx={{ fontWeight: 400 }} value="Dog" onClick={(event) => { setPuppyKitten("PUPPY"); }}>DOG</ToggleButton>
                      <ToggleButton sx={{ fontWeight: 400 }} value="Cat" onClick={(event) => { setPuppyKitten("KITTEN"); }}>CAT</ToggleButton>
                    </ToggleButtonGroup>

                    <ToggleButtonGroup
                      fullWidth
                      name="petGender"
                      color="primary"
                      exclusive
                      value={petGender}
                      onChange={handlePetGenderChange}
                      control={control}
                    >
                      <ToggleButton sx={{ fontWeight: 400 }} value="Male" >MALE</ToggleButton>
                      <ToggleButton sx={{ fontWeight: 400 }} value="Female" >FEMALE</ToggleButton>
                    </ToggleButtonGroup>


                    <ToggleButtonGroup
                      fullWidth
                      name="petLifeStage"
                      color="primary"
                      exclusive
                      value={petLifeStage}
                      onChange={handleChangeLifeStage}
                      control={control}
                    >
                      <ToggleButton sx={{ fontWeight: 400 }} value="puppy">{puppy_kitten}</ToggleButton>
                      <ToggleButton sx={{ fontWeight: 400 }} value="adult">ADULT</ToggleButton>
                      <ToggleButton sx={{ fontWeight: 400 }} value="senior">SENIOR</ToggleButton>
                    </ToggleButtonGroup>
                    <Autocomplete
                      fullWidth
                      ref={autocompleteRef}
                      options={breeds}
                      value={selectedBreed}
                      onChange={(event, values) => setSelectedBreed(values)}
                      renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Enter Pet Breed"
                            variant="outlined"
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                            sx={{ "& .MuiAutocomplete-endAdornment": {
                                display: "none"
                              }
                            }}

                            onChange={handleSearch}
                            value={searchTerm}
                            fullWidth
                            disabled={!petType}
                            // helperText={petType ? `Enter multiple breeds for mixed pets` : 'Choose cat or dog first'}
                        />
                      )}
                      disabled={!petType}
                      loading={loadingBreeds}
                      loadingText="Fetching breeds..."
                      noOptionsText={petType ? `Enter ${petType} breed` : 'Choose Cat or Dog'}
                      multiple
                      />

                    <LoadingButton fullWidth  size="large" type="submit" variant="contained" loading={isSubmitting}>
                      {!isEdit ? 'Create Pet Passport' : 'Save Changes'}
                    </LoadingButton>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Box>
        )}
  </Stack>
  </Box>
  </>
  );
}
