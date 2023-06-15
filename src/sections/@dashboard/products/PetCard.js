import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Typography, Stack, Divider, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

// utils
import { fCurrency } from '../../../utils/formatNumber';
import { bgBlur } from '../../../utils/cssStyles';

// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import Iconify from '../../../components/iconify';






// ----------------------------------------------------------------------

const StyledCard = styled(Card)(({ theme }) => ({
  ...bgBlur({ color: "#FFFFFF" }),
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
  boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
  '&.flipped': {
    transform: 'rotateY(180deg)',
  },
}));

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const data2 ={
    "pet_passport_id": "2ed23244b32ae571885d8a98da9fbc8b23b64392109298275504cc68857a0868-Gigi9998",
    "metadata": {
      "title": "Gigi9998",
      "description": "{\"species\": \"Dog\", \"breed\": \"Shih Tzu\", \"life-stage\": \"puppy\"}",
      "media": "https://ipfs.io/ipfs/QmTd9qqHLzTZmRXSkoDFvT3TcjTMyJWv19nhUh1JhGgHkg"
    },
    "pet_owner_id": "2ed23244b32ae571885d8a98da9fbc8b23b64392109298275504cc68857a0868"
  }

  const { pet_passport_id, metadata, pet_owner_id } = product;
  const { title, description, media } = metadata;
  const { species, gender, breed, "life-stage": lifeStage } = JSON.parse(description);

  return (
    <StyledCard sx={{ textAlign: 'center' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {title && (
          <Label
            variant="caption"
            color={(title === 'sale' && 'error') || 'info'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2px', // Adjust the gap as needed
              position: 'absolute',
              height: '40px', // Adjust the height as needed
              right: '16px',
              top: '16px',
              background: 'rgba(255, 255, 255, 0.8)',
              border: '1px solid #CED4DA',
              borderRadius: '8px',
              zIndex: 9,
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '14px',
              textAlign: 'center',
              letterSpacing: '0.01em',
              color: '#343A40',
              padding: '0 8px', // Adjust the padding as needed
            }}
        >
        <Typography variant="caption" sx={{ fontSize: '8px' }}>REWARDS</Typography>
        <Typography variant="caption" sx={{ fontSize: '8px', fontWeight: 400 }}>100 KBL</Typography>
      </Label>


          )}
        <StyledProductImg alt={title} src={media} />
      </Box>

      <Box sx={{ mx: 3 }}>
        <Box sx={{ textAlign: 'left', pb: 3 }}>
          <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5, color: '#2C4CFF' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {breed}
          </Typography>
        </Box>
        <Box sx={{ pb: 3, marginLeft: -3, marginRight: -3 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, textTransform: 'uppercase' }}>
                Gender
              </Typography>
              <Typography variant="value">{gender}</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, textTransform: 'uppercase' }}>
                Life Stage
              </Typography>
              <Typography variant="value">{lifeStage}</Typography>
            </div>

            <div>
              <Typography variant="caption" component="div" sx={{ mb: 0.75, textTransform: 'uppercase' }}>
                Weight
              </Typography>
              <Typography variant="value">TBD</Typography>
            </div>
          </Box>
        </Box>
        <Box sx={{ marginBottom: 3 }}>
        <Button
          variant="contained"
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '8px 12px',
            border: '1px solid #64748B',
            borderRadius: 1,
            backgroundColor: 'transparent',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: 12,
            lineHeight: '18px',
            textAlign: 'center',
            color: '#64748B',
            textDecoration: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LockIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2">View Details</Typography>
          </Box>
        </Button>


        </Box>
      </Box>
    </StyledCard>
  );
  
}  