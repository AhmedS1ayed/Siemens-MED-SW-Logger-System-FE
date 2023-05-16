import { useState } from "react";

function FetchDbHook() {
  const [formData, setFormData] = useState();
  const [response, setResponse] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formData || Object.keys(formData).length === 0) {
      window.alert("No URL provided!");
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
          window.alert("Database connection successfull!");
          setResponse(true);
        } else {
          window.alert("Database connection failed!");
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

  return [handleSubmit, handleChange, response];
}

export default FetchDbHook;
