import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import data from "../../Data/Mock_Data.json";
import "../../Components/statistics/StatisticsCard.css"

// console.log(data.length);  
const totalTestSuites = data.length;
const successfulTestSuites = data.filter((item) => item.validationState === 'Verified').length;
const failedTestSuites = data.filter((item) => item.validationState === 'Failed').length;

console.log(totalTestSuites);
export default function Testsuit() {
  return (
  
    <Container>
       <div className="statistics-container">
        <StatisticCard title="Total Test Suites" count={totalTestSuites} color="blue" />
        <StatisticCard title="Successful Test Suites" count={successfulTestSuites} color="green" />
        <StatisticCard title="Failed Test Suites" count={failedTestSuites} color="red" />
      </div>
      <br />
      <BasicExampleDataGrid />
    </Container>
  );
}
