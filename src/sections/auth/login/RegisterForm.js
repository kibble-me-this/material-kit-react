import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import { Link, Stack, IconButton, InputAdornment, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Iconify from '../../../components/iconify';
import { magic } from "../../../magic";
import useLocalStorage from '../../../hooks/useLocalStorage';



export default function RegisterForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [storedFirstName, setStoredFirstName] = useLocalStorage('firstName', "First");
  const [storedLastName, setStoredLastName] = useLocalStorage('lastName', "Last");

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const { handleSubmit, formState: { errors } } = methods;

  const loginWithEmail = useCallback(async () => {
    setIsLoggingIn(true);

    try {
      await magic.auth.loginWithMagicLink({ email });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.log(err);
      setIsLoggingIn(false);
    }
  }, [email]);  

  const handleEmailInputOnChange = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  const handleFirstNameInputOnChange = useCallback((event) => {
    setStoredFirstName(event.target.value);
  }, []);

  const handleLastNameInputOnChange = useCallback((event) => {
    setStoredLastName(event.target.value);
  }, []);

  const onSubmit = (data) => {
    setEmail(data.email);
    loginWithEmail();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField name="firstName" label="First name" onChange={handleFirstNameInputOnChange} required error={!!errors.firstName} helperText={errors.firstName ? "First name is required" : ""} />
            <TextField name="lastName" label="Last name" onChange={handleLastNameInputOnChange} required error={!!errors.lastName} helperText={errors.lastName ? "Last name is required" : ""} />
          </Stack>

          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            required
            placeholder="Enter your email"
            onChange={handleEmailInputOnChange}
            disabled={isLoggingIn}
            error={!!errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          
          <LoadingButton fullWidth size="large" type="submit" loading={isLoggingIn} disabled={isLoggingIn} variant="contained">
            Get started
          </LoadingButton>
        </Stack>
      </form>
    </FormProvider>
  );
}
