import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
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
    <Card>
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

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </Link>

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
