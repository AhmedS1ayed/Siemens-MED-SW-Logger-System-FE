import React from "react";
import { cleanData } from "../../Utils/utilities";
import { Card } from "@mui/material";
import "./NestCard.css";
export const NestCard = (props) =>{
  return (
    <Card sx={{
      bgcolor: 'background.paper',
      boxShadow: 10,
      borderRadius: 2,
      p: 0,
      minWidth: 290,
      maxWidth: 290,
      minHeight:100,
      marginBottom:5,
    }} raised="true" >
    <div className="header">{cleanData(props.keyV)}</div>
    <div className={`header_detail`}>
         <div className="header_detail2">{props.nestedData[props.keyV]}</div>
       </div>
    </Card> 
  );
};