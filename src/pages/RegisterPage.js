import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Divider, Stack, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../components/logo';
import Image from '../components/image';

import Iconify from '../components/iconify';
// sections
import { RegisterForm } from '../sections/auth/login';
import illustration from '../assets/images/Pet-Passport.svg'


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    background: 'url(https://www.petastic.com/static/media/gradient-glow.32c37d10.svg)'
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh', // <-- add this line
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
  padding: '40px',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 500,
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
            <Box sx={{ display: 'inline-flex' }}>
              <Logo />
            </Box>
            <Typography variant="h4" gutterBottom>
              Get started absolutely free.
            </Typography>
            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Link to="/login" variant="subtitle2">Sign in</Link>
            </Typography>
            <RegisterForm />
          </StyledSection>
        
         {mdUp && (<Container maxWidth="sm">
          <StyledContent>
          <Typography variant="h3" sx={{ px: 2, mt: 10, mb: 5 }}>
            One place for everything pet.   
            </Typography>
            <Image
              disabledEffect
              visibleByDefault
              alt="auth"
              src={illustration || '/assets/illustrations/illustration_dashboard.png'}
              sx={{ maxWidth: 720 }}
            />
          </StyledContent>
        </Container>)}
      </StyledRoot>
    </>
  );
}
