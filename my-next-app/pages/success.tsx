import React from "react";
import Head from "next/head";
import Post from "../components/Post";

//Style
import SuccessStyle from "../styles/pages/success.module.scss";

export default function Success() {
    return(
        <>
        <Head>
           <title>Success</title>
        </Head>
        <main>
            <div className={SuccessStyle.Parent}>
                <div className={SuccessStyle.child} >

                </div>
            </div>
        </main>
        </>
    );
}

