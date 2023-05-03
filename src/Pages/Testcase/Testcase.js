import React from "react";
import { Link, useLocation } from "react-router-dom";
// import data from "../../Data/Mock_Test_Case.json";
import { getColumnName, getColumnsName } from "../../Utils/utilities";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { useEffect, useState } from "react";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import LinkIcon from "@mui/icons-material/Link";

export default function Testcase() {

  const [data, setData] = useState(
    [
      {
        _id: "none",
      },
    ]);


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
  // let data_columns = getColumnsName(data[0], { dateCreated: 250 });

  // data_columns.push({
  //   field: "link",
  //   headerName: "Link",
  //   headerClassName: "super-app-theme--header",
  //   width: 120,
  //   renderCell: (params) => {
  //     let testcaseId = params.id;
  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        const testcaseId = tableMeta.rowData[1];
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
        onRowClickEnabled={false}
      />
      {/* <DataGrid data={data} data_columns={data_columns} /> */}
    </Container>
  );
}
