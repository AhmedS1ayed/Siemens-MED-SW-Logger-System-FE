import React from "react";

export const BackButton = (props) =>{
  return (
         <div style={{paddingBottom:"10px"}}  >
              {props.stack.length > 1 ? (<button className="results_btn" key='back' label='back' onClick = {props.handleBackward} style={{margin:'10'}}> ← </button>) : <></>}
              </div>
  );
};