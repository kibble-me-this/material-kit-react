import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Typography, Stack, Divider } from '@mui/material';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import { bgBlur } from '../../../utils/cssStyles';

// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledCard = styled(Card)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.pink }),
  position: 'relative',
  width: '100%',
  height: '100%',
  transformStyle: 'preserve-3d',
  transition: 'transform 0.6s',
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

const styles = {
  flipCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 16,
  },
  flipCardFront: {
    backgroundColor: '#bbb',
    color: 'black',
    zIndex: 2,
  },
  flipCardBack: {
    backgroundColor: '#2980b9',
    color: 'white',
    transform: 'rotateY(180deg)',
    zIndex: 1,
  },
};

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

function FrontCard() {
  return (
    <Box className={styles.flipCardFront}>
      <Typography variant="subtitle2">Front Card</Typography>
    </Box>
  );
}

function BackCard() {
  return (
    <Box className={styles.flipCardBack}>
      <Typography variant="subtitle2">Back Card</Typography>
    </Box>
  );
}

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

  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };


  return (
    <StyledCard sx={{ textAlign: 'center' }}>
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
  
      {/* Front Card 
      <Box className={`${styles.flipCard} ${flipped ? styles.flipCardBack : styles.flipCardFront}`} onClick={handleFlip}>
        <Typography variant="subtitle2">Front Card</Typography>
      </Box> */}
  
      {/* Back Card 
      <Box className={`${styles.flipCard} ${flipped ? styles.flipCardFront : styles.flipCardBack}`} onClick={handleFlip}>
        <Typography variant="subtitle2">Back Card</Typography>
      </Box> */}
  
    </StyledCard>
  );
  
}  