// pages/_app.tsx
import React from 'react';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import Navigation from '../components/Navigation';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Navigation />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;

