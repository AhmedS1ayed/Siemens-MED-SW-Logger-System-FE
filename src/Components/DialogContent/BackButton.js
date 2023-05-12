import React from "react";
import "./Button.css";
export const BackButton = (props) =>{
  return (
         <div style={{paddingBottom:"10px"}}  >
              {props.stack.length > 1 ? (<button className="btn" key='back' label='back' onClick = {props.handleBackward} style={{margin:'10'}}> ← </button>) : <></>}
              </div>
  );
};