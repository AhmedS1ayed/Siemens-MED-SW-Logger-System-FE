import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import "../../Components/statistics/StatisticsCard.css"
import DeleteIcon from "@mui/icons-material/Delete";
import DataGrid from "../../Components/DataGrid/DataGrid.js";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "../../Components/DataGrid/DataGrid.css"
import { useEffect , setData } from "react";
import { useState } from "react";
import data from "../../Data/Mock_Data.json";
import { getColumnName } from "../../Utils/utilities";
import LinkIcon from "@mui/icons-material/Link";



// export default function Testsuit() {
  
//   const [data, setData] = useState(
  //     [
    //       {
      //         _id: "none",
      //       },
      //     ]);
      

//   let data_columns = getColumnsName(data[0], { dateCreated: 250 });
//   data_columns.push({
  //     field: "link",
  //     headerName: "Link",
  //     headerClassName: "super-app-theme--header",
  //     // width: 120,
  //     renderCell: (params) => {
//       let testsuitId = params.id;

//       return <Link to={`/testcases?testsuitId=${testsuitId}`}>Show more</Link>;
//     },
//   });

// data_columns.push({
  //   field: "delete",
  //   headerName: "",
  //   width: 70,
  //   headerClassName: "super-app-theme--header",
  //   sortable: false,
  //   filterable: false,
  //   disableColumnMenu: true,
  //   renderCell: (params) => (
    //     <DeleteIcon
    //       color="primary"
    //       style={{ cursor: "pointer" }}
    //       onClick={() => console.log(`Deleting row ${params.id}`)}
    //     />
  //   ),
  // });
  
  // const getColumnName = (data) => {
  //   let columnsName = [];
  //   Object.keys(data).forEach((key) => {
  //     if (typeof data[key] !== "object") {
  //       let newColumn = {
  //         name: key,
  //         label: key,
  //       };
  //       if (
  //         !columnsName.find((column) => {
  //           return JSON.stringify(column) === JSON.stringify(newColumn);
  //         })
  //         ) {
  //           columnsName.push(newColumn);
  //         }
  //       }
  //     });
  //     return columnsName;
  //   };
    
    export default function Testsuit() {
      const totalTestSuites = data.length;
      const successfulTestSuites = data.filter((item) => item.isSuccessful === true).length;
const failedTestSuites = data.filter((item) => item.isSuccessful === false ).length;

      let data_columns = [];
      data.forEach((row) => getColumnName(row, data_columns));
    
      data_columns.push({
        name: "",
        label: "",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
            const testsuitId = tableMeta.rowData[0];
            return (
              <Link to={`/testcases?testsuitId=${testsuitId}`}>
                <LinkIcon />
              </Link>
            );
          },
        },
      });
    let regularColumns = [];
    
  // data.forEach((row) => {
  //   regularColumns = getColumnName(row);
  // });

  // useEffect(() => {
  //   fetch('http://localhost:8080/TestSuites/')
  //     .then(response => response.json())
  //     .then(data => {if(data) setData(data);})
  //     .catch(error => console.error(error));
  // }, []);

  return (
  
    // <Container>

  
    //   {/* <BasicExampleDataGrid /> */}
    //   {/* <br /> */}
    //   {/* <ExpandableRowTable
    //     title="Test Suites"
    //     Data={data}
    //     regularColumns={regularColumns}
    //   /> */}


  // return (
    <Container maxWidth="x">
        {/* <h1>statistics</h1> */}
        <div className="statistics-container">
          <StatisticCard title="Total Test Suites" count={totalTestSuites} color="#ffffff" icon="equalizer" />
          <StatisticCard title="Successful Test Suites" count={successfulTestSuites} color="#fffff3" icon="check" />
          <StatisticCard title="Failed Test Suites" count={failedTestSuites} color="#ffffff" icon="error" />
        </div>
      <ExpandableRowTable
        title="Test Suites"
        Data={data}
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled={false}
      />
      {/* <DataGrid data={data} data_columns={data_columns} /> */}
      <br />
    </Container>
  );
}
