import Link from "next/link";
import React, { useState } from "react";
import navigationStyle from "../styles/components/navigation.module.scss";
import { LogoSmall } from "./Icons";
import Modal from "./Modal";


const Navigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup">("login");

  const openModal = (type: "login" | "signup") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={navigationStyle.parent}>
        <div className={navigationStyle.section1}>
          <ul className={navigationStyle.ul}>
            <li><Link href="/" className={navigationStyle.link}>Home</Link></li>
            <li><Link href="/about" className={navigationStyle.link}>About</Link></li>
            <li><Link href="/features" className={navigationStyle.link}>Features</Link></li>
          </ul>
        </div>
        
        <div className={navigationStyle.section2}>
          <Link href="/" className={navigationStyle.logo}>
            <LogoSmall />
          </Link>
        </div>

        <div className={navigationStyle.section3}>
          <button onClick={() => openModal("login")} className={navigationStyle.linkBtn}>Login</button>
          <span className={navigationStyle.span}>|</span>
          <button onClick={() => openModal("signup")} className={navigationStyle.CFAButton}>
            Join Community
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <button onClick={closeModal} className={navigationStyle.exitBtn}>X</button>
          {modalType === "login" ? (
            <>
              <h1 className={navigationStyle.h1}>Login</h1>
              <form action="">
                <label htmlFor="email">Email</label><br />
                <input type="text" name="email" id="email" placeholder="example@hotmail.com" /><br />
                <label htmlFor="pwd">Password</label><br />
                <input type="password" name="pwd" id="pwd" placeholder="*********" /><br />
                <button type="submit" className={navigationStyle.CFAButton}>
                  Login
                </button>
              </form>
              <div className={navigationStyle.socials}>
                <p className={navigationStyle.para}>Or Login With</p><br />
                <div className={navigationStyle.socialIcons}>
                  <button>Icon</button>
                  <button>Icon</button>
                </div>
                <p className={navigationStyle.para}>No Account?</p>
                <button onClick={() => openModal("signup")} className={navigationStyle.signUp}>Sign Up</button><br />
              </div>
            </>
          ) : (
            <>
              <h1 className={navigationStyle.h1}>Sign Up</h1>
              <form action="">
                <label htmlFor="fName">Name</label><br />
                <input type="text" name="fName" id="fName" placeholder="Sam" /><br />
                <label htmlFor="lName">Lastname</label><br />
                <input type="text" name="lName" id="lName" placeholder="Borg" /><br />
                <label htmlFor="age">Age</label><br />
                <input type="text" name="age" id="age" placeholder="22" /><br />
                <label htmlFor="gender">Gender</label><br />
                <select name="gender" id="gender">
                  <option value="cis-woman">Cis woman</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="trans-m-f">Transgender (M-F)</option>
                  <option value="trans-f-m">Transgender (F-M)</option>
                  <option value="queer">Queer</option>
                  <option value="other">Other</option>
                </select><br />
                <label htmlFor="email">Email</label><br />
                <input type="text" name="email" id="email" placeholder="example@hotmail.com" /><br />
                <label htmlFor="pwd">Password</label><br />
                <input type="password" name="pwd" id="pwd" placeholder="*********" /><br />
                <button type="submit" className={navigationStyle.CFAButton}>
                  Sign Up
                </button>
              </form>
              <div className={navigationStyle.socials}>
                <p className={navigationStyle.para}>Or Sign Up With</p><br />
                <div className={navigationStyle.socialIcons}>
                  <button>Icon</button>
                  <button>Icon</button>
                </div>
                <p className={navigationStyle.para}>Already have an account?</p>
                <button onClick={() => openModal("login")} className={navigationStyle.signUp}>Login</button><br />
              </div>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Navigation;

