// pages/_app.tsx
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.scss'; // Ensure you have this path correct
import NavigationWrapper from '../components/NavigationWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <NavigationWrapper />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;





