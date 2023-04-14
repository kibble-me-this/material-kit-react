import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

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
  // const { name, cover, price, colors, status, priceSale } = product;
  // const { pet_passport_id, owner_id, metadata: { title, _description, media } } = product;

  const data = {
    "pet_passport_id": "2ed23244b32ae571885d8a98da9fbc8b23b64392109298275504cc68857a0868-Cyber Dog",
    "metadata": {
      "title": "Cyber Dog",
      "description": "{\"species\": \"Dog\", \"breed\": \"Sheperd\", \"life-stage\": \"adult\"}",
      "media": "https://ipfs.io/ipfs/Qmf3uctAUYBg56fcLxDr3Updda5F76bWaW1t7hfPfWtgz5"
    },
    "pet_owner_id": "2ed23244b32ae571885d8a98da9fbc8b23b64392109298275504cc68857a0868"
  };

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
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {title && (
          <Label
            variant="filled"
            color={(title === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            Snout Check: i'm a {species}
          </Label>
        )}
        <StyledProductImg alt={title} src={media} />
      </Box>
      <Link color="inherit" underline="hover">
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {title}
        </Typography>
      </Link>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
        {breed}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Gender
          </Typography>
          <Typography variant="caption">{gender}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Life Stage
          </Typography>

          <Typography variant="caption">{lifeStage}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Rewards 
          </Typography>
          <Typography variant="caption">
            50 KBL
          </Typography>
        </div>
      </Box>

    </Card>
  );
}
