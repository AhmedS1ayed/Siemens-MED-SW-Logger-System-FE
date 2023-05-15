import React from "react";
import { Link } from "react-router-dom";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import "./Welcome.css";
import FetchDbHook from "../../Hook/fetch-db-hook";

const Welcome = () => {
  // const [formData, setFormData] = useState();
  // const [response, setResponse] = useState();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch('http://localhost:8080/database/urls', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(formData)
  //   }).then(response => response.json())
  //   .then(data => setResponse(true))
  //   .catch(error => setResponse('failed'));
  // }
  // const handleChange = (event) => {
  //   console.log(event);
  //   setFormData({[event.target.name]: event.target.value});
  //   console.log('ff' , event.target.value);
  // }
  const [handleSubmit,handleChange,response] = FetchDbHook();
  return (
    <div className="WelcomeContainer">
      <div className="Welcome">
        <div className="WelcomeBody">
        <form onSubmit={handleSubmit}>
            <label>
              connect to db:
              <input type="text" id= "databaseUrl" name="databaseUrl" onChange={handleChange} />
            </label>
            <button className="WelcomeBtn" type="submit">Submit</button>
        </form>
        {response && <h1> connected</h1>}

          <h1>Test Results Visualizer</h1>
          <Link className="CustomLinkWelcome" to="/testsuits">
            <button className="WelcomeBtn">
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
