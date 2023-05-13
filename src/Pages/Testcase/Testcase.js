import React from "react";
import { Dialog, Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import ExpandableRowTable from "../../Components/DataTable/DataTable";
import { BackButton } from "../../Components/NestContent/BackButton.js";
import { NestContent } from "../../Components/NestContent/NestContent.js";
import { NestPath } from "../../Components/NestContent/NestPath.js";
import TestCaseHook from "../../Hook/test-case-hook";
import NestHeader from "../../Components/NestContent/NestHeader";

export default function Testcase() {
  const [
    handleBackward,
    handleKeyClicked,
    handleRowClicked,
    toggleDialog,
    failedTestSuites,
    successfulTestSuites,
    totalTestSuites,
    filteredData,
    data_columns,
    idx,
    setNestedData,
    setStack,
    setPath,
    openDialogs,
    path,
    nestedData,
    stack,
  ] = TestCaseHook();
  return (
    <Container key={Math.random()} maxWidth="xl">
      <div className="StatisticsContainer">
        <StatisticCard
          title="Total Test Cases"
          count={totalTestSuites}
          // color="#ffffff"
          icon="equalizer"
        />
        <StatisticCard
          title="Successful Test Cases"
          count={successfulTestSuites}
          color="#d4ead4"
          icon="check"
        />
        <StatisticCard
          title="Failed Test Cases"
          count={failedTestSuites}
          color="#f3d4d1"
          icon="error"
        />
      </div>{" "}
      <ExpandableRowTable
        title="Test Cases"
        Data={filteredData}
        regularColumns={data_columns}
        onRowClickEnabled={true}
        onRowClick={handleRowClicked}
      />
      <Dialog
        onClose={() => {
          toggleDialog(idx);
          setNestedData("None");
          setStack(["none"]);
          setPath(["Configurations"]);
        }}
        open={openDialogs}
        maxWidth={"xl"}
        style={{ borderRadius: "50px" }}
      >
        <NestHeader title={(idx + 1).toString() + " - Test Case"}></NestHeader>
        <NestPath
          style={{ padding: "10px", fontWeight: "bold", fontSize: "16px" }}
          path={path}
        ></NestPath>
        <NestContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          nestedData={nestedData}
          handleKeyClicked={handleKeyClicked}
        ></NestContent>
        <BackButton stack={stack} handleBackward={handleBackward}></BackButton>
      </Dialog>
    </Container>
  );
}
