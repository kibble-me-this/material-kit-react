import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function ProductList({ products, pets, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {pets.map((pet) => (
        <Grid key={pet.pet_passport_id} item xs={12} sm={6} md={4}>
          <ShopProductCard product={pet} />
        </Grid>
      ))}
    </Grid>    
  );
}
