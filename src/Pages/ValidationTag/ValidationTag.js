import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
// import data from "../../Data/log.json";
import { getColumnName } from "../../Utils/utilities";
import { CardContent, Container, Dialog, Divider, Grid } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import "./ValidationTag.css";
import {Card, CardHeader} from "@mui/material";


let filteredData = null;
export default function ValidationTag() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  const testcaseId = searchParams.get("testcaseId");

  const defaultExpanded = ["levels"]
  const [selectedRow, setSelectedRow] = useState(-1);
  const [openDialogs, setOpenDialogs] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/validationTags/testCases?testSuite.id=${testsuitId}&testCase.id=${testcaseId}`)
      .then(response => response.json())
      .then(data => {
        if(data && data.length != 0)  
        {
          setData(data);
        }
        console.log("validation taga: ",data);
      })
      .catch(error => console.error(error));
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

  useEffect(() => {
    if (selectedRow !== -1) {
      setOpenDialogs(data[selectedRow]["validationPoints"].map(() => false));
    }
  }, [data, selectedRow]);

  // const handleToggle = (event, nodeIds) => {
  //   setExpanded(nodeIds);
  // };

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  const handleRowClick = (rowIdx) => {
    rowIdx === selectedRow ? setSelectedRow(-1) : setSelectedRow(rowIdx);
  };

  const renderTree = (data) => {
    return (
      Object.keys(data).map((sub_data) => {
        console.log("sub: ", sub_data)
        if(sub_data !== 'results' && sub_data !== 'isSuccessful' && sub_data !== 'parent' && sub_data !== 'id'){
          if(typeof data[sub_data] === 'object'){
            return(
              <>
                <TreeItem key={sub_data} nodeId={sub_data} label={sub_data}>
                  {renderTree(data[sub_data])}
                </TreeItem>
                <Divider className="divider" />
              </>
            )
          }else {
            return(
              <TreeItem className="tree_item" key={sub_data} nodeId={sub_data} label={<div className="tree_item_content"><div className="tree_item_key">{sub_data}</div><div className="tree_item_value">{data[sub_data]}</div></div>}/>
            )
          }
       }
      })
    )
  }

  let sad = [];
  let meta = [];
  let combinedData = [];

  if(typeof data[0] !== 'undefined' && typeof data[0]['validationPoints'] !== 'undefined'){
     for(let i = 0 ; i < data.length ; i++){
      meta.push(data[i]['metaData']);
     }  
  }

  if(meta){
    if(data_columns){
        filteredData = data.map((item) => {
          const filteredItem = {};
          Object.keys(item).forEach((key) => {
            if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });

        let metaFiltered = meta.map((item) => {
          const filteredItem = {};
          Object.keys(item).forEach((key) => {
            if (data_columns.some((column) => column.name.substring(column.name.lastIndexOf(".") + 1) === key)) {
              filteredItem[key] = item[key];
            }
          });
          return filteredItem;
        });

        combinedData = filteredData.map((item, index) => {
          return { ...item, ...metaFiltered[index] };
        });

    }
  console.log('filteredData',filteredData);
  return (
    <Container maxWidth="x">
      <ExpandableRowTable
        title="Validation Tags"
        Data={combinedData}
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled={true}
        onRowClick={handleRowClick}
      />

      <section className="validation_points_section">
        <Box>
          {selectedRow === -1 ? (
            <h2 className="validation_points_header">
              Click on a row to show validation points
            </h2>
          ) : (
            <div>
            <h2 className="validation_points_header">
              Validation Points 
            </h2>
            <h2 className="validation_points_header">
            {data[selectedRow]["name"]}
            </h2>
          </div>
          )}
        </Box>

        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 6, sm: 10, md: 11, lg: 12 }}
          direction="row"
          justifyContent="space-evenly"
          className="validation_points_container"
        >
          {selectedRow !== -1 &&
            
            data[selectedRow]["validationPoints"].map((valid_point, idx) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Card className="validation_point scale-up-center">
                    <CardHeader className={`valid_point_header_${valid_point['isSuccessful']}`} title={
                      data[selectedRow]['metaData']['name'] + Object.keys(valid_point['levels']).map((level_key) => {
                      return `-${level_key} ${valid_point['levels'][level_key]}`
                    })} />
                    <CardContent>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      defaultExpanded={defaultExpanded}
                      sx={{
                        height: 300,
                        flexGrow: 1,
                        maxWidth: "95%",
                        overflowY: "auto",
                      }}
                    >
                      {renderTree(valid_point)}
                    </TreeView>
                    <button
                      className="results_btn"
                      onClick={() => toggleDialog(idx)}
                    >
                      Results
                    </button>
                    <Dialog
                      onClose={() => toggleDialog(idx)}
                      open={openDialogs[idx]}
                    >
                      {valid_point["results"].forEach((result) =>
                        getColumnName(result, sad)
                      )}
                      <ExpandableRowTable
                        Data={valid_point["results"]}
                        regularColumns={sad}
                        expandable={false}
                        onRowClickEnabled={false}
                      />
                    </Dialog>
                    </CardContent>
                    
                  </Card>
                  {/* <Box className="validation_point scale-up-center">
                    {console.log("valid: ", valid_point)}
                    <h6 className={`valid_point_header_${valid_point['isSuccessful']}`}>{
                      data[selectedRow]['metaData']['name'] + Object.keys(valid_point['levels']).map((level_key) => {
                      return `-${level_key} ${valid_point['levels'][level_key]}`
                    })}</h6>
                    <TreeView
                      aria-label="file system navigator"
                      defaultCollapseIcon={<ExpandMoreIcon />}
                      defaultExpandIcon={<ChevronRightIcon />}
                      sx={{
                        height: 300,
                        flexGrow: 1,
                        maxWidth: "95%",
                        overflowY: "auto",
                      }}
                    >
                      {renderTree(valid_point)}
                    </TreeView>
                    <button
                      className="results_btn"
                      onClick={() => toggleDialog(idx)}
                    >
                      Results
                    </button>
                    <Dialog
                      onClose={() => toggleDialog(idx)}
                      open={openDialogs[idx]}
                    >
                      {valid_point["results"].forEach((result) =>
                        getColumnName(result, sad)
                      )}
                      <ExpandableRowTable
                        Data={valid_point["results"]}
                        regularColumns={sad}
                        expandable={false}
                        onRowClickEnabled={false}
                      />
                    </Dialog>
                  </Box> */}
                </Grid>
              );
            })}
        </Grid>
      </section>
    </Container>
  );
          }
}