import React from "react";

import authenticationCardStyle from "../styles/components/authenticationCard.module.scss";
import backgroundStyle from "../styles/components/background.module.scss";
import { LogoLarge } from "./Icons";

function AuthenticationCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${authenticationCardStyle.container} ${backgroundStyle.themeAnimatedGradient6}`}
    >
      <section className={`${authenticationCardStyle.left}`}>
        {/* <LogoIcon className={authenticationCardStyle.logoIcon} /> */}
        <div className={authenticationCardStyle.name}>
          <span>visualize it</span>
          <span>plan it</span>
          <span>&</span>
          <span className={authenticationCardStyle.logoName}>Stick to it</span>
        </div>
        <div className={authenticationCardStyle.logo}>
          <LogoLarge />
        </div>
      </section>
      <section className={authenticationCardStyle.right}>{children}</section>
    </div>
  );
}

export default AuthenticationCard;