import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getColumnName } from "../../Utils/utilities";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import {Container} from "@mui/material";
import "./ValidationTag.css";
import ValidaitonPoint from "../../Components/ValidationPoint/ValidationPoint";

let filteredData = null;
export default function ValidationTag() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  const testcaseId = searchParams.get("testcaseId");
  const [selectedRow, setSelectedRow] = useState(-1);
  
  useEffect(() => {
    fetch(
      `http://localhost:8080/validationTags/testCases?testSuite.id=${testsuitId}&testCase.id=${testcaseId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length != 0) {
          setData(data);
        }
        console.log("validation taga: ", data);
      })
      .catch((error) => console.error(error));
  }, []);

  let [flattenedData, setflattenedData] = useState([
    {
      _id: "none",
    },
  ]);

  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  const handleRowClick = (rowIdx) => {
    rowIdx === selectedRow ? setSelectedRow(-1) : setSelectedRow(rowIdx);
  };

  let meta = [];
  let combinedData = [];

  if (
    typeof data[0] !== "undefined" &&
    typeof data[0]["validationPoints"] !== "undefined"
  ) {
    for (let i = 0; i < data.length; i++) {
      meta.push(data[i]["metaData"]);
    }
  }

  if (meta) {
    if (data_columns) {
      filteredData = data.map((item) => {
        const filteredItem = {};
        Object.keys(item).forEach((key) => {
          if (
            data_columns.some(
              (column) =>
                column.name.substring(column.name.lastIndexOf(".") + 1) === key
            )
          ) {
            filteredItem[key] = item[key];
          }
        });
        return filteredItem;
      });

      let metaFiltered = meta.map((item) => {
        const filteredItem = {};
        Object.keys(item).forEach((key) => {
          if (
            data_columns.some(
              (column) =>
                column.name.substring(column.name.lastIndexOf(".") + 1) === key
            )
          ) {
            filteredItem[key] = item[key];
          }
        });
        return filteredItem;
      });

      combinedData = filteredData.map((item, index) => {
        return { ...item, ...metaFiltered[index] };
      });
    }
    return (
      <Container maxWidth="xl">
        <ExpandableRowTable
          title="Validation Tags"
          Data={combinedData}
          regularColumns={data_columns}
          expandable={false}
          onRowClickEnabled={true}
          onRowClick={handleRowClick}
        />
        <ValidaitonPoint data={data} selectedRow={selectedRow} />
      </Container>
    );
  }
}
