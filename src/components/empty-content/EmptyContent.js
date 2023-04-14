import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
// @mui

import { Typography, Stack, Card, Button, Modal, Box, Container } from '@mui/material';
//
import Iconify from '../iconify';
import Image from '../image';
import EmptyImage from '../../assets/illustrations/WelcomeDogIllustration';
import UserNewEditForm from '../../sections/@dashboard/user/UserNewEditForm';




// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  sx: PropTypes.object,
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function EmptyContent({ title, description, isEmptyWallet, handleClose, sx, ...other }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  
  const navigate = useNavigate();

  return (
    <Card sx={{ mb: 3 }}>

    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        height: 1,
        textAlign: 'center',
        p: (theme) => theme.spacing(8, 2),
        ...sx,
      }}
      {...other}
    >
      <EmptyImage
        disabledEffect
        alt="empty content"
        src={'/assets/illustrations/welsome_dog.svg'}
        sx={{ height: 240, mb: 3 }}
      />

      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>

      {description && (
        <>
          <Typography variant="body2" sx={{acolor: 'text.secondary' }}>
            {description}
          </Typography>
          <Modal open={open} 
            onClose={handleClose} 
            BackdropProps={{style: {ClickBackdrop: false, background: 'url(https://www.petastic.com/static/media/gradient-glow.32c37d10.svg)'}}}
            >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', outline: 'none' }}>
              <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '50vw' }}>
                  <UserNewEditForm handleClose={handleClose} sx={{ alignItems: 'center', justifyContent: 'center' }} />
                </Box>
              </Container>
            </Box>
          </Modal>
          <Button onClick={handleOpen} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              New Pet
          </Button>
        </>
      )}
    </Stack>
    </Card>

  );
}
