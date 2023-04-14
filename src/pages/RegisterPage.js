import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';

import Iconify from '../components/iconify';
// sections
import { RegisterForm } from '../sections/auth/login';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    background: 'url(https://www.petastic.com/static/media/gradient-glow.32c37d10.svg)'
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: 'background: linear-gradient(112.91deg, rgba(255, 255, 255, 0.5) 3.51%, rgba(255, 255, 255, 0.2) 111.71%)',
  padding: '40px',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 550,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));


// ----------------------------------------------------------------------

export default function RegisterPage() {
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Register | Petastic </title>
      </Helmet>

      <StyledRoot>
          <StyledSection>
            <Box sx={{ display: 'inline-flex', mb: 10 }}>
              <Logo />
            </Box>
            <Typography variant="h4" sx={{ mb: 4 }} gutterBottom>
              Sign up for Petastic
            </Typography>

            <RegisterForm />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Already have an account? {''}
              <Link to="/login" variant="subtitle2">Sign in</Link>
            </Typography>
          </StyledSection>
        
         {mdUp && (<Container maxWidth="sm">
          <StyledContent>
          <Typography variant="h3" sx={{ px: 2, mt: 10, mb: 5 }}>
            One place for everything pet.   
            </Typography>
          </StyledContent>
        </Container>)}
      </StyledRoot>
    </>
  );
}
