import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'
import InsertChartIcon from "@mui/icons-material/InsertChart";

const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome">
        <h1>Test Results Visualizer</h1>
        <Link className="custom-link-welcome" to="/testsuits">
          <button className="button-welcome">
            Click here to go to test suite page
          </button>
          </Link>
      {/* <div className="welcome-icon"> */}
            <InsertChartIcon  
            className="welcome-icon"
              sx={{  display: { xs: "none",md: "flex" }, mr: 1, color: "#333333", fontWeight: "bold", textShadow: "1px 1px #cccccc" }}
              style={{ color: 'black' ,fontSize: 200}}
            />
            {/* </div> */}
      </div>
    </div>
  );
}

export default Welcome;