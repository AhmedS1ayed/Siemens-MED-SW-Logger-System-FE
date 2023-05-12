import React from "react";
import { cleanData } from '../../Utils/utilities';
export const NestButton = (props) =>{
    const item=props.item;
    const itemN=props.itemN;
  return (
         <div className="display: inline" style={{margin:"10px"}}><button className="results_btn" key={item} label={item} onClick = {() =>{props.handleKeyClicked(item)}}   >{cleanData(itemN)}</button>
                </div>
  );
};