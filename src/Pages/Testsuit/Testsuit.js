import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import data from "../../Data/Mock_Data.json";
import "../../Components/statistics/StatisticsCard.css"

// console.log(data.length);  
const totalTestSuites = data.length;
const successfulTestSuites = data.filter((item) => item.isVerified === true).length;
const failedTestSuites = data.filter((item) => item.isVerified === false    ).length;

console.log(totalTestSuites);
export default function Testsuit() {
  return (
  
    <Container>
        {/* <h1>statistics</h1> */}
       <div className="statistics-container">
        <StatisticCard title="Total Test Suites" count={totalTestSuites} color="#00a3e0" />
        <StatisticCard title="Successful Test Suites" count={successfulTestSuites} color="#00b894" />
        <StatisticCard title="Failed Test Suites" count={failedTestSuites} color="#e74c3c" />
      </div>
  
      <BasicExampleDataGrid />
      <br />  
    </Container>
  );
}
