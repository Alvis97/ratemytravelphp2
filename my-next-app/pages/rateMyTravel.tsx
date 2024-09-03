
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { WorldMap } from "../components/WorldMap";
import { useRouter } from "next/router";
import { RateMyTravelFormData, RateMyTravelFormErrors, validateRateMyTravelForm } from "../utils/formValidation";
import user from "./api/user";
import { report } from "process";
import  Module  from "../components/Modal";

// Style
import RMTStyle from "../styles/pages/rmt.module.scss";
import { StarsRating } from "../components/LoginImage";
import { useSession } from "next-auth/react";


export default function RateMyTravel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  // Function to open modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Redirect to login page if the session is not available
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Return null or a loading indicator while redirecting
  if (status === 'loading' || status === 'unauthenticated') {
    return <div>Loading...</div>;
  }


  
  
  return (
    <>
      <Head>
        <title>Homepage</title>
      </Head>
      <main>
        <div className={RMTStyle.parent}>
          {/**
           *    <div className={RMTStyle.warning}>
          <h1 className={RMTStyle.warningText}>This page is still in the making, It will work soon</h1> 
          </div>
          */}
     


            <div className={RMTStyle.MapDiv}>
              <WorldMap/>
            </div>

            <div  className={RMTStyle.RateDiv}>
            <button 
            className={RMTStyle.CFAButton2}
            onClick={openModal}
            >
              <StarsRating/>
            </button>
            </div>

            {isModalOpen && (
              <Module onClose={closeModal}>
              <div className={RMTStyle.overlay}>
                <div className={RMTStyle.modal}>
                  <button className={RMTStyle.closeButton} onClick={closeModal}>
                    &times;
                  </button>
               
                    <form>
                      <h1 className={RMTStyle.h1}>Add a new country</h1>
                      <div className={RMTStyle.hideDiv}>

                        <select
                          className={RMTStyle.select}
                        name="countryId"
                      
                      >
                        <option value="">Find Country</option>
                        <option value="AE">United Arab Emirates</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AL">Albania</option>
                        <option value="AM">Armenia</option>
                        <option value="AO">Angola</option>
                        <option value="AR">Argentina</option>
                        <option value="AT">Austria</option>
                        <option value="AU">Australia</option>
                        <option value="AZ">Azerbaijan</option>

                        <option value="BA">Bosnia and Herzegovina</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BE">Belgium</option>
                        <option value="BF">Burkina Faso</option>
                        <option value="BG">Bulgaria</option>
                        <option value="BI">Burundi</option>
                        <option value="BJ">Benin</option>
                        <option value="BN">Brunei Darussalam</option>
                        <option value="BO">Bolivia</option>
                        <option value="BR">Brazil</option>

                        <option value="CA">Canada</option>
                        <option value="CD">Democratic Republic of Congo</option>
                        <option value="CF">Central African Republic</option>
                        <option value="CG">Republic of Congo</option>
                        <option value="CH">Switzerland</option>
                        <option value="CI">Côte d&apos;Ivoire</option>
                        <option value="BJ">Chile</option>
                        <option value="CM">Cameroon</option>
                        <option value="CN">China</option>
                        <option value="CO">Colombia</option>
                        <option value="CR">Costa Rica</option>
                        <option value="CU">Cuba</option>
                        <option value="CZ">Czechia</option>

                        <option value="DE">Germany</option>
                        <option value="DJ">Djiboti</option>
                        <option value="DK">Denmark</option>
                        <option value="DO">Dominican Republic</option>
                        <option value="DZ">Algeria</option>

                        <option value="EC">Ecuador</option>
                        <option value="EE">Estonia</option>
                        <option value="EG">Egypt</option>
                        <option value="EH">Western Sahara</option>
                        <option value="ER">Eritrea</option>
                        <option value="ES">Spain</option>
                        <option value="ET">Ethiopia</option>

                        <option value="FK">Falkland Islands</option>
                        <option value="FI">Finland</option>
                        <option value="FJ">Fiji</option>
                        <option value="FR">France</option>

                        <option value="GA">Gabon</option>
                        <option value="GB">United Kingdom</option>
                        <option value="GE">Georgia</option>
                        <option value="GF">French Guiana</option>
                        <option value="GH">Ghana</option>
                        <option value="GL">Greenland</option>
                        <option value="GM">Gambia</option>
                        <option value="GN">Guinea</option>
                        <option value="GQ">Equatorial Guinea</option>
                        <option value="GR">Greece</option>
                        <option value="GT">Guatemala</option>
                        <option value="GW">Guinea-Bissau</option>
                        <option value="GY">Guyana</option>

                        <option value="HN">Honduras</option>
                        <option value="HR">Croatia</option>
                        <option value="HT">Haiti</option>
                      
                        <option value="ID">Indonesia</option>
                        <option value="IE">Ireland</option>
                        <option value="IL">Israel</option>
                        <option value="IN">India</option>
                        <option value="IQ">Iraq</option>
                        <option value="IR">Iran</option>
                        <option value="IS">Iceland</option>
                        <option value="IT">Italy</option>

                        <option value="JM">Jamaica</option>
                        <option value="JO">Jordan</option>
                        <option value="JP">Japan</option>

                        <option value="KE">Kenya</option>
                        <option value="KG">Kyrgyzstan</option>
                        <option value="KH">Cambodia</option>
                        <option value="KP">North Korea</option>
                        <option value="KR">South Korea</option>
                        <option value="XK">Kosovo</option>
                        <option value="KW">Kuwait</option>
                        <option value="KZ">Kazakhstan</option>

                        <option value="LA">Lao People&apos;s Democratic Republic</option>
                        <option value="LB">Lebanon</option>
                        <option value="LK">Sri Lanka</option>
                        <option value="LR">Liberia</option>
                        <option value="LS">Lesotho</option>
                        <option value="LT">Lithuania</option>
                        <option value="LU">Luxembourg</option>
                        <option value="LV">Latvia</option>
                        <option value="LY">Libya</option>
                      
                        <option value="MA">Morocco</option>
                        <option value="MD">Moldova</option>
                        <option value="ME">Montenegro</option>
                        <option value="MG">Madagascar</option>
                        <option value="MK">Macedonia</option>
                        <option value="ML">Mali</option>
                        <option value="MM">Myanmar</option>
                        <option value="MN">Mongolia</option>
                        <option value="MR">Mauritania</option>
                        <option value="MW">Malawi</option>
                        <option value="MX">Mexico</option>
                        <option value="MY">Malaysia</option>
                        <option value="MZ">Mozambique</option>

                        <option value="NA">Namibia</option>
                        <option value="NC">New Caledonia</option>
                        <option value="NE">Niger</option>
                        <option value="NG">Nigeria</option>
                        <option value="NI">Nicaragua</option>
                        <option value="NL">Netherlands</option>
                        <option value="NO">Norway</option>
                        <option value="NP">Nepal</option>
                        <option value="NZ">New Zealand</option>

                        <option value="OM">Oman</option>

                        <option value="PA">Panama</option>
                        <option value="PE">Peru</option>
                        <option value="PG">Papua New Guinea</option>
                        <option value="PH">Philippines</option>
                        <option value="PL">Poland</option>
                        <option value="PK">Pakistan</option>
                        <option value="PR">Puerto Rico</option>
                        <option value="PS">Palestinian Territories</option>
                        <option value="PT">Portugal</option>
                        <option value="PY">Paraguay</option>

                        <option value="QA">Qatar</option>

                        <option value="RO">Romania</option>
                        <option value="RS">Serbia</option>
                        <option value="RU">Russia</option>
                        <option value="RW">Rwanda</option>

                        <option value="SA">Saudi Arabia</option>
                        <option value="SB">Solomon Islands</option>
                        <option value="SD">Sudan</option>
                        <option value="SE">Sweden</option>
                        <option value="SI">Slovenia</option>
                        <option value="SJ">Svalbard and Jan Mayen</option>
                        <option value="SK">Slovakia</option>
                        <option value="SL">Sierra Leone</option>
                        <option value="SN">Senegal</option>
                        <option value="SO">Somalia</option>
                        <option value="SR">Suriname</option>
                        <option value="SS">South Sudan</option>
                        <option value="SV">El Salvador</option>
                        <option value="SY">Syria</option>
                        <option value="SZ">Swaziland</option>

                        <option value="TD">Chad</option>
                        <option value="TF">French Southern and Antarctic Lands</option>
                        <option value="TG">Togo</option>
                        <option value="TH">Thailand</option>
                        <option value="TJ">Tajikistan</option>
                        <option value="TL">Timor-Leste</option>
                        <option value="TM">Turkmenistan</option>
                        <option value="TN">Tunisia</option>
                        <option value="TR">Turkey</option>
                        <option value="TT">Trinidad and Tobago</option>
                        <option value="TW">Taiwan</option>
                        <option value="TZ">Tanzania</option>

                        <option value="UA">Ukraine</option>
                        <option value="UG">Uganda</option>
                        <option value="US">United States</option>
                        <option value="UY">Uruguay</option>
                        <option value="UZ">Uzbekistan</option>
                        <option value="VE">Venezuela</option>
                        <option value="VN">Vietnam</option>
                        <option value="VU">Vanuatu</option>
                        <option value="YE">Yemen</option>
                        <option value="AE">South Africa</option>
                        <option value="ZM">Zambia</option>
                        <option value="ZW">Zimbabwe</option>        
                      </select><br />

                      <label className={RMTStyle.label} htmlFor="">Give rating:</label><br />
                      <div className={RMTStyle.starRating}>

                      <div className={RMTStyle.starDiv}>
                            <label className={RMTStyle.starLabel}>
                              <input
                                type="radio"
                                name="star"
                                value="star1.jpg"
                            
                              />
                              <img className={RMTStyle.star} src="/images/star1.jpg" alt="Star 1" /> 
                            </label>
                            <label className={RMTStyle.starLabel}>
                              <input
                                type="radio"
                                name="star"
                                value="star2.jpg"
                            
                              />
                              <img className={RMTStyle.star} src="/images/star2.jpg" alt="Star 2" /> 
                            </label>

                            <label className={RMTStyle.starLabel}>
                              <input
                                type="radio"
                                name="star"
                                value="star3.jpg"
                              
                              />
                              <img className={RMTStyle.star} src="/images/star3.jpg" alt="Star 3" /> 
                            </label>

                            <label className={RMTStyle.starLabel}>
                              <input
                                type="radio"
                                name="star"
                                value="star4.jpg"
                              
                              />
                              <img className={RMTStyle.star} src="/images/star4.jpg" alt="Star 4" /> 
                            </label>

                            <label className={RMTStyle.starLabel}>
                              <input
                                type="radio"
                                name="star"
                                value="star5.jpg"
                              
                              
                              />
                              <img className={RMTStyle.star} src="/images/star5.jpg" alt="Star 5" /> 
                            </label> <br />
                          {/* {errors.rating && <p className={RMTStyle.error}>{errors.rating}</p>}*/}

                          </div>
                <br />
            </div>

          <button type="submit" className={RMTStyle.CFAButton} >+Add Country</button>
          </div>
          </form>
        </div>
        </div>
        </Module>
      )}

      </div>
      </main>
    </>
  );

}







