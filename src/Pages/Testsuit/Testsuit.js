import React from "react";
import { Card, Container , Dialog } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "../../Components/DataGrid/DataGrid.css";
import { useEffect, setData } from "react";
import { useState } from "react";
import { getColumnName ,getKeys , isNumber } from "../../Utils/utilities";
import LinkIcon from "@mui/icons-material/Link";
import "./Testsuit.css";
import BasicFlow from "../../Components/ConnectivityMap/ConnectivityMap";
import { random } from "@mui/x-data-grid-generator";
import { flattenObject } from "../../Utils/utilities";

let flattenedData  =null;
let filteredData = null;

export default function Testsuit() {
 
  // window.location.reload();
  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);
  
  useEffect(() => {
    fetch('http://localhost:8080/TestSuites/')
      .then(response => response.json())
      .then(data => {
        if(data) setData(data);
        console.log("test suites data " , data);
        //setflattenedData(data.map((item) => flattenObject(item)));
      })
      .catch(error => console.error(error));
  }, []);

  let [flattenedData, setflattenedData] = useState([
    {
      _id: "none",
    },
  ]);
  const [openDialogs, setOpenDialogs] = useState([]);
  const [idx , setClickedIdx] = useState(0);
  const [nestedData , setNestedData] = useState('None');
  const [isConnectivityMap,setConnectivityMap] = useState(false);
  const [stack , setStack] =useState(['none']);  
  // const [ConnectivityNodes , setConnectivityNodes] = useState([]);
  // const [ConnectivityLinks , setConnectivityLinks] = useState([]);

  let ConnectivityLinks = [];
  let ConnectivityNodes = [];


  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const handleRowClicked = (index) => 
  {
    setClickedIdx(index);
    setNestedData(data[index]['metaData']['design_info']);
    setConnectivityMap(false);
    setStack(['none']);
    toggleDialog(index);
  }

  const handleKeyClicked = (item) => 
  { 
    setStack([...stack,nestedData]);
    setNestedData(nestedData[item]);  
    const keys = getKeys(nestedData[item]);
    if(item==='sa_connectivity_map' || item ==='mpg_connectivity_map')
    {
      setConnectivityMap(true);
    }
    else
    {
      setConnectivityMap(false);
    }
  }
  const handleBackward = ()=>
  {
    console.log('before' , stack);
    setNestedData(stack[stack.length-1]);
    stack.pop();
    //Might need some fixes in the future
    setConnectivityMap(false);
  }

  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const data_columns = [];
  data.forEach((row) =>getColumnName(row, data_columns));

  

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

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        let testsuitId = null;
        if(data){

          testsuitId = data[tableMeta.rowIndex].id;
        }
        console.log('testsuitId',testsuitId);
        return (
            <Link to={`/testcases?testsuitId=${testsuitId || ''}`}>
              <LinkIcon />
            </Link>
        );
      },
    },
  });

  if(data){
    flattenedData = data.map((item) => flattenObject(item));
    console.log('flattenedData',flattenedData);
    
  }
  if(flattenedData){
    if(data_columns){
      filteredData = flattenedData.map((item) => {
        const filteredItem = {};
        Object.keys(item).forEach((key) => {
          if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
            filteredItem[key] = item[key];
          }
        });
        return filteredItem;
      });
  }
    return (
    <Container key={Math.random()} maxWidth="x">
      {/* <h1>statistics</h1> */}
      <div className="statistics-container">
        <StatisticCard
          title="Total Test Suites"
          count={totalTestSuites}
          color="#ffffff"
          icon="equalizer"
        />
        <StatisticCard
          title="Successful Test Suites"
          count={successfulTestSuites}
          color="#fffff0"
          icon="check"
        />
        <StatisticCard
          title="Failed Test Suites"
          count={failedTestSuites}
          color="#ffffff"
          icon="error"
        />
      </div>

      <ExpandableRowTable
        title="Test Suites"
        Data={filteredData}
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled = {true}
        onRowClick={handleRowClicked}
      />
      <Dialog
              onClose={() => toggleDialog(idx)}
              open={openDialogs[idx]}
            >
              {Object.keys(nestedData).map((item) =>{
                console.log('item' , item);
                if(typeof nestedData[item] === "object" && !isNumber(item))
                return(
                <div className="display: inline"><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{item}</button>
                </div>)
                else if( typeof nestedData[item] === "object" && isNumber(item))
                {
                  return (<div className="display: inline"><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{nestedData[item]['id']}</button>
                  </div>);
                }              
              })}
              <div className="display:inline">
              {Object.keys(nestedData).map((key,value) =>{
                if(typeof nestedData[key] != "object" && !isConnectivityMap){
                return(
                <Card className="card">
                <div className="header">{key}</div>
                <div className="header_detail">
                  <div className="header_detail2" >{nestedData[key]}</div>
                </div>
                
                </Card> 
                )}
                else if (typeof nestedData[key] != "object" && isConnectivityMap)
                {
                  console.log('key ', key ,'nestedData[key]',nestedData[key]);
                 ConnectivityNodes.push({id: key , position: { x: 0 + 70 * key, y: 0 + 100 * key   },data: {label: key } });
                  if(key != nestedData[key])
                  ConnectivityLinks.push({id:'e_'+key,source: key, target: nestedData[key] , arrowHeadType: 'arrow',animated: true, label: 'connectivity' });
           
                }
                })}
                </div>
               
                {isConnectivityMap ? <BasicFlow nodes={ConnectivityNodes} links={ConnectivityLinks} /> : <></>}
                {stack.length > 1 ? (<button className="results_btn" key='back' label='back' onClick = {handleBackward}> ← </button>) : <></>}
      </Dialog>
      <br />
    </Container>
  );
  }
}