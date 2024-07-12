import React, { useState } from "react";
import componentStyle from "../styles/components/components.module.scss";

function Separation() {

  return (
    <div className={componentStyle.SeparationParent}>
       <div  className={componentStyle.line}></div>
       <div  className={componentStyle.line2}></div>
    </div>
  );
}

export default Separation;