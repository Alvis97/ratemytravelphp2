import React, { useState } from "react";
import { Hamburger, LogoSmall } from "./Icons";
import Link from "next/link";
import hamburgerMenuStyle from "../styles/components/hamburgerMenu.module.scss";

function HamburgerMenu() {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className={hamburgerMenuStyle.parent}>
      <div className={hamburgerMenuStyle.section1}>
        <button className={hamburgerMenuStyle.hamburger} onClick={toggleDropdown}>
          <Hamburger />
        </button>
        {dropdownVisible && (
          <div className={hamburgerMenuStyle.dropdown}>
            <ul>
              <li><Link className={hamburgerMenuStyle.dropLink} href="/">Home</Link></li>
              <li><Link className={hamburgerMenuStyle.dropLink} href="/">About</Link></li>
              <li><Link className={hamburgerMenuStyle.dropLink} href="/">Features</Link></li>
              <li><Link className={hamburgerMenuStyle.dropLink} href="/">Log in</Link></li>
              <li><Link className={hamburgerMenuStyle.dropLink} href="/">Sign up</Link></li>
            </ul>
          </div>
        )}
      </div>
      <div className={hamburgerMenuStyle.section2}>
        <Link href="/"><LogoSmall /></Link>
      </div>
    </div>
  );
}

export default HamburgerMenu;
