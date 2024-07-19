// components/Navigation.tsx
import React, { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import LoggedInNavigation from './LoggedInNavigation';
import LoggedOutNavigation from './LoggedOutNavigation';

interface NavigationProps {
  children: ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  console.log('isLoggedIn:', isLoggedIn); // Verify isLoggedIn value

  return (
    <>
      {isLoggedIn ? <LoggedInNavigation /> : <LoggedOutNavigation />}
      {children}
    </>
  );
};

export default Navigation;





