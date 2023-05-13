import React from "react";
import { Container, Dialog } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "./Testsuit.css";
import { BackButton } from "../../Components/NestContent/BackButton.js";
import { NestContent } from "../../Components/NestContent/NestContent.js";
import { NestPath } from "../../Components/NestContent/NestPath.js";
import TestSuiteHook from "../../Hook/test-suite-hook";
import NestHeader from "../../Components/NestContent/NestHeader";

export default function Testsuit() {
  const [
    totalTestSuites,
    successfulTestSuites,
    failedTestSuites,
    filteredData,
    data_columns,
    handleRowClicked,
    toggleDialog,
    setNestedData,
    setStack,
    setPath,
    idx,
    openDialogs,
    isConnectivityMap,
    path,
    nestedData,
    handleKeyClicked,
    ConnectivityLinks,
    ConnectivityNodes,
    stack,
    handleBackward
  ] = TestSuiteHook();
  return (
    <Container key={Math.random()} maxWidth="x">
      {/* <h1>statistics</h1> */}
      <div className="statistics-container">
        <StatisticCard
          title="Total Test Suites"
          count={totalTestSuites}
          // color="#ffffff"
          icon="equalizer"
        />
        <StatisticCard
          title="Successful Test Suites"
          count={successfulTestSuites}
          color="#d4ead4"
          icon="check"
        />
        <StatisticCard
          title="Failed Test Suites"
          count={failedTestSuites}
          color="#f3d4d1"
          icon="error"
        />
      </div>

      <ExpandableRowTable
        title="Test Suites"
        Data={filteredData}
        regularColumns={data_columns}
        expandable={false}
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
        maxWidth={isConnectivityMap ? undefined : "xl"}
      >
        {!isConnectivityMap && <NestHeader title={filteredData[idx]['owner'] + "- Test Case"}></NestHeader>}
        <NestPath
          path= {path}
        ></NestPath>
        <NestContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          nestedData={nestedData}
          handleKeyClicked={handleKeyClicked}
          isConnectivityMap={isConnectivityMap}
          ConnectivityLinks={ConnectivityLinks}
          ConnectivityNodes={ConnectivityNodes}
        ></NestContent>
        <BackButton stack={stack} handleBackward={handleBackward}></BackButton>
      </Dialog>
    </Container>
  );
}
