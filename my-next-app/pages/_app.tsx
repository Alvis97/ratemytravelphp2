// pages/_app.tsx

import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.scss'; // Import global styles here
import { AuthProvider } from '../context/AuthContext';
import Navigation from '../components/Navigation';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </AuthProvider>
  );
}

export default MyApp;




