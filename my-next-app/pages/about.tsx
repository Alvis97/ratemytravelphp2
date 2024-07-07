import Head from "next/head";
import React from "react";
import HamburgerMenu from "@/components/hamburgerMenu";

export default function About() {
  
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
         <HamburgerMenu/>
      <main>
        <h1>About</h1>
       
      </main>
    </>
  );
}