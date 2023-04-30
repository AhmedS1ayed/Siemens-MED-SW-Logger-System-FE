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

export default function Testsuit() {
  useEffect(() => {
    fetch('http://localhost:8080/TestSuites/')
      .then(response => response.json())
      .then(data => {
        if(data) setData(data);
        console.log(data);
      })
      .catch(error => console.error(error));
  }, []);
  
  const [data, setData] = useState([
    {
      _id: "none",
    },
  ]);
  
  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const data_columns = [];
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
          color="#d4ead4"
          icon="check"
        />
        <StatisticCard
          title="Failed Test Suites"
          count={failedTestSuites}
          color="#f3d4d1"
          icon="error"
        />
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
