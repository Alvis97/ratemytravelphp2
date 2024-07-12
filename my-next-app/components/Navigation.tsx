import Link from "next/link";
import React, { useState } from "react";
import { LogoSmall } from "./Icons";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useAuth } from '../context/AuthContext';

//Styles
import navigationStyle from "../styles/components/navigation.module.scss";


//modal that is opening for login and signup
const Navigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup">("login");
  const { isLoggedIn, logout } = useAuth();

  const openModal = (type: "login" | "signup") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={navigationStyle.parent}>
        <div className={navigationStyle.section1}>
        <LogoSmall />
          <ul className={navigationStyle.ul}>
            <li><Link href="/" className={navigationStyle.link}>Home</Link></li>
            <li><Link href="/guidelines" className={navigationStyle.link}>Community Guidelines</Link></li>
          </ul>
        </div>
        
      

        <div className={navigationStyle.section3}>
          {isLoggedIn ? (
            <>
              <button onClick={logout} className={navigationStyle.linkBtn}>Logout</button>
              <span className={navigationStyle.span}>|</span>
              <Link href="/profile" className={navigationStyle.CFAButton}>Account</Link>
            </>
          ) : (
            <>
              <button onClick={() => openModal('login')} className={navigationStyle.linkBtn}>Login</button>
              <span className={navigationStyle.span}>|</span>
              <button onClick={() => openModal('signup')} className={navigationStyle.CFAButton}>
                Join Community
              </button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <button onClick={closeModal} className={navigationStyle.exitBtn}>X</button>
          {modalType === "login" ? (
              <LoginForm closeModal={closeModal} />
            
          ) : (
            <>
              <SignUpForm closeModal={closeModal} />
            </>
          )}
        </Modal>
      )}
    </>
  );
};

export default Navigation;

