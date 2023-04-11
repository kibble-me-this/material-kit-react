import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { magic } from "../../../magic";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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

  return (
    <>
      <Stack spacing={3}>
        <TextField
          id="email"
          label="Email"
          type="email"
          required
          placeholder="Enter your email"
          onChange={handleEmailInputOnChange}
          disabled={isLoggingIn}
        />
      
      <LoadingButton fullWidth size="large" onClick={loginWithEmail} loading={isLoggingIn} disabled={isLoggingIn} variant="contained">
        Login
      </LoadingButton></Stack>

    </>
  );
}