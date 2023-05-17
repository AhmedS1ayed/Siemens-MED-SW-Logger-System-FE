import { useContext, useState } from "react";
import DatabaseContext from "../Contexts/DatabaseContext";
import { saveState } from "../Storage/storage";
function FetchDbHook() {
  const [connect, setConnect] = useContext(DatabaseContext);
  const [formData, setFormData] = useState();
  const handleConnect = (event) => {
    event.preventDefault();
    if (!formData || Object.keys(formData).length === 0) {
      console.log("No URL provided");
      setConnect(false);
      saveState(false);
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
          setConnect(true);
          saveState(true);
        } else {
          console.log("Database connection failed!");
          setConnect(false);
          saveState(false);
        }
      })
      .catch((error) => {
        console.log("An error occurred: ", error);
        setConnect(false);
        saveState(false);
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
      .then((response) => {
        if (response.status === 200) {
          setConnect(false);
          saveState(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return [handleConnect, handleChange, connect, handleDisconnect];
}

export default FetchDbHook;
