import './App.css';
import Table from './Components/Table.js'
import id from './Data/Mock_Data.json'


function App() 
{
  const rowClickedHandler = (requestParameters)=>
  {
    console.log("rowHandler in application");
    console.log(requestParameters);
  }
  return (
    <>
      <h1> HELLO </h1>
      <Table Data = {id} onRowClicked={rowClickedHandler}></Table>
    </>
  );
}

export default App;
