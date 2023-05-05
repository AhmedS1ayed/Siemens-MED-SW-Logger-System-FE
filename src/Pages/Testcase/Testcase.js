import React from "react";
import { Link, useLocation } from "react-router-dom";
// import data from "../../Data/Mock_Test_Case.json";
import { getColumnName, getKeys , isNumber } from "../../Utils/utilities";
import { Dialog,Container , Card } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { useEffect, useState } from "react";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import LinkIcon from "@mui/icons-material/Link";

export default function Testcase() {

  const [data, setData] = useState(
    [
      {
        id: "none",
      },
    ]);
  const [openDialogs, setOpenDialogs] = useState([]);
  const [idx , setClickedIdx] = useState(0);
  const [nestedData , setNestedData] = useState('None');
  const [dataKeys,setDataKeys] = useState(['None']);
  const [stack , setStack] =useState(['none']);  

  


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  // ! This is not working backend need to implement a new api
  const testcaseId = searchParams.get("testcaseId");
  useEffect(() => {
    fetch(`http://localhost:8080/testCases/?testSuite[_id]=${testsuitId}`)
      .then(response => response.json())
      .then(data => {if(data) setData(data);})
      .catch(error => console.error(error));
  }, []);

  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const handleRowClicked = (index) => 
  {
    setStack([...stack,nestedData]);
    setClickedIdx(index);
    setNestedData(data[index]['metaData']);
    setDataKeys(getKeys(data[index]['metaData']));
    setStack(['none']);
    toggleDialog(index);
  }
  const handleKeyClicked = (item) => 
  {
    setStack([...stack,nestedData]);
    setNestedData(nestedData[item]);
    const keys = getKeys(nestedData[item]);
    setDataKeys(keys);
  }
  const handleBackward = ()=>
  {
    setNestedData(stack[stack.length-1]);
    stack.pop();
    //Might need some fixes in the future
  }

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const testcaseId = data[tableMeta.rowIndex].id;
        return (
          <Link
            to={`/validtags?testsuitId=${testsuitId}&testcaseId=${testcaseId}`}
          >
            <LinkIcon />
          </Link>
        );
      },
    },
  });

  let count = 0;
  data_columns.unshift({
    name: "INDEX",
    label: "INDEX",
    options: {
      filter: false,
      sort: true,
      customBodyRender: () => {
       if(count === data.length) count = 0; 
        count++;
        return (count);
      },
    },
  });


  return (
    // <Container>
    //     <div className="statistics-container">
    //     <StatisticCard title="Total Test Cases" count={totalTestCases} color="#00a3e0" />
    //     <StatisticCard title="Successful Test Cases" count={successfulTestCases} color="#00b894" />
    //     <StatisticCard title="Failed Test Cases" count={failedTestCases} color="#e74c3c" />
    //   </div>
  
    //   <DataGrid data={data} data_columns={data_columns} />
    <Container maxWidth="x">
      <div className="statistics-container">
        <StatisticCard
          title="Total Test Cases"
          count={totalTestSuites}
          color="#ffffff"
          icon="equalizer"
        />
        <StatisticCard
          title="Successful Test Cases"
          count={successfulTestSuites}
          color="#fffff0"
          icon="check"
        />
        <StatisticCard
          title="Failed Test Cases"
          count={failedTestSuites}
          color="#ffffff"
          icon="error"
        />
      </div>
      <ExpandableRowTable
        title="Test Cases"
        Data={data}
        regularColumns={data_columns}
        onRowClickEnabled={true}
        onRowClick={handleRowClicked}
      />
      <Dialog
              onClose={() => toggleDialog(idx)}
              open={openDialogs[idx]}
            >
              {Object.keys(nestedData).map((item) =>{
                console.log('item' , item);
                if(typeof nestedData[item] === "object")
                return(
                <div className="display: inline"><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{item}</button>
                </div>)
                // else if( typeof nestedData[item] === "object" && isNumber(item))
                // {
                //   // let itemIn='';
                //   // if(nestedData[itemIn]['id'])
                //   //   itemIn = nestedData[item]['id']
                  
                //   // if(nestedData[item]['master_id'])
                //   //   itemIn = nestedData[item]['master_id']
                  
                //   // if(nestedData[item]['slave_ids'] && typeof nestedData[item]['slave_ids'] !=="object" )
                //   //   itemIn = nestedData[item]['slave_ids']

                //   return (<div className="display: inline"><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{itemIn}</button>
                //   </div>);
                // }              
              })}
              <div className="display:inline">
              {Object.keys(nestedData).map((key,value) =>{
                if(typeof nestedData[key] != "object"){
                return(
                <Card className="card">
                <div className="header">{key}</div>
                <div className="header_detail">
                  <div className="header_detail2" >{nestedData[key]}</div>
                </div>
                
                </Card> 
                )}
                else if (typeof nestedData[key] != "object")
                {
                  return(<><h1>HELLOO</h1></>);
                }
                })}
                </div>
                {stack.length > 1 ? (<button className="results_btn" key='back' label='back' onClick = {handleBackward}> ← </button>) : <></>}
      </Dialog>
    </Container>
  );
}
