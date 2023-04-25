import React from "react";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import BasicExampleDataGrid from "../../Components/NewTable/NewTable.js";
import data from "../../Data/Mock_Data.json";
import "../../Components/statistics/StatisticsCard.css";
import { useState, useEffect } from "react";
import id from "../../Data/Mock_Data.json";

// console.log(data.length);
const totalTestSuites = data.length;
const successfulTestSuites = data.filter(
  (item) => item.isVerified === true
).length;
const failedTestSuites = data.filter(
  (item) => item.isVerified === false
).length;

console.log(totalTestSuites);
export default function Testsuit() {
  // const [data, setData] = useState(null);
  // const getData = null;
  // useEffect(() => {
  //   fetchTestSuiteHandler();
  // }, []);

  // async function fetchTestSuiteHandler()
  // {
  //   try
  //   {
  //     const response = await fetch("http://localhost:8080/TestSuites/")
  //     if(!response.ok) console.log("something went wrong");
  //     getData = await response.json();
  //     // console.log(getData);
  //   }
  //   catch (error)
  //   {
  //     console.error(error);
  //   }
  // }

  const [data, setData] = useState(
  [
    {
      ID: "none",
    },
  ]);

  useEffect(() => {
    fetch('http://localhost:8080/TestSuites/')
      .then(response => response.json())
      .then(json => {if(json) setData(json)})
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
