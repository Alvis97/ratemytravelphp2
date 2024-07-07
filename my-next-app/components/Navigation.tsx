import Link from "next/link";
import React, { useState } from "react";
import { LogoSmall } from "./Icons";
import Modal from "./Modal";
import LoginForm from "./LoginForm";

//Styles
import navigationStyle from "../styles/components/navigation.module.scss";
import SignUpForm from "./SignUpForm";



//modal that is opening for login and signup
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
              <LoginForm/>
            </>
          ) : (
            <>
              <SignUpForm/>
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Navigation;

