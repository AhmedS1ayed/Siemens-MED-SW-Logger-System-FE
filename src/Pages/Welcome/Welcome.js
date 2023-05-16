import React from "react";
import { Link } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import "./Welcome.css";
import FetchDbHook from "../../Hook/fetch-db-hook";

const Welcome = () => {
  const [handleSubmit, handleChange, response] = FetchDbHook();
  return (
    <div className="WelcomeContainer">
      <div className="Welcome">
        <div className="WelcomeBody">
          <form onSubmit={handleSubmit}>
            <label>
              Database path:
              <input
                type="text"
                id="databaseUrl"
                name="databaseUrl"
                onChange={handleChange}
              />
            </label>
            <button className="WelcomeBtn" type="submit">
              Submit
            </button>
          </form>

          <h1>Test Results Visualizer</h1>
          <Link className="CustomLinkWelcome" to="/testsuits">
            <button className="WelcomeBtn" disabled={!response}>
              Click here to go to test suite page
            </button>
          </Link>
          <InsertChartIcon
            sx={{
              mr: 1,
              color: "#333333",
              fontWeight: "bold",
              textShadow: "1px 1px #cccccc",
            }}
            style={{ color: "black", fontSize: 200 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
