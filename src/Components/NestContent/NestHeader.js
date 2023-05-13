import React from 'react';
import "./NestHeader.css";
function NestHeader(props) {
  return (
    <div className="NestHeader"> {props.title}</div>
  )
}

export default NestHeader;