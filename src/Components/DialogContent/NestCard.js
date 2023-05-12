import React from "react";
import { cleanData } from "../../Utils/utilities";
import { Card } from "@mui/material";
export const NestCard = (props) =>{
  return (
    <Card className="card" style={{border_raduis:"10px"}}>
    <div className="header">{cleanData(props.keyV)}</div>
    <div className={`header_detail ${props.expandedIndex === props.valueV ? "expanded" : ""}`}>
         <div className="header_detail2">{props.nestedData[props.keyV]}</div>
       </div>
    </Card> 
  );
};