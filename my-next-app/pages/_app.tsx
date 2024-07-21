// pages/_app.tsx
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import Navigation from '../components/Navigation';
import '../styles/globals.scss'; // Ensure you have this path correct

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Navigation />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;





