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
  maxWidth: 480,
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
            {!mdUp && (
              <Typography  variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, LFG
              </Typography>
            )}
          </StyledSection>
        
         {mdUp && (<Container maxWidth="sm">
          <StyledContent>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, LFG
            </Typography>
            <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              [fancy illustration here]
            </Typography>
          </StyledContent>
        </Container>)}
      </StyledRoot>
    </>
  );
}
