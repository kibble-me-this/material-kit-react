import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import { navConfig, navConfig2, logout } from './config'; // Update the import statement

import useLocalStorage from '../../../hooks/useLocalStorage';


// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: theme.palette.background.alpha,
  // sx: {
  //  background: 'linear-gradient(112.91deg, rgba(255, 255, 255, 0.5) 3.51%, rgba(255, 255, 255, 0.2) 111.71%)',
  // },
}));

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');

  const isDesktop = useResponsive('up', 'lg');
  const navigate = useNavigate(); // Add the useNavigate hook here

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleLogout = async () => { // Define the handleLogout function
    await logout(navigate); // Call the logout function from the config and pass the navigate function
  };

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ ml: 5 }}>
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {JSON.parse(firstName)} {JSON.parse(lastName)}
        </Typography>
      </Box>
      <NavSection data={navConfig2} handleLogout={handleLogout} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              background: 'linear-gradient(112.91deg, rgba(255, 255, 255, 0.05) 3.51%, rgba(255, 255, 255, 0.05) 111.71%)',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
