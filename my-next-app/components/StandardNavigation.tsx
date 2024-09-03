// components/StandardNavigation.tsx
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { LogoSmall, Star } from './Icons';

//Style
import navigationStyle from "../styles/components/navigation.module.scss";


const StandardNavigation = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      {session ? (
        <>
            <div className={navigationStyle.parent}>
                <div className={navigationStyle.section1}>
                  <LogoSmall />
                  <ul className={navigationStyle.ul}>
                    <li>
                      <Link href="/success" className={navigationStyle.link}>Community</Link>
                    </li>
                    <li>
                      <Link href="/rateMyTravel" className={navigationStyle.link}>RateMyTravel</Link>
                    </li>
                  </ul>
                </div>
                
                <div className={navigationStyle.section3}>
                  <>
                    <button 
                    onClick={() => signOut({ callbackUrl: '/' })} 
                    className={navigationStyle.linkBtn}>
                      Logout
                    </button>
                    <span className={navigationStyle.span}>|</span>
                    <Link href="/account" className={navigationStyle.CFAButton}>Account</Link>
                  </>
                </div>
            </div>
        </>
      ) : (
        <>
          <div className={navigationStyle.parent}>
              <div className={navigationStyle.section1}>
                <LogoSmall />
                <ul className={navigationStyle.ul}>
                  <li>
                    <Link href="/" className={navigationStyle.link}>Home</Link>
                  </li>
                  <li>
                    <Link href="/guidelines" className={navigationStyle.link}>Community Guidelines</Link>
                  </li>
                </ul>
              </div>
              
              <div className={navigationStyle.section3}>
                <>
                <Link href="/login" className={navigationStyle.linkBtn}>Login</Link>
                  <span className={navigationStyle.span}>|</span>
                  <Link href="/signup" className={navigationStyle.CFAButton}> <Star/> Community</Link>
                </>
              </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default StandardNavigation;







