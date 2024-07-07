import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import React from "react";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main>
        <div>
         
          <h1>Homepage</h1>
        </div>
      </main>
    </>
  );
}
