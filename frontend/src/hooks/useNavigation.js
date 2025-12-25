import { useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../api';

export const useNavigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const getCurrentPageName = () => {
    return NAV_ITEMS.find((item) => item.path === location.pathname)?.name || 'Miller Land Management';
  };

  return {
    currentPath: location.pathname,
    isActive,
    getCurrentPageName,
    navItems: NAV_ITEMS,
  };
};