/* eslint-disable react/no-this-in-sfc, object-shorthand */

import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as nearAPI from "near-api-js";
// import { Buffer } from 'buffer';


// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Button, ButtonGroup } from '@mui/material';
// utils
import BN from 'bn.js';
// import { create } from "ipfs-http-client";
import bs58 from 'bs58';

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
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
} from '../../../components/hook-form';
// import RHFButtonGroup from '../../../components/hook-form/RHFButtonGroup';





// ----------------------------------------------------------------------

UserNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object,
};

let near;

// move to .env
const projectId = "2LIY06BYu1sRP7pEVZEg1Pk4yWg";
const projectSecret = "0a9dca59a54739a793b891629515d83d";

// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecret}`).toString("base64")}`;

// const client = create({
//   host: "ipfs.infura.io",
//  port: 5001,
//   protocol: "https",
//  apiPath: "/api/v0",
//   headers: {
//    authorization: auth
//  }
// });


export default function UserNewEditForm({ isEdit = false, currentUser }) {
  const networkId = "testnet"; // testnet, betanet, or mainnet
  const contractName = "ilovepets-m2.testnet";

  const [userMetadata, setUserMetadata] = useState();
  const [v1URL, setv1URL] = useState({});
  const [txHash, setTxHash] = useState("");                                  // mint ppp
  const [sendingTransaction, setSendingTransaction] = useState(false);       // mint ppp
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const petName = "Fluffy";
  const petType = "Dog";
  const selectedBreed = "Poodle";
  const petLifeStage = "Adult";
  const petGender = "Female";
  const ownerName = "John Doe";
  const ownerState = "California";
  const ownerCity = "San Francisco";

  const sampleFormData = {
    petName: "Fluffy",
    petType: "Dog",
    selectedBreed: "Poodle",
    petLifeStage: "Adult",
    petGender: "Female",
    ownerName: "John Doe",
    ownerState: "California",
    ownerCity: "San Francisco",
    contractName: "my_contract",
    userMetadata: { publicAddress: "1234" },
    networkId: "testnet",
    image: { path: "Qm1234", cid: { toV1: () => "bafybeifkzwf" } }
  };

  const NewUserSchema = Yup.object().shape({
    petName: Yup.string().required('Pet name is required'),
    petType: Yup.string().required('Pet type is required'),
    selectedBreed: Yup.string().required('Breed / selectedBreed is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
    isPuppy: Yup.boolean().required('Life stage is required'),
    isAdult: Yup.boolean().required('Life stage is required'),
    isSenior: Yup.boolean().required('Life stage is required'),
  });

  const defaultValues = useMemo(
    () => ({
      petName: currentUser?.name || '',
      petType: currentUser?.petType || null,
      selectedBreed: currentUser?.selectedBreed || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      isPuppy: false,
      isAdult: false,
      isSenior: false,
    }),
    [currentUser]
  );

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

  const handleCreatePassport = async (data) => {
    console.log("hello");
  };
  
  const onSubmit = async () => {
    try {
      await handleCreatePassport(sampleFormData);
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate("/dashboard/pets");
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

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
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

            <RHFSwitch
              name="isVerified"
              labelPlacement="start"
              label={
                <>
                  <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                    Email Verified
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Disabling this will automatically send the user a verification email
                  </Typography>
                </>
              }
              sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="petName" label="Pet Name" />

              <RHFSelect name="petType" label="Pet Type" defaultValue="" rules={{ required: 'Pet type is required' }}>
                <option value="" disabled>
                  Select a pet type
                </option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
              </RHFSelect>

              <RHFTextField name="selectedBreed" label="Breed / selectedBreed" />
              <ButtonGroup
                name="life_stage"
                control={control}
                defaultValue={null}
                options={[
                  { value: 'puppy', label: 'Puppy' },
                  { value: 'adult', label: 'Adult' },
                  { value: 'senior', label: 'Senior' },
                ]}
                rules={{ required: 'Life stage is required' }}
              >
                <Button>Puppy</Button>
                <Button>Adult</Button>
                <Button>Senior</Button>
              </ButtonGroup>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'Create Pet' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
