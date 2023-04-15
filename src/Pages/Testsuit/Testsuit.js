import React from "react";
import Table from "../../Components/Table/Table.js";
import data from "../../Data/Mock_Data.json";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard"
import "../../Components/statistics/StatisticsCard.css"
console.log(data.length)  


const totalTestSuites = data.length;
const successfulTestSuites = data.filter((item) => item.validationState === 'Verified').length;
const failedTestSuites = data.filter((item) => item.validationState === 'Failed').length;


export default function Testsuit() {

  return (
    <Container>
      <h1>statistics </h1>
      <div className="statistics-container">
      
      <StatisticCard color={'white'} title={'Total Test Suites'} count={totalTestSuites}  ></StatisticCard>
      <StatisticCard color={'blue'} title={'Successful Test Suites'} count={successfulTestSuites}  ></StatisticCard>
      <StatisticCard color={'red'} title={'Failed Test Suites'} count={failedTestSuites}  ></StatisticCard>

      </div>
      <br></br>
      <Table Data={data}></Table>
    </Container>
  );
} 
