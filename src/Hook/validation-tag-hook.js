import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { dataRepresentationVT } from "../Utils/dataRepresentationVT";

function ValidationTagHook() {
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
        if (data && data.length !== 0) {
          setData(data);
        }
        console.log("validation taga: ", data);
      })
      .catch((error) => console.error(error));
  }, [testcaseId, testsuitId]);

  const [data, setData] = useState([
    {
      id: "none",
    },
  ]);
  const handleRowClick = (rowIdx) => {
    rowIdx === selectedRow ? setSelectedRow(-1) : setSelectedRow(rowIdx);
    window.location.href = "#validation_points_section";
  };

  const [combinedData, data_columns] = dataRepresentationVT(data);

  return [combinedData, data_columns, handleRowClick, data, selectedRow];
}

export default ValidationTagHook;
