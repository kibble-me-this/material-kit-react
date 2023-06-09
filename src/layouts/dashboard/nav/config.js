import { useNavigate } from 'react-router-dom';
import { magic } from '../../../magic';

// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// component
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  {
    title: 'Pets',
    path: '/dashboard/pets',
    icon: icon('ic_user'),
  },
  {
    title: 'Food',
    path: '/dashboard/membership',
    icon: icon('ic_invoice'),
    disabled: true,
  },
  {
    title: 'Insurance',
    path: '/dashboard/membership',
    icon: icon('ic_file'),
    disabled: true,
  },
  {
    title: 'Rewards',
    path: '/dashboard/rewards',
    icon: icon('ic_cart'),
    disabled: true,
  },
  {
    title: 'Membership',
    path: '/dashboard/membership',
    icon: icon('ic_blog'),
    disabled: true,
  },
  {
    title: 'Integrations',
    path: '/dashboard/integrations',
    icon: icon('ic_lock'),
    disabled: true,
  },
];

const navConfig2 = [
  {
    title: 'Your Pet Wallet',
    path: '/dashboard/membership',
    icon: icon('ic_invoice'),
    disabled: true,
  },
  {
    title: 'Logout',
    path: '/login',
    icon: icon('ic_file'),
    disabled: false,
  },
];

const logout = async (navigate) => {
  try {
    await magic.user.logout();
    navigate('/login', { replace: true });
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export { navConfig, navConfig2, logout };
