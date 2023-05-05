import React from "react";
import { Card, Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "../../Components/DataGrid/DataGrid.css";
import { useEffect, setData } from "react";
import { useState } from "react";
// import data from "../../Data/Mock_Data.json";
import { getColumnName ,getKeys } from "../../Utils/utilities";
import LinkIcon from "@mui/icons-material/Link";
import { Dialog} from "@mui/material";
import "./Testsuit.css";

const flattenObject = (obj, prefix = "") => {
  return Object.keys(obj).reduce((acc, key) => {
    // const pre = prefix.length ? prefix + "." : "";
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key]));
    } else {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};


let flattenedData  =null;
let filteredData = null;

export default function Testsuit() {
 
  useEffect(() => {
    fetch('http://localhost:8080/TestSuites/')
      .then(response => response.json())
      .then(data => {
        if(data) setData(data);
        // console.log('data',data);
        setflattenedData(data.map((item) => flattenObject(item)));
        console.log('data---------sd-sd-s-ds-d',data);
      })
      .catch(error => console.error(error));
  }, []);
  // console.log(flattenedData);
  const [data, setData] = useState([
    {
      _id: "none",
    },
  ]);

  const [flattenedData, setflattenedData] = useState([
    {
      _id: "none",
    },
  ]);
  const [openDialogs, setOpenDialogs] = useState([]);

  const [idx , setClickedIdx] = useState(0);

  const [nestedData , setNestedData] = useState('None');

  const [dataKeys,setDataKeys] = useState(['None']);
  const [nestedDatacolumns,setNestedDataColumns] = useState([]);
  

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const handleRowClicked = (index) => 
  {
    setClickedIdx(index);
    setNestedData(data[index]['metaData']);
    setDataKeys(getKeys(data[index]['metaData']));
    toggleDialog(index);
  }
  const handleKeyClicked = (item) => 
  {
    console.log('nested : ',nestedData[item]);
    setNestedData(nestedData[item]);
    const keys = getKeys(nestedData[item]);
    setDataKeys(keys);


    let column =[]; 
    
    
    column = getColumnName(nestedData[item],column);
    // setNestedDataColumns(column);
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
        const testsuitId = data[tableMeta.rowIndex].id;
        // console.log('testsuitId',testsuitId);
        return (
          <Link to={`/testcases?testsuitId=${testsuitId}`}>
            <LinkIcon />
          </Link>
        );
      },
    },
  });
  
  if(flattenedData){
    if(data_columns){
      filteredData = flattenedData.map((item) => {
        const filteredItem = {};
        Object.keys(item).forEach((key) => {
          if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
            // const label = key.substring(key.lastIndexOf(".") + 1);
            // console.log("iteeeeeeeeem" , item[key])
            filteredItem[key] = item[key];
          }
        });
        return filteredItem;
      });
      // console.log('filteredData',filteredData);
  }
    return (
    <Container maxWidth="x">
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
              {dataKeys.map((item) =>{
                return(
                <div className="display: inline"><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{item}</button>
                </div>)})}
              {dataKeys.length === 0 ? (
              <div className="display:inline">
              {Object.keys(nestedData).map((key,value) =>{
                return(
                <Card className="card">
                <div className="header">{key}</div>
                <div className="header_detail">
                  <div className="header_detail2" >{value}</div>
                </div>
                
                </Card> 
                )})}
                </div>) : <></>}
              {/* {nestedDatacolumns.length !=0 ?(<ExpandableRowTable
                title="Test Suites"
                Data={nestedData}
                regularColumns={nestedDatacolumns}
                expandable={false}
                onRowClickEnabled = {true}
                onRowClick={handleRowClicked}/>):(<h2 className="_header">No Data to Show</h2>)} */}
                 {/* <><h1>{JSON.stringify(nestedData)} NESTT</h1></> */}
      </Dialog>
      {/* <DataGrid data={data} data_columns={data_columns} /> */}
      <br />
    </Container>
  );
  }
}


//onClick={handleKeyClicked(item)}