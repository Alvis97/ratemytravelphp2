import Link from "next/link";
import React, { useState } from "react";
import { LogoSmall } from "./Icons";
import Modal from "./Modal";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';

// Styles
import navigationStyle from "../styles/components/navigation.module.scss";

const LoggedInNavigation: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "signup">("login");
  const { logout } = useAuth();
  const router = useRouter();

  const openModal = (type: "login" | "signup") => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };  

  return (
    <>
      <div className={navigationStyle.parent}>
        <div className={navigationStyle.section1}>
          <LogoSmall />
          <ul className={navigationStyle.ul}>
            <li>
              <Link href="/" className={navigationStyle.link}>Community</Link>
            </li>
            <li>
              <Link href="/guidelines" className={navigationStyle.link}>RateMyTravel</Link>
            </li>
          </ul>
        </div>
        
        <div className={navigationStyle.section3}>
          <>
            <button onClick={handleLogout} className={navigationStyle.linkBtn}>Logout</button>
            <span className={navigationStyle.span}>|</span>
            <Link href="/profile" className={navigationStyle.CFAButton}>Account</Link>
          </>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <button onClick={closeModal} className={navigationStyle.exitBtn}>X</button>
          {modalType === "login" ? (
            <LoginForm closeModal={closeModal} />
          ) : (
            <SignUpForm closeModal={closeModal} />
          )}
        </Modal>
      )}
    </>
  );
};

export default LoggedInNavigation;
