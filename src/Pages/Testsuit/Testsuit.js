import React from "react";
import Table from "../../Components/Table/Table.js";
import id from "../../Data/Mock_Data.json";
import { Container } from "@mui/material";

export default function Testsuit() {
  return (
    <Container>
      <Table Data={id}></Table>
    </Container>
  );
}
