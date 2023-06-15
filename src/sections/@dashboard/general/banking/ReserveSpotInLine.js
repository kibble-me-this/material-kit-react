import PropTypes from 'prop-types';
import { API, graphqlOperation } from 'aws-amplify';
import gql from 'graphql-tag';
import emailjs from '@emailjs/browser';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Stack,
  Input,
  Button,
  Avatar,
  Slider,
  Typography,
  CardContent,
} from '@mui/material';

import CHECK_MARK from '../../../../assets/images/Icon.svg';

const STEP = 1;
const MIN_AMOUNT = 1;
const MAX_AMOUNT = 10;
const LINE_FRONT = 499;
const LINE_BEHIND = 189;

const createReservationMutation = gql`
  mutation CreateReservation($email: String!, $publicAddress: String!, $petCount: Int!) {
    createReservation(input: { email: $email, publicAddress: $publicAddress, petCount: $petCount }) {
      id
      email
      publicAddress
      createdAt
      petCount
    }
  }
`;

const getReservationQuery = gql`
  query GetReservation($email: String!, $publicAddress: String!) {
    getReservation(email: $email, publicAddress: $publicAddress) {
      id
      email
      publicAddress
      createdAt
      petCount
    }
  }
`;

export default function ReserveSpotInLine({ title, subheader, list, user, sx, ...other }) {
  const theme = useTheme();
  const [autoWidth, setAutoWidth] = useState(24);
  const [amount, setAmount] = useState(() => {
    const storedAmount = localStorage.getItem('reservationAmount');
    return storedAmount ? parseInt(storedAmount, 10) : 1;
  });
  const [openModal, setOpenModal] = useState(false);
  const [selectContact, setSelectContact] = useState(0);
  const [step, setStep] = useState(() => {
    const storedStep = localStorage.getItem('reservationStep');
    return storedStep ? parseInt(storedStep, 10) : 1;
  });
  const carouselRef = useRef(null);
  const getContactInfo = list.find((_, index) => index === selectContact);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(getReservationQuery, {
            email: user.email,
            publicAddress: user.publicAddress,
          })
        );

        if (response.data.getReservation) {
          const { petCount } = response.data.getReservation;
          setAmount(petCount);
          setStep(2);
        } else {
          // No reservation found in the database, reset to step 1
          setStep(1);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReservation();
  }, []);

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
  }, [amount]);

  useEffect(() => {
    localStorage.setItem('reservationAmount', amount.toString());
    localStorage.setItem('reservationStep', step.toString());
  }, [amount, step]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setStep(1);
    setSelectContact(0);
    setAmount(1);
  };

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleChangeSlider = (event, newValue) => {
    setAmount(parseInt(newValue, 10));
  };

  const handleChangeInput = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < MIN_AMOUNT) {
      setAmount(MIN_AMOUNT);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };

  const handleStepChange = () => {
    setStep(2);
  };

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_2nw5qla',
        'template_tyvynii',
        form.current,
        'xdL7DKBOnhX6fRDbJ'
      )
      .then(
        (result) => {
          console.log(result.text);
          handleStepChange();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const handleReserveSpot = async () => {
    try {
      // Configure the API endpoint and authentication mode
      API.configure({
        aws_appsync_graphqlEndpoint:
          'https://vnqoeh2a2vc2bav244wn3tsqzm.appsync-api.us-east-1.amazonaws.com/graphql',
        aws_appsync_region: 'us-east-1',
        aws_appsync_authenticationType: 'API_KEY',
        aws_appsync_apiKey: 'da2-6beeidvh4zerxjurelzksvoqay',
      });

      // Construct the GraphQL mutation using graphqlOperation
      const mutation = graphqlOperation(createReservationMutation, {
        email: user.email,
        petCount: parseInt(amount, 10),
        publicAddress: user.publicAddress,
      });

      // Make the API call to create a new reservation
      const response = await API.graphql(mutation);

      // Log the debug information
      if (response && response.data && response.data.createReservation) {
        const debugInfo = response.data.createReservation.debugInfo;
        if (debugInfo) {
          console.log('Debug Information:', debugInfo);
        }
      }

      // Handle the response and update the UI accordingly
      console.log('API Response:', response.data.createReservation);
      // ...
    } catch (error) {
      console.error(error);
      // Handle the error and show an error message to the user
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {step === 1 ? (
          <Typography
            sx={{
              fontSize: '26px',
              fontWeight: '800',
              textAlign: 'center',
              lineHeight: '132%',
              color: '#343A40',
              marginBottom: '32px',
            }}
          >
            Reserve your spot to a personalized pet experience.
          </Typography>
        ) : (
          <Stack direction="row" alignItems="center" marginBottom="32px">
            <Avatar src={CHECK_MARK} sx={{ width: 24, height: 24, mr: 1 }} />
            <Typography
              sx={{
                fontSize: '26px',
                fontWeight: '800',
                textAlign: 'center',
                lineHeight: '132%',
                color: '#343A40',
              }}
            >
              Reservation Complete
            </Typography>
          </Stack>
        )}
        <Card
          sx={{
            width: '375px',
            boxShadow: '0px 12px 30px rgba(19, 31, 102, 0.1)',
            borderRadius: '16px',
            background:
              'linear-gradient(110.25deg, rgba(255, 255, 255, 0.6) 0.67%, rgba(255, 255, 255, 0.04) 99.33%)',
          }}
        >
          <CardContent sx={{ padding: theme.spacing(4) }}>
            {/* step 1 - how many pets form */}
            {step === 1 && (
              <form ref={form} onSubmit={sendEmail}>
                <Stack spacing={3}>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      fontWeight: '700',
                      textAlign: 'center',
                    }}
                  >
                    How many pets are in your family?
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
                    <Slider
                      value={amount}
                      valueLabelDisplay="auto"
                      step={STEP}
                      marks
                      min={MIN_AMOUNT}
                      max={MAX_AMOUNT}
                      onChange={handleChangeSlider}
                      sx={{ flexGrow: 1 }}
                    />
                    <Input
                      disableUnderline
                      size="small"
                      value={amount}
                      onChange={handleChangeInput}
                      onBlur={handleBlur}
                      inputProps={{ step: STEP, min: MIN_AMOUNT, max: MAX_AMOUNT, type: 'number' }}
                      sx={{ flexGrow: 1, ml: 2, maxWidth: autoWidth }}
                    />
                    <input
                      type="hidden"
                      name="user_email"
                      value={process.env.REACT_APP_EMAILJS_FROM_ADDRESS}
                      readOnly
                    />
                    <input name="magic_user" value={user.email} type="hidden" />
                    <input name="public_address" value={user.publicAddress} type="hidden" />
                  </Box>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={amount < MIN_AMOUNT}
                    sx={{ mt: 3 }}
                    onClick={handleReserveSpot}
                  >
                    Reserve Your Spot
                  </Button>
                </Stack>
              </form>
            )}
            {/* step 2 - place in line confirmation */}
            {step === 2 && (
              <ConfirmReservationDialog
                open={openModal}
                autoWidth={autoWidth}
                amount={amount}
                contactInfo={getContactInfo}
                onClose={handleCloseModal}
                onBlur={handleBlur}
                onChange={handleChangeInput}
              />
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

ReserveSpotInLine.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

function ConfirmReservationDialog({ amount }) {
  const petWord = amount === 1 ? 'pet' : 'pets';
  const petVerb = amount === 1 ? 'has' : 'have';
  const petPronoun = amount === 1 ? 'its' : 'their';
  const petCount = amount;

  return (
    <>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="center" sx={{ pb: 4 }}>
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '400',
              textAlign: 'center',
              color: '#343A40',
            }}
          >
            Your <Typography component="span" sx={{ color: '#2C4CFF' }}>
              {petCount}
            </Typography>{' '}
            {petWord} {petVerb} reserved {petPronoun} spot.
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '& .MuiInputBase-input': {
                fontSize: '24px',
                fontWeight: '800',
                textAlign: 'center',
                color: '#343A40',
              },
              paddingRight: '24px',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '800',
                textAlign: 'center',
                color: '#343A40',
              }}
            >
              {LINE_FRONT.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '400',
                textAlign: 'center',
                color: '#6B6B6B',
              }}
            >
              Pets in front of you
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
              paddingLeft: '24px',
            }}
          >
            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: '800',
                textAlign: 'center',
                color: '#343A40',
              }}
            >
              {LINE_BEHIND.toLocaleString()}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                fontWeight: '400',
                textAlign: 'center',
                color: '#6B6B6B',
              }}
            >
              Pets behind you
            </Typography>
          </Box>
        </Stack>
      </Box>
    </>
  );
}
