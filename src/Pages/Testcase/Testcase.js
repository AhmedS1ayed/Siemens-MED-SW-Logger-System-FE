import React from "react";
import { Dialog, Container } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import { BackButton } from "../../Components/DialogContent/BackButton.js";
import { DialogContent } from "../../Components/DialogContent/DialogContent.js";
import { DialogPath } from "../../Components/DialogContent/DialogPath.js";
import TestCaseHook from "../../Hook/test-case-hook";

export default function Testcase() {
  const [
    handleBackward,
    handleKeyClicked,
    handleRowClicked,
    toggleDialog,
    failedTestSuites,
    successfulTestSuites,
    totalTestSuites,
    testcaseId,
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
    <Container key={Math.random()} maxWidth="x">
      <div className="statistics-container">
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
      </div>
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
        open={openDialogs[idx]}
        maxWidth={"xl"}
        style={{ borderRadius: "50px" }}
      >
        <DialogPath
          style={{ padding: "10px", fontWeight: "bold", fontSize: "16px" }}
          path={path}
        ></DialogPath>
        <DialogContent
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          nestedData={nestedData}
          handleKeyClicked={handleKeyClicked}
        ></DialogContent>
        <BackButton stack={stack} handleBackward={handleBackward}></BackButton>
      </Dialog>
    </Container>
  );
}
