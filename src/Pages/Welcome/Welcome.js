import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'
import InsertChartIcon from "@mui/icons-material/InsertChart";
const Welcome = () =>{
  return (
    <div className="welcome">

      <h1>Welcome to our Application!
      </h1>

      <p>This is a Logger System (Read Only) repository.</p>
      <Link className="custom-link-welcome" to="/testsuits">Click here to go to test suite page.
      <InsertChartIcon 
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#333333", fontWeight: "bold", textShadow: "1px 1px #cccccc" }}
            style={{ color: 'black' ,fontSize: 200}}
          />
          </Link>

      
    </div>
  );
}

export default Welcome;