import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import data from "../../Data/Mock_Data.json";
import "../../Components/statistics/StatisticsCard.css"
import DeleteIcon from "@mui/icons-material/Delete";
import DataGrid from "../../Components/DataGrid/DataGrid.js";
import { getColumnsName } from "../../Utils/utilities";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "../../Components/DataGrid/DataGrid.css"

// console.log(data.length);  
const totalTestSuites = data.length;
const successfulTestSuites = data.filter((item) => item.isVerified === true).length;
const failedTestSuites = data.filter((item) => item.isVerified === false    ).length;

console.log(totalTestSuites);
export default function Testsuit() {
  let data_columns = getColumnsName(data[0], { dateCreated: 250 });
  data_columns.push({
    field: "link",
    headerName: "Link",
    headerClassName: "super-app-theme--header",
    // width: 120,
    renderCell: (params) => {
      let testsuitId = params.id;

      return <Link to={`/testcases?testsuitId=${testsuitId}`}>Show more</Link>;
    },
  });

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

  const getColumnName = (data) => {
    let columnsName = [];
    Object.keys(data).forEach((key) => {
      if (typeof data[key] !== "object") {
        let newColumn = {
          name: key,
          label: key,
        };
        if (
          !columnsName.find((column) => {
            return JSON.stringify(column) === JSON.stringify(newColumn);
          })
        ) {
          columnsName.push(newColumn);
        }
      }
    });
    return columnsName;
  };

  let regularColumns = [];

  data.forEach((row) => {
    regularColumns = getColumnName(row);
  });

  return (
  
    <Container>
        {/* <h1>statistics</h1> */}
       <div className="statistics-container">
        <StatisticCard title="Total Test Suites" count={totalTestSuites} color="#00a3e0" />
        <StatisticCard title="Successful Test Suites" count={successfulTestSuites} color="#00b894" />
        <StatisticCard title="Failed Test Suites" count={failedTestSuites} color="#e74c3c" />
      </div>
  
      {/* <BasicExampleDataGrid /> */}
      <br />  
      {/* <ExpandableRowTable
        title="Test Suites"
        Data={data}
        regularColumns={regularColumns}
      /> */}
      <DataGrid data={data} data_columns={data_columns} />

    </Container>
  );
}
