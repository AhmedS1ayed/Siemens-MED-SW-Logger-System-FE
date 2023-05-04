import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "../../Components/DataGrid/DataGrid.css";
import { useEffect, setData } from "react";
import { useState } from "react";
// import data from "../../Data/Mock_Data.json";
import { getColumnName } from "../../Utils/utilities";
import LinkIcon from "@mui/icons-material/Link";


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
        console.log('data',data);
      })
      .catch(error => console.error(error));
  } ,[]);
  // console.log(flattenedData);
  
  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const data_columns = [];
  data.forEach((row) =>{
    // console.log('row',row);
     getColumnName(row, data_columns)
    //  if(row.metaData === undefined) return;
    //  else{
    //   console.log('row.metaData',row.metaData);
    //   if (row.metaData) {
    //     console.log('row.metaData.owner', row.metaData.owner);
    //     for (const key in row.metaData) {
    //       if (!data_columns.find((column) => column.name === key)) {
    //         const obj = [];
    //         obj[key] = row.metaData[key];

    //         getColumnName(obj, data_columns);
    //       }
    //     }
    //   }
    // };
    //  console.log('data_columns',data_columns);
  });
  // if(data.length === 0) return <div>loading...</div>;
  // else

  //data.at(0).metaData.forEach((row) => getColumnName(row, data_columns));
  

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
          // console.log('key',key , 'data_columns',data_columns);
          if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
            // const label = key.substring(key.lastIndexOf(".") + 1);
            // console.log("iteeeeeeeeem" , item[key])
            filteredItem[key] = item[key];
          }
        });
        return filteredItem;
      });
      console.log('filteredData',filteredData);
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
        onRowClickEnabled={false}
      />
      {/* <DataGrid data={data} data_columns={data_columns} /> */}
      <br />
    </Container>
  );
  }
}
