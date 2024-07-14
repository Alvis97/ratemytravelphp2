// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss'; // Import global styles here
import LoggedInNavigation from '../components/LoggedInNavigation';
import LoggedOutNavigation from '../components/LoggedOutNavigation';
import { AuthProvider, useAuth } from '../context/AuthContext';

const AppWrapper = ({ Component, pageProps, router }: AppProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      {isLoggedIn ? <LoggedInNavigation /> : <LoggedOutNavigation />}
      <Component {...pageProps} />
    </div>
  );
};

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <AuthProvider>
      <AppWrapper Component={Component} pageProps={pageProps} router={router}/>
    </AuthProvider>
  );
}

export default MyApp;
