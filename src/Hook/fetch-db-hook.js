import { useState } from "react";

function FetchDbHook() {
  const [formData, setFormData] = useState();
  const [response, setResponse] = useState();
  const handleConnect = (event) => {
    event.preventDefault();
    if (!formData || Object.keys(formData).length === 0) {
      console.log("No URL provided");
      setResponse(false);
      return;
    }

    fetch("http://localhost:8080/database/urls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Database connection successfull!");
          setResponse("Connected");
        } else {
          console.log("Database connection failed!");
          setResponse(false);
        }
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
        setResponse(false);
      });
  };
  const handleChange = (event) => {
    setFormData({ [event.target.name]: event.target.value });
  };

  const handleDisconnect = () => {
    fetch("http://localhost:8080/database/urls", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setResponse("Disconnected"))
      .catch((error) => setResponse("failed"));
  };
  return [handleConnect, handleChange, response, handleDisconnect];
}

export default FetchDbHook;
