import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import "../../Components/statistics/StatisticsCard.css";
import { useState, useEffect } from "react";

// console.log(data.length);


export default function Testsuit() {
  const [data, setData] = useState(
  [
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

  useEffect(() => {
    fetch('http://localhost:8080/TestSuites/')
      .then(response => response.json())
      .then(json => {if(json) setData(json);})
      .catch(error => console.error(error));
  }, []);

  return (
    <Container>
      <div className="statistics-container">
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
      </div>
      <BasicExampleDataGrid data={data} />
    </Container>
  );
}