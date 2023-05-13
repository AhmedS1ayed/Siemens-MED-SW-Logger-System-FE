import { useEffect, useState } from "react";
import { useNestedData } from "./useNestedData";
import { dataRepresentationTC } from "../Utils/dataRepresentationTC";
import { useLocation } from "react-router-dom";
import { cleanData, getItemId } from "../Utils/utilities";
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
    setConnectivityMap,
    stack,
    setStack,
    path,
    setPath,
  } = useNestedData();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
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
  }, [testsuitId]);

  const totalTestSuites = data.length;
  const successfulTestSuites = data.filter(
    (item) => item.isSuccessful === true
  ).length;
  const failedTestSuites = data.filter(
    (item) => item.isSuccessful === false
  ).length;

  const toggleDialog = () => {
    setOpenDialogs(!openDialogs);
    setConnectivityMap(false);
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
    setPath(path.slice(0, path.length - 1));
  };
  console.log('data' , data);
  return [
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
    stack
  ];
}

export default TestCaseHook;
