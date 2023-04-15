import React from "react";
import Table from "../../Components/Table/Table.js";
import data from "../../Data/Mock_Data.json";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/statistics"

console.log(data.length)  

let successfulCount = 0;
let failedCount = 0;
function getSuccessfulSuites(){
  for(let i = 0; i < data.length; i++){
    console.log("id ",data.id)
    if(data.validationState == "Verified"){
      successfulCount++;
    }else{
      failedCount++;
    }
  }

}
export default function Testsuit() {
  return (
    getSuccessfulSuites(),
    <Container>
        <h1>statistics </h1>
      <StatisticCard color={'blue'} title={'Total Test Suites'} count={data.length}  ></StatisticCard>
      <StatisticCard color={'blue'} title={'Successful Test Suites'} count={successfulCount}  ></StatisticCard>
      <StatisticCard color={'blue'} title={'Failed Test Suites'} count={failedCount}  ></StatisticCard>

      <Table Data={data}></Table>
    </Container>
  );
} 
