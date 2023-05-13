import React from "react";
import { Container, Dialog } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import "./Testsuit.css";
import { BackButton } from "../../Components/DialogContent/BackButton.js";
import { DialogContent } from "../../Components/DialogContent/DialogContent.js";
import { DialogPath } from "../../Components/DialogContent/DialogPath.js";
import TestSuiteHook from "../../Hook/test-suite-hook";

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
    setExpandedIndex,
    handleKeyClicked,
    expandedIndex,
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
        {!isConnectivityMap && <h2 style={{fontFamily:"inherit" ,borderBottom:"10px solid #000",borderRadius:"10px",color:"#fff" , background:"#161616",margin:"auto" , marginBottom:"30px",marginTop:"10px" , padding:"10px"}} > {filteredData[idx]['owner']} Test Suite</h2>}
        <DialogPath
          path= {path}
        ></DialogPath>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          nestedData={nestedData}
          setExpandedIndex={setExpandedIndex}
          handleKeyClicked={handleKeyClicked}
          expandedIndex={expandedIndex}
          isConnectivityMap={isConnectivityMap}
          ConnectivityLinks={ConnectivityLinks}
          ConnectivityNodes={ConnectivityNodes}
        ></DialogContent>
        <BackButton stack={stack} handleBackward={handleBackward}></BackButton>
      </Dialog>
    </Container>
  );
}
