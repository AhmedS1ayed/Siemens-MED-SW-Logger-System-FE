import { useEffect, useState } from "react";
import { useNestedData } from "./useNestedData";
import { dataRepresentationTC } from "../Utils/dataRepresentationTC";
import { useLocation } from "react-router-dom";
import { cleanData } from "../Utils/utilities";
function TestCaseHook() {
  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);
  const [{ filteredData, data_columns }, setFilteredData] = useState(
    dataRepresentationTC(data, "sdas155sad")
  );

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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  // ! This is not working backend need to implement a new api
  const testcaseId = searchParams.get("testcaseId");
  useEffect(() => {
    fetch(`http://localhost:8080/testCases/?testSuite[id]=${testsuitId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data);
          setFilteredData(dataRepresentationTC(data, testsuitId));
        }
      })

      .catch((error) => console.error(error));
  }, []);

  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const handleRowClicked = (index) => {
    setStack([...stack, nestedData]);
    setClickedIdx(index);
    setNestedData(data[index]["metaData"]);
    setStack(["none"]);
    toggleDialog(index);
  };
  const handleKeyClicked = (item) => {
    setStack([...stack, nestedData]);
    setNestedData(nestedData[item]);
    setPath([...path, cleanData(item)]); // add user's selection to path
  };
  const handleBackward = () => {
    setNestedData(stack[stack.length - 1]);
    stack.pop();
    setPath(path.slice(0, path.length - 1));
  };
  return [
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
    stack
  ];
}

export default TestCaseHook;
