import { useEffect, useState } from "react";
import { dataRepresentation } from "../Utils/dataRepresentationTS";
import { cleanData, getItemId } from "../Utils/utilities";
import { useNestedData } from "./useNestedData";

function TestSuiteHook() {
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
        if (data) {
          setData(data);
          setFilteredData(dataRepresentation(data));
        }
      })
      .catch((error) => console.error(error));
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
    expanded,
    setExpanded,
    expandedIndex,
    setExpandedIndex,
  } = useNestedData();

  const toggleDialog = () => {
    setOpenDialogs(!openDialogs);
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

    if(typeof nestedData[item] === "object") 
    {
      let itemN = getItemId(item,nestedData);
      setPath([...path, cleanData(itemN)]);
    }
    else setPath([...path, cleanData(item)]);
  };
  const handleBackward = () => {
    setNestedData(stack[stack.length - 1]);
    stack.pop();
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

  const [{ filteredData, data_columns }, setFilteredData] = useState(
    dataRepresentation(data)
  );

  return ([
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
    handleBackward,
  ]);
}

export default TestSuiteHook;
