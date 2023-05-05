import React from "react";
import { Link, useLocation } from "react-router-dom";
// import data from "../../Data/Mock_Test_Case.json";
import { getColumnName, getKeys } from "../../Utils/utilities";
import { Dialog,Container , Card } from "@mui/material";
import StatisticCard from "../../Components/statistics/StatisticsCard";
import "../../Components/statistics/StatisticsCard.css";
import { useEffect, useState } from "react";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import LinkIcon from "@mui/icons-material/Link";

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
  const [dataKeys,setDataKeys] = useState(['None']);


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  // ! This is not working backend need to implement a new api
  const testcaseId = searchParams.get("testcaseId");
  useEffect(() => {
    fetch(`http://localhost:8080/testCases/?testSuite[_id]=${testsuitId}`)
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
    setClickedIdx(index);
    setNestedData(data[index]['metaData']);
    setDataKeys(getKeys(data[index]['metaData']));
    toggleDialog(index);
  }
  const handleKeyClicked = (item) => 
  {
    setNestedData(nestedData[item]);
    const keys = getKeys(nestedData[item]);
    setDataKeys(keys);
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
            <LinkIcon />
          </Link>
        );
      },
    },
  });

  let count = 0;
  data_columns.unshift({
    name: "INDEX",
    label: "INDEX",
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
    // <Container>
    //     <div className="statistics-container">
    //     <StatisticCard title="Total Test Cases" count={totalTestCases} color="#00a3e0" />
    //     <StatisticCard title="Successful Test Cases" count={successfulTestCases} color="#00b894" />
    //     <StatisticCard title="Failed Test Cases" count={failedTestCases} color="#e74c3c" />
    //   </div>
  
    //   <DataGrid data={data} data_columns={data_columns} />
    <Container maxWidth="x">
      <div className="statistics-container">
        <StatisticCard
          title="Total Test Cases"
          count={totalTestSuites}
          color="#ffffff"
          icon="equalizer"
        />
        <StatisticCard
          title="Successful Test Cases"
          count={successfulTestSuites}
          color="#fffff0"
          icon="check"
        />
        <StatisticCard
          title="Failed Test Cases"
          count={failedTestSuites}
          color="#ffffff"
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
              onClose={() => toggleDialog(idx)}
              open={openDialogs[idx]}
            >
              {dataKeys.map((item) =>{
                return(
                <div className="display: inline"><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{item}</button>
                </div>)})}
              <div className="display:inline">
              {Object.keys(nestedData).map((key,value) =>{
                if(typeof nestedData[key] != "object")
                return(
                <Card className="card">
                <div className="header">{key}</div>
                <div className="header_detail">
                  <div className="header_detail2" >{nestedData[key]}</div>
                </div>
                
                </Card> 
                )})}
                </div>
      </Dialog>
    </Container>
  );
}
