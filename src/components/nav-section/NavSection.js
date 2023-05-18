import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

NavSection.propTypes = {
  data: PropTypes.array,
  handleLogout: PropTypes.func,
};

export default function NavSection({ data = [], handleLogout, ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 2.5 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} handleLogout={handleLogout} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
  handleLogout: PropTypes.func,
};

function NavItem({ item, handleLogout }) {
  const { title, path, icon, info, disabled } = item;

  const handleClick = () => {
    if (title === 'Logout') {
      handleLogout();
    }
  };  

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      disabled={disabled}
      onClick={handleClick}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemText
        disableTypography
        primary={title}
        sx={{
          color: '#343A40',
          fontWeight: 700,
          fontSize: 14,
          lineHeight: '22px',
        }}
      />
      {info && info}
    </StyledNavItem>
  );
}
