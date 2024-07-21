import React from "react";


//Style
import iconStyles from "../styles/components/icons.module.scss";

interface Props {
    className?: string;
    onClick?: () => void;
  }

function WorldMap(props: Props) {
    return (
      <div {...props}>
   
      </div>
    );
}

export{
  WorldMap
};