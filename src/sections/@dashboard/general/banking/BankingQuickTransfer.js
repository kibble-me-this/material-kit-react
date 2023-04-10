import PropTypes from 'prop-types';
import emailjs from "@emailjs/browser";
import { useCookies } from "react-cookie";
import { useState, useEffect, useRef } from 'react';
// @mui
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

import useLocalStorage from '../../../../hooks/useLocalStorage';

// ----------------------------------------------------------------------

import CHECK_MARK from '../../../../assets/images/Icon.svg'

const STEP = 1;
const MIN_AMOUNT = 1;
const AVATAR_SIZE = 40;
const MAX_AMOUNT = 10;
const LINE_FRONT = 10000;
const LINE_BEHIND = 50000;
const formattedLineBehind = LINE_BEHIND.toLocaleString();

// ----------------------------------------------------------------------

BankingQuickTransfer.propTypes = {
  sx: PropTypes.object,
  list: PropTypes.array,
  title: PropTypes.string,
  subheader: PropTypes.string,
};

export default function BankingQuickTransfer({ title, subheader, list, user, sx, ...other }) {
  const theme = useTheme();
  const [autoWidth, setAutoWidth] = useState(24);
  const [amount, setAmount] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [selectContact, setSelectContact] = useState(0);
  const [step, setStep] = useState(1);
  const carouselRef = useRef(null);
  const getContactInfo = list.find((_, index) => index === selectContact);
  const [emailSent, setEmailSent] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);
  const [storedCount, setStoredCount] = useLocalStorage('petCount', 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (amount) {
      handleAutoWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount]);

  useEffect(() => {
    if (storedCount > 0) {
      handleStepChange();
    }
  }, [storedCount]);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setStep(1);
    setSelectContact(0);
    setAmount(0);
  };

  const handleAutoWidth = () => {
    const getNumberLength = amount.toString().length;
    setAutoWidth(getNumberLength * 22);
  };

  const handleChangeSlider = (event, newValue) => {
    setAmount(newValue);
  };

  const handleChangeInput = (event) => {
    setAmount(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > MAX_AMOUNT) {
      setAmount(MAX_AMOUNT);
    }
  };

  const handleStepChange = () => {
    setStep(2);
  }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_2nw5qla",
        "template_tyvynii",
        form.current,
        "xdL7DKBOnhX6fRDbJ"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStoredCount(amount);
          handleStepChange();          
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  
  return (
    <>
<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
{step === 1 ? (
    <Typography   sx={{
      fontSize: "26px",
      fontWeight: "800",
      textAlign: "center",
      lineHeight: '132%',
      color: '#343A40',
      marginBottom: '32px',
    }} >Reserve your spot to a whole new pet experience.</Typography>
  ) : ( 
    <Stack direction="row" alignItems="center" marginBottom = '32px'>
      <Avatar src={CHECK_MARK} sx={{ width: 24, height: 24, mr: 1 }} />
      <Typography sx={{
      fontSize: "26px",
      fontWeight: "800",
      textAlign: "center",
      lineHeight: '132%',
      color: '#343A40',
    }} >Reservation Complete</Typography> 
    </Stack>
  )}  
  <Card sx={{   
    width: "375px",
    boxShadow: "0px 12px 30px rgba(19, 31, 102, 0.1)",
    borderRadius: "16px",
    background: "linear-gradient(110.25deg, rgba(255, 255, 255, 0.6) 0.67%, rgba(255, 255, 255, 0.04) 99.33%)", }}>    
  <CardContent sx={{ padding: theme.spacing(4) }}>
      {step === 1 && (
        <form ref={form} onSubmit={sendEmail}>
          <Stack spacing={3}>
            <Typography sx={{
              fontSize: "16px",
              fontWeight: "700",
              textAlign: "center"
            }}>How many pets are in your family?</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 2 }}>
              <Slider
                value={typeof amount === 'number' ? amount : 0}
                valueLabelDisplay="auto"
                step={STEP}
                marks
                min={MIN_AMOUNT}
                max={MAX_AMOUNT}
                onChange={handleChangeSlider}
                sx={{ flexGrow: 1 }}
              />
              <InputAmount
                type="number"
                name="pet_count"
                amount={amount}
                onBlur={handleBlur}
                maxWidth={autoWidth}
                onChange={handleChangeInput}
                sx={{ flexGrow: 1, ml: 2 }}
              />
              <input
                type="hidden"
                name="user_email"
                value={process.env.REACT_APP_EMAILJS_FROM_ADDRESS}
                readOnly
              />
              <input
                name="magic_user"
                value={user.email}
                type="hidden"
              />
              <input
                name="public_address"
                value={user.publicAddress}
                type="hidden"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={amount === 1}
              sx={{ mt: 3 }}
            >
              Reserve Your Spot
            </Button>
          </Stack>
        </form>

      )}
    
      {step === 2 && (
        <ConfirmTransferDialog
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

// ----------------------------------------------------------------------

InputAmount.propTypes = {
  amount: PropTypes.number,
  autoWidth: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  sx: PropTypes.object,
};

function InputAmount({ autoWidth, amount, onBlur, onChange, sx, ...other }) {
  return (
    <Stack direction="row" justifyContent="center" spacing={1} sx={sx}>

      <Input
        disableUnderline
        size="small"
        value={amount}
        onChange={onChange}
        onBlur={onBlur}
        inputProps={{ step: STEP, min: MIN_AMOUNT, max: MAX_AMOUNT, type: 'number' }}
        sx={{
          typography: 'h5',
          '& input': {
            p: 0,
            textAlign: 'center',
            width: '100px',
          },
        }}
        {...other}
      />
    </Stack>
  );
}

// ----------------------------------------------------------------------

ConfirmTransferDialog.propTypes = {
  open: PropTypes.bool,
  onBlur: PropTypes.func,
  onClose: PropTypes.func,
  amount: PropTypes.number,
  onChange: PropTypes.func,
  autoWidth: PropTypes.number,
  contactInfo: PropTypes.object,
};

function ConfirmTransferDialog({
  amount,
}) {

  const petWord = amount === 1 ? "pet" : "pets";
  const petVerb = amount === 1 ? "has" : "have";
  const petPronoun = amount === 1 ? "its" : "their";
  const petCount = localStorage.getItem('petCount');

  return (
      <>
        <Box sx={{ p: 2 }}>
        <Stack direction="row" alignItems="center"  justifyContent="center" sx={{ pb: 4 }}>
            <Typography sx={{
            fontSize: "16px",
            fontWeight: "400",
            textAlign: "center",
            color: "#343A40",
          }}>Your <Typography component="span" sx={{ color: "#2C4CFF" }}>{petCount}</Typography> {petWord} {petVerb} reserved {petPronoun} spot.</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" >
          <Box sx={{
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
                }}>
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "800",
                  textAlign: "center", 
                  color: '#343A40' }}
              >{LINE_FRONT.toLocaleString()}</Typography>
              <Typography sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  textAlign: "center", 
                  color: '#6B6B6B' }}>Pets in front of you</Typography>
            </Box>
            <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                  '& .MuiInputBase-input': {
                    fontSize: '24px',
                    fontWeight: '800',
                    textAlign: 'center',
                    color: '#343A40',
                  },
                  paddingLeft: '24px',

                }}>            
              <Typography
                sx={{
                  fontSize: "24px",
                  fontWeight: "800",
                  textAlign: "center", 
                  color: '#343A40' }}
              >{LINE_BEHIND.toLocaleString()}</Typography>
              <Typography sx={{
                  fontSize: "12px",
                  fontWeight: "400",
                  textAlign: "center", 
                  color: '#6B6B6B' }}>Pets in behind you</Typography>
            </Box>
        </Stack>
        </Box>
      </>
  );
}
