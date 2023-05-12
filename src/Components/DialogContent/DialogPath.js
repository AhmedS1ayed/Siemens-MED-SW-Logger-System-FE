import React from 'react';
  
  export const DialogPath = (props) =>{
    return(<div style={{ padding: "10px", fontWeight: "bold", fontSize: "16px" }}>
    {/* what to put instead of the id ? */}
    {props.path.join(" > ")}
  </div>);
  }