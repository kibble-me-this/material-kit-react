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
import Image from '../components/image';

// sections
import { LoginForm } from '../sections/auth/login';
import illustration from '../assets/images/dog-passport.svg'


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
  backgroundColor: 'linear-gradient(112.91deg, rgba(255, 255, 255, 0.5) 3.51%, rgba(255, 255, 255, 0.2) 111.71%)',
  padding: '40px',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const navigate = useNavigate();
  const mdUp = useResponsive('up', 'md');

  return (
    <>
      <Helmet>
        <title> Login | Petastic </title>
      </Helmet>

      <StyledRoot>
          <StyledSection>
            <Box sx={{ display: 'inline-flex', mb: 10 }}>
              <Logo />
            </Box>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>

            <LoginForm />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Don’t have an account? {''}
              <Link to="/register" variant="subtitle2">Get started</Link>
            </Typography>
          </StyledSection>
        
         {mdUp && (<Container maxWidth="sm">
          <StyledContent>
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
