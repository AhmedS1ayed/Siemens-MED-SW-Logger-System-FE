import { useState } from 'react'

function FetchDbHook() {
    const [formData, setFormData] = useState();
    const [response, setResponse] = useState();
    const handleConnect = (event) => {
      event.preventDefault();
      fetch('http://localhost:8080/database/urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(response => response.json())
      .then(data => setResponse("Connected"))
      .catch(error => setResponse('failed'));
    }
    const handleChange = (event) => {
      console.log(event);
      setFormData({[event.target.name]: event.target.value});
      console.log('ff' , event.target.value);
    }

    const handleDisconnect = ()=>{
      fetch('http://localhost:8080/database/urls', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then(response => response.json())
      .then(data => setResponse("Disconnected"))
      .catch(error => setResponse('failed'));
    }
  return [handleConnect,handleChange,response,handleDisconnect];
}

export default FetchDbHook