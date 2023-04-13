import './App.css';
import Table from './Components/Table.js'
import id from './Data/Mock_Data.json'
import { useState } from 'react';

function App() 
{
  const [data,setData] = useState(id);
  const rowClickedHandler = (requestParameters , callback)=>
  {
    console.log("rowHandler in application");
    console.log(requestParameters);
    let newData =[{
      "id": 3,
      "ff": "new Port",
      "gg": "1",
      "state": "Verified",
    }]; 
    setData(newData);
    return newData;
  }
  return (
    <>
      <h1> HELLO </h1>
      <Table Data = {data} onRowClicked={rowClickedHandler}></Table>
    </>
  );
}

export default App;
