import React from "react";
import { Link, useLocation } from "react-router-dom";
import data from "../../Data/Mock_Test_Case.json";
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
  // const testcaseId = searchParams.get("testcaseId");
  // useEffect(() => {
  //   fetch(`http://localhost:8080/`)
  //     .then(response => response.json())
  //     .then(data => {if(data) setData(data);})
  //     .catch(error => console.error(error));
  // }, []);

  const totalTestCases = data.length;
  const successfulTestCases = data.filter((item) => item.isSuccessful === true).length;
  const failedTestCases = data.filter((item) => item.isSuccessful === false).length;
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
        const testcaseId = tableMeta.rowData[0];
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

  return (

    //   <DataGrid data={data} data_columns={data_columns} />
    <Container maxWidth="x">
       <div className="statistics-container">
          <StatisticCard title="Total Test Suites" count={totalTestCases } color="#ffffff" icon="equalizer" />
          <StatisticCard title="Successful Test Suites" count={successfulTestCases } color="#fffff3" icon="check" />
          <StatisticCard title="Failed Test Suites" count={failedTestCases } color="#ffffff" icon="error" />
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
