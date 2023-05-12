import React, { useRef } from "react";
import { Card, Container, Dialog } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { Link } from "react-router-dom";
import ExpandableRowTable from "../../Components/NewTable/NewTable.js";
import { useEffect } from "react";
import { useState } from "react";
import { getColumnName, getKeys } from "../../Utils/utilities";
import LinkIcon from "@mui/icons-material/Link";
import "./Testsuit.css";
import BasicFlow from "../../Components/ConnectivityMap/ConnectivityMap";
import { flattenObject, cleanData } from "../../Utils/utilities";
import { DateRange, InsertDriveFile } from "@material-ui/icons";
import { BackButton } from "../../Components/DialogContent/BackButton.js";
import { DialogContent } from "../../Components/DialogContent/DialogContent.js";
import { DialogPath } from "../../Components/DialogContent/DialogPath.js";

let filteredData = null;
export default function Testsuit() {
  let flattenedData = [];
  let ConnectivityLinks = [];
  let ConnectivityNodes = [];

  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);

  useEffect(() => {
    fetch("http://localhost:8080/TestSuites/")
      .then((response) => response.json())
      .then((data) => {
        if (data) setData(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const [openDialogs, setOpenDialogs] = useState([]);
  const [idx, setClickedIdx] = useState(0);
  const [nestedData, setNestedData] = useState("None");
  const [isConnectivityMap, setConnectivityMap] = useState(false);
  const [stack, setStack] = useState(["none"]);
  const [path, setPath] = useState(["Configurations"]);
  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const handleRowClicked = (index) => {
    setClickedIdx(index);
    setNestedData(data[index]["metaData"]["design_info"]);
    setConnectivityMap(false);
    setStack(["none"]);
    toggleDialog(index);
  };

  const handleKeyClicked = (item) => {
    setStack([...stack, nestedData]);
    setNestedData(nestedData[item]);
    const keys = getKeys(nestedData[item]);
    if (item === "sa_connectivity_map" || item === "mpg_connectivity_map") {
      setConnectivityMap(true);
    } else {
      setConnectivityMap(false);
    }
    setPath([...path, cleanData(item)]); // add user's selection to path
  };
  const handleBackward = () => {
    setNestedData(stack[stack.length - 1]);
    stack.pop();
    //Might need some fixes in the future
    setConnectivityMap(false);
    setPath(path.slice(0, path.length - 1));
  };

  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  let count = 0;
  data_columns.unshift({
    name: "INDEX",
    label: "INDEX",
    options: {
      filter: false,
      sort: true,
      customBodyRender: () => {
        if (count === data.length) count = 0;
        count++;
        return count;
      },
    },
  });

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        let testsuitId = null;
        if (data) {
          testsuitId = data[tableMeta.rowIndex].id;
        }
        return (
          <Link to={`/testcases?testsuitId=${testsuitId || ""}`}>
            <LinkIcon className="custom-link" style={{ color: "black" }} />
          </Link>
        );
      },
    },
  });

  console.log("path", path);
  if (data) {
    flattenedData = data.map((item) => flattenObject(item));
  }
  if (flattenedData) {
    if (data_columns) {
      filteredData = flattenedData.map((item) => {
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
    }
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
          open={openDialogs[idx]}
          maxWidth={isConnectivityMap ? undefined : "xl"}
          // maxHeight={isConnectivityMap ? undefined : false}
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
            setExpandedIndex={setExpandedIndex}
            handleKeyClicked={handleKeyClicked}
            expandedIndex={expandedIndex}
            isConnectivityMap={isConnectivityMap}
            ConnectivityLinks={ConnectivityLinks}
            ConnectivityNodes={ConnectivityNodes}
          ></DialogContent>
          <BackButton
            stack={stack}
            handleBackward={handleBackward}
          ></BackButton>
        </Dialog>
      </Container>
    );
  }
}
