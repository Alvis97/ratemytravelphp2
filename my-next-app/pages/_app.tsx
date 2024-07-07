
import HamburgerMenu from "@/components/HamburgerMenu";
import Navigation from "@/components/Navigation";
import "@/styles/globals.scss";
import Head from "next/head";

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
