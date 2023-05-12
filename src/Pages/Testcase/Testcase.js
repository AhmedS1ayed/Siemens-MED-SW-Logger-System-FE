import React from "react";
import { Link, useLocation } from "react-router-dom";
// import data from "../../Data/Mock_Test_Case.json";
import { getColumnName, getKeys , isNumber , cleanData } from "../../Utils/utilities";
import { Dialog,Container , Card } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { useEffect, useState } from "react";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import LinkIcon from "@mui/icons-material/Link";
import { BackButton } from "../../Components/DialogContent/BackButton.js";
import { DialogContent } from "../../Components/DialogContent/DialogContent.js";
import { DialogPath } from "../../Components/DialogContent/DialogPath.js";

export default function Testcase() {

  const [data, setData] = useState(
    [
      {
        id: "none",
      },
    ]);

  const [openDialogs, setOpenDialogs] = useState([]);
  const [idx , setClickedIdx] = useState(0);
  const [nestedData , setNestedData] = useState('None');
  const [stack , setStack] =useState(['none']);  
  const [path, setPath] = useState(["Configurations"]);


  


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  // ! This is not working backend need to implement a new api
  const testcaseId = searchParams.get("testcaseId");
  useEffect(() => {
    fetch(`http://localhost:8080/testCases/?testSuite[id]=${testsuitId}`)
    .then(response => response.json())
    .then(data => {if(data) setData(data);})
    
      .catch(error => console.error(error));
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

  const handleRowClicked = (index) => 
  {
    setStack([...stack,nestedData]);
    setClickedIdx(index);
    setNestedData(data[index]['metaData']);
    setStack(['none']);
    toggleDialog(index);
  }
  const handleKeyClicked = (item) => 
  {
    setStack([...stack,nestedData]);
    setNestedData(nestedData[item]);
    setPath([...path, cleanData(item)]); // add user's selection to path
  }
  const handleBackward = ()=>
  {
    setNestedData(stack[stack.length-1]);
    stack.pop();
    setPath(path.slice(0, path.length - 1));
    //Might need some fixes in the future
  }

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  data_columns.push({
    name: "",
    label: "",
    options: {
      filter: false,
      sort: false,
      customBodyRender: (value, tableMeta, updateValue) => {
        
        const testcaseId = data[tableMeta.rowIndex].id;
        return (
          <Link
            to={`/validtags?testsuitId=${testsuitId}&testcaseId=${testcaseId}`}
          >
            <LinkIcon className ="custom-link" style={{ color: 'black' }}/>
          </Link>
        );
      },
    },
  });

  let count = 0;
  data_columns.unshift({
    name: "ID",
    label: "ID",
    options: {
      filter: false,
      sort: true,
      customBodyRender: () => {
       if(count === data.length) count = 0; 
        count++;
        return (count);
      },
    },
  });


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
        Data={data}
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
          <BackButton
            stack={stack}
            handleBackward={handleBackward}
          ></BackButton>
        </Dialog>
    </Container>
  );
}
