import './App.css';
import Table from './Components/Table.js'
import id from './Data/Mock_Data.json'
import { useState } from 'react';
import defineTable from './Util/defineTable';
function App() 
{
  const [data,setData] = useState(id);
  const [columns,setColumns] = useState(defineTable(data[0]));
  
  const rowClickedHandler = (requestParameters)=>
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
    setColumns(defineTable(newData[0]));
  }
  return (
    <>
      <h1> HELLO </h1>
      <Table data = {data} columns={columns} onRowClicked={rowClickedHandler}></Table>
    </>
  );
}

export default App;
