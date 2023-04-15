import React from "react";
import Table from "../../Components/Table/Table.js";
import id from "../../Data/Mock_Data.json";
import { Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/statistics"

export default function Testsuit() {
  return (
    <Container>
      <StatisticCard color={'blue'} ></StatisticCard>
      <Table Data={id}></Table>
    </Container>
  );
}
