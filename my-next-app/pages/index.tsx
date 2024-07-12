import Head from "next/head";
import Image from "next/image";
import React from "react";
import { GlobeCover } from "../components/globeCover";
import Separation from "../components/Seperation";

//Style
import homeStyle from "../styles/pages/home.module.scss";
import Card from "../components/Card";
import { Globe, Mail, Talk, WorldMap } from "../components/Icons";
import Footer from "../components/Footer";



export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main>
        <div className={homeStyle.section1}>
          <div className={homeStyle.textSection}>
            <h1>Rate My Travel</h1>
            <p>A online travel community for Women, Non Binary and Transgender (MF & FM) </p>
          </div>
          <div className={homeStyle.ImageSection}>
             <GlobeCover/>
          </div>
        </div>

        <Separation/>

        <div className={homeStyle.section2}>
          <div className={homeStyle.CardParent}>
            <Talk/>
            <h3>Get support from our community</h3>
          </div>
          <div className={homeStyle.CardParent}>
            <Globe/>
            <h3>Add Countries in our travel tracker</h3>
          </div>
          <div className={homeStyle.CardParent}>
            <WorldMap/>
            <h3>Get recommendation on countries</h3>
          </div>
        </div>

        <Separation/>
        <div className={homeStyle.section3}>
        <Mail/>
          <div className={homeStyle.MailDiv}>
             <h2>Join our email list and get the newest updates!</h2>
             <form action="">
              <input type="email" name="email" id="email" placeholder="example@hotmail.com" className={homeStyle.input} /><br />
              <button className={homeStyle.CFAButton}>Join Email-List</button>
             </form>
          </div>
        </div>

        <Separation/>

        <Footer/>

      </main>
    </>
  );
}
