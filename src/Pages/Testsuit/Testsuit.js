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
import { flattenObject ,cleanData} from "../../Utils/utilities";
import { DateRange, InsertDriveFile } from "@material-ui/icons";

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
  const [path,setPath] = useState(["Configurations"]);
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
  if(data){
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
        onRowClickEnabled = {true}
        onRowClick={handleRowClicked}
      />
      <Dialog
              onClose={() => {toggleDialog(idx); setNestedData("None"); setStack(["none"]); setPath(["Configurations"]);}}
              open={openDialogs[idx]}
              maxWidth={isConnectivityMap ? undefined : 'xl'}
              // maxHeight={isConnectivityMap ? undefined : false}
              style={{ borderRadius: '50px'}}
            >
              {/* // display path */}
              <div style={{ padding: "10px", fontWeight: "bold", fontSize: "16px" }}>
                {/* what to put instead of the id ? */}
                {data[idx]['id']}: {path.join(" > ")}
              </div>
              <div style={{ display:"flex"}} > 
                  {Object.keys(nestedData).map((item) =>{
                    if(typeof nestedData[item] === "object" && !Array.isArray(nestedData))
                    return(
                    <div className="display: inline" style={{margin:"10px"}}><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{cleanData(item)}</button>
                    </div>)
                    else if( typeof nestedData[item] === "object" && Array.isArray(nestedData))
                    {
                      return (<div className="display: inline" style={{margin:"10px"}}><button className="results_btn" key={item} label={item} onClick = {() =>{handleKeyClicked(item)}}   >{nestedData[item]['id']}</button>
                      </div>);
                    }              
                  })}
                  <div  className="display:flex;"  >
                    {Object.keys(nestedData).map((key,value) =>{
                      if(typeof nestedData[key] != "object" && !isConnectivityMap){
                      return(
                        // TODO: the card should expand and show the value of the key
                      <Card className="card" style={{border_raduis:"10px"}}  onClick={() => setExpandedIndex(expandedIndex === value ? -1 : value)} >
                         <div className="header">{cleanData(key)}</div>
                         <div className={`header_detail ${expandedIndex === value ? "expanded" : ""}`}>
                              <div className="header_detail2">{nestedData[key]}</div>
                            </div>
                      </Card> 
                      )}
                      else if (typeof nestedData[key] != "object" && isConnectivityMap)
                      {
                      
                        // ? show all nodes or just the ones that are connected ? 
                        // and check if it is not already in the connectivity nodes
                        if(key != nestedData[key] && ConnectivityNodes.filter((item) => item.id === key).length === 0 ){
                          console.log(">>>>>> key != nestedData[key] ",key,nestedData[key]);
                        ConnectivityNodes.push({id: key , position: { x: 20+60 * ConnectivityNodes.length  , y:50+ 100 * ConnectivityNodes.length   },data: {label: key } });
                        ConnectivityLinks.push({id:'e_'+key,source: key, target: nestedData[key],  type: 'start-end' ,animated: true, });
                        }
                  
                      }
                      })}
                    </div>
                
                  {isConnectivityMap ? <BasicFlow nodes={ConnectivityNodes} links={ConnectivityLinks} /> : <></>}
                </div>  
                <div style={{padding:"10px"}}  >
                {stack.length > 1 ? (<button className="results_btn" key='back' label='back' onClick = {handleBackward} style={{margin:'10'}}> ← </button>) : <></>}
                </div>
      </Dialog>
      <br />
    </Container>
  );
  }
}
