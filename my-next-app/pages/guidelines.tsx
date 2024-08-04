import Head from "next/head";
import React from "react";
import Footer from "../components/Footer";
import Separation from "../components/Seperation";

//Style
import guidelineStyles from "../styles/pages/guidelines.module.scss";


export default function Guidelines() {
  
  return (
    <>
      <Head>
        <title>Guidelines</title>
      </Head>
      <main>
        <div className={guidelineStyles.parent}>
        <h1>Community Guidelines</h1>
        <p>This community is created for Women, non-binary, trans-woman, trans-men. Everyone who is included in this description are here together, and no discrimination is acceptable.  Therefore we ask you to follow these guidelines:</p>
        
        <h2>Respect All Members:</h2>
        <ul>
          <li>Treat everyone with kindness and respect.</li>
          <li> No hate speech, discrimination, or harassment will be tolerated.</li>
          <li>Address others using their preferred names and pronouns</li>
        </ul>

        <h2>Zero Tolerance for Discrimination:</h2>
        <ul>
          <li>Any form of discrimination based on gender, sexual orientation, race, ethnicity, religion, disability, or any other characteristic is strictly prohibited.</li>
          <li>Report any discriminatory behavior to the moderators immediately.</li>
        </ul>

        <h2>Safe Space:</h2>
        <ul>
          <li>This is a safe space for all members. Ensure that your contributions are supportive and encouraging.</li>
          <li>Avoid making assumptions about anyone’s identity or experiences.</li>
        </ul>

        <h2>Constructive Communication:</h2>
        <ul>
          <li>Engage in constructive and meaningful discussions.</li>
          <li>When disagreeing, do so respectfully and focus on the issue, not the person.</li>
        </ul>

        <h2>Support and Empower:</h2>
        <ul>
          <li>Offer support and encouragement to other members.</li>
          <li>Share resources and information that can help others.</li>
        </ul>

        <h2>No Trolling or Bullying:</h2>
        <ul>
          <li>Trolling, bullying, and inflammatory comments are not allowed.</li>
          <li>Refrain from posting content intended to provoke a negative response.</li>
        </ul>

        <h2>Be Mindful of Language:</h2>
        <ul>
          <li>Avoid using jargon or acronyms that might not be understood by everyone.</li>
          <li>Strive to use language that is inclusive and welcoming to all members.</li>
        </ul>

        <h2>Feedback and Improvement:</h2>
        <ul>
          <li>Provide constructive feedback to help improve the community.</li>
          <li>Be open to feedback from others and use it to grow and enhance the community.</li>
        </ul>

        <h2>Active Participation:</h2>
        <ul>
          <li>Participate actively and positively in community activities and discussions.</li>
          <li>Share your experiences and insights, and support others in doing the same.</li>
        </ul>

        <Separation/>
      
        
        </div>
        <Footer/>
      
       
      </main>
    </>
  );
}