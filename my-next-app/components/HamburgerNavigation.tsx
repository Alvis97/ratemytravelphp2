// components/HamburgerNavigation.tsx
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';

// Style
import hamburgerStyle from "../styles/components/hamburgerMenu.module.scss";
import { LogoSmall } from './Icons';

const HamburgerNavigation = () => {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsHamburgerActive(!isHamburgerActive);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <nav className={hamburgerStyle.nav}>
      <div className={hamburgerStyle.parent}>
        <div className={hamburgerStyle.header}>
          <LogoSmall />
          <button
          className={`${hamburgerStyle.hamburger} ${isHamburgerActive ? hamburgerStyle.active : ''}`}
          onClick={toggleMenu}
          >
            <span className={hamburgerStyle.line}></span>
            <span className={hamburgerStyle.line}></span>
            <span className={hamburgerStyle.line}></span>
          </button>
        </div>
        <ul className={`${hamburgerStyle.ul} ${isMenuOpen ? hamburgerStyle.menuOpen : ''}`}>
          {session ? (
            <>
              <li>
                <Link href="/success" className={hamburgerStyle.link}>Community</Link>
              </li>
              <li>
                <Link href="/rateMyTravel" className={hamburgerStyle.link}>RateMyTravel</Link>
              </li>
              <li>
                <Link href="/account" className={hamburgerStyle.CFAButton}>Account</Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className={hamburgerStyle.linkBtn}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/" className={hamburgerStyle.link}>Home</Link>
              </li>
              <li>
                <Link href="/guidelines" className={hamburgerStyle.link}>Community Guidelines</Link>
              </li>
         
              <li>
                <Link href="/signup" className={hamburgerStyle.CFAButton}>Join Community</Link>
              </li>
              <li>
                <Link href="/login" className={hamburgerStyle.linkBtn}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default HamburgerNavigation;

