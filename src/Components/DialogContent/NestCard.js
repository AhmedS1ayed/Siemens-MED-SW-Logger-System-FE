import React from "react";
import { cleanData } from "../../Utils/utilities";
import { Card } from "@mui/material";
import "./NestCard.css";
export const NestCard = (props) =>{
  return (
    <Card className="card">
    <div className="header">{cleanData(props.keyV)}</div>
    <div className={`header_detail ${props.expandedIndex === props.valueV ? "expanded" : ""}`}>
         <div className="header_detail2">{props.nestedData[props.keyV]}</div>
       </div>
    </Card> 
  );
};