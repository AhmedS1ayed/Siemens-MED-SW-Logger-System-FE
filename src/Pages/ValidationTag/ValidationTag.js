import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getColumnName } from "../../Utils/utilities";
import { Container, Dialog, Divider, Grid } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import "./ValidationTag.css";

let filteredData = null;
export default function ValidationTag() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  const testcaseId = searchParams.get("testcaseId");

  const [selectedRow, setSelectedRow] = useState(-1);
  const [openDialogs, setOpenDialogs] = useState([]);

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `http://localhost:8080/validationTags/testCases?testSuite.id=${testsuitId}&testCase.id=${testcaseId}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data gat", data);
        if (data) {
          setData(data);
        }
        console.log("data --------- :", data);
      })
      .catch((error) => console.error("m4 48alaaaaaaaaaaaaaaa"));
  }, []);

  let [flattenedData, setflattenedData] = useState([
    {
      _id: "none",
    },
  ]);
  useEffect(() => {
    if (selectedRow !== -1) {
      setOpenDialogs(data[selectedRow]["validationPoints"].map(() => false));
    }
  }, [data, selectedRow]);
  let sad = [];
  let meta = [];
  let combinedData = [];
  let data_columns = [];
  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };
  const handleRowClick = (rowIdx) => {
    rowIdx === selectedRow ? setSelectedRow(-1) : setSelectedRow(rowIdx);
  };

  if (data) {
    data.forEach((row) => getColumnName(row, data_columns));
  }

  if (data.length) {
    // loop over the data and get metadata only
    //flattenedData = data.map((item) => flattenObject(item));
    console.log("data: ", data);
    for (let i = 0; i < data.length; i++) {
      meta.push(data[i]["metaData"]);
    }
  }
  if (meta.length) {
    console.log("asdsdsaddsad", meta);
    if (data_columns) {
      filteredData = data.map((item) => {
        const filteredItem = {};
        Object.keys(item).forEach((key) => {
          if (
            data_columns.some(
              (column) =>
                column.name.substring(column.name.lastIndexOf(".") + 1) === key
            )
          )
            filteredItem[key] = item[key];
        });
        return filteredItem;
      });

      let metaFiltered = meta.map((item) => {
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

      combinedData = filteredData.map((item, index) => {
        return { ...item, ...metaFiltered[index] };
      });
    }

    return (
      <Container maxWidth="xl">
        <ExpandableRowTable
          title="Validation Tags"
          Data={combinedData}
          regularColumns={data_columns}
          expandable={true}
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
                <h2 className="validation_points_header">Validation Points</h2>
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
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Box className="validation_point scale-up-center">
                      <TreeView
                        aria-label="file system navigator"
                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        sx={{
                          height: 300,
                          flexGrow: 1,
                          maxWidth: 400,
                          overflowY: "auto",
                        }}
                      >
                        {Object.keys(valid_point).map((valid_key) => {
                          if (valid_key !== "results") {
                            return (
                              <>
                                <TreeItem nodeId={valid_key} label={valid_key}>
                                  {Object.keys(valid_point[valid_key]).map(
                                    (valid_data) => {
                                      return (
                                        <TreeItem
                                          nodeId={valid_data}
                                          label={
                                            valid_data +
                                            ": " +
                                            valid_point[valid_key][valid_data]
                                          }
                                        />
                                      );
                                    }
                                  )}
                                </TreeItem>
                                <Divider className="divider" />
                              </>
                            );
                          }
                        })}
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
                        {console.log("valid_point: ", valid_point)}
                        <ExpandableRowTable
                          Data={valid_point["results"]}
                          regularColumns={sad}
                          expandable={false}
                          onRowClickEnabled={false}
                        />
                      </Dialog>
                    </Box>
                  </Grid>
                );
              })}
          </Grid>
        </section>
      </Container>
    );
  }
}
