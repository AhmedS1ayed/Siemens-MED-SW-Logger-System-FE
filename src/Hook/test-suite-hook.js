import { useEffect, useState } from "react";
import { dataRepresentation } from "../Utils/dataRepresentationTS";
import { cleanData, getItemId } from "../Utils/utilities";
import { useNestedData } from "./useNestedData";

function TestSuiteHook() {
  let connectivity_links = [];
  let connectivity_nodes = [];

  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);
  // Fetch Data of test suites
  useEffect(() => {
    fetch("http://localhost:8080/TestSuites/")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data);
          setFilteredData(dataRepresentation(data));
          console.log("data: ", data);
        }
      })
      .catch((error) => {
        console.error("error while fetching Testsuites data: ", error);
      });
  }, []);

  const {
    openDialogs,
    setOpenDialogs,
    idx,
    setClickedIdx,
    nestedData,
    setNestedData,
    isConnectivityMap,
    setConnectivityMap,
    stack,
    setStack,
    path,
    setPath,
  } = useNestedData();

  const toggleDialog = () => {
    setOpenDialogs(!openDialogs);
    setConnectivityMap(false);
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
    if (item === "sa_connectivity_map" || item === "mpg_connectivity_map") {
      setConnectivityMap(true);
    } else {
      setConnectivityMap(false);
    }

    if (typeof nestedData[item] === "object") {
      let itemN = getItemId(item, nestedData);
      setPath([...path, cleanData(itemN)]);
    } else setPath([...path, cleanData(item)]);
  };
  const handleBackward = () => {
    setNestedData(stack[stack.length - 1]);
    stack.pop();
    setConnectivityMap(false);
    setPath(path.slice(0, path.length - 1));
  };

  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.status === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.status === false
  ).length;

  const [{ filteredData, data_columns }, setFilteredData] = useState(
    dataRepresentation(data)
  );

  return [
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
    connectivity_links,
    connectivity_nodes,
    stack,
    handleBackward,
  ];
}

export default TestSuiteHook;
