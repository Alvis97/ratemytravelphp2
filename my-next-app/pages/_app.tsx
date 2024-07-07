
import React from "react";
import HamburgerMenu from "../components/HamburgerMenu";
import Navigation from "../components/Navigation";
import Head from "next/head";
import '../styles/globals.scss'; 


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Rate My Travels</title>
        {/* Add any other global head tags here */}
      </Head>
      <Navigation/>
      <HamburgerMenu />
      <Component {...pageProps} />
    </>
  );
}
