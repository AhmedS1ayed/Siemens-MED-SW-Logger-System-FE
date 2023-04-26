import React from "react";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import "../../Components/statistics/StatisticsCard.css";

export default function Testcase() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("testsuitId");

  const [data, setData] = useState(
    [
      {
        ID: "none",
      },
    ]);
  
    useEffect(() => {
      fetch('http://localhost:8080/testCases/?testSuite[id]=' +id)
        .then(response => response.json())
        .then(json => {if(json) setData(json)})
        .catch(error => console.error(error));
    }, []);

  // return <div>test case inside test suite id = {id}</div>;

  return (
    <Container>
      {/* <div className="statistics-container">
        <StatisticCard
          title="Total Test Suites"
          count={totalTestSuites}
          color="#00a3e0"
        />
        <StatisticCard
          title="Successful Test Suites"
          count={successfulTestSuites}
          color="#00b894"
        />
        <StatisticCard
          title="Failed Test Suites"
          count={failedTestSuites}
          color="#e74c3c"
        />
      </div> */}
      <BasicExampleDataGrid data={data} />
    </Container>
  );
}
