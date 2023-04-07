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
  const { pet_passport_id, owner_id, metadata: { title, _description, media } } = product;
  
  const description = {
    "species": "dog",
    "breed": "Miniature American Shepherd",
    "life-stage": "adult"
  };



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
            {description.species}
          </Label>
        )}
        <StyledProductImg alt={title} src={media} />
      </Box>
      <Link color="inherit" underline="hover">
        <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
          {title}
        </Typography>
      </Link>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {description.breed}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3 }}>
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Follower
          </Typography>
          <Typography variant="subtitle1">{"5555"}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Following
          </Typography>

          <Typography variant="subtitle1">{"5555"}</Typography>
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.75, color: 'text.disabled' }}>
            Balance 
          </Typography>
          <Typography variant="subtitle1">
            {fCurrency("1")}
          </Typography>
        </div>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={["blue"]} />
          <Typography variant="subtitle1">
            {fCurrency("1")}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
