import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
// @mui

import { Typography, Stack, Card, Button } from '@mui/material';
//
import Iconify from '../iconify';
import Image from '../image';
import EmptyImage from '../../assets/illustrations/WelcomeDogIllustration';

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  sx: PropTypes.object,
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
};

export default function EmptyContent({ title, description, isEmptyWallet, sx, ...other }) {
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
          <Link to="/dashboard/blank" sx={{ textDecoration: 'none', color: 'inherit' }}>
            <Button  disabled={Boolean(isEmptyWallet)} variant="contained" sx={{ textDecoration: 'none', mt:"15px" }}>
              Add Pets
            </Button>
          </Link>
        </>
      )}
    </Stack>
    </Card>

  );
}
