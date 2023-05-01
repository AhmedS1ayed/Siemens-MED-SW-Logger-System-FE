import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import data from "../../Data/log.json";
import { getColumnName } from "../../Utils/utilities";
import { Container, Dialog, Divider, Grid } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import "./ValidationTag.css";

export default function ValidationTag() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  const testcaseId = searchParams.get("testcaseId");

  const [selectedRow, setSelectedRow] = useState(-1);
  const [openDialogs, setOpenDialogs] = useState([]);

  useEffect(() => {
    if (selectedRow !== -1) {
      setOpenDialogs(data[selectedRow]["validation_points"].map(() => false));
    }
  }, [data, selectedRow]);

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

  let sad = [];
  return (
    <Container maxWidth="x">
      
      <ExpandableRowTable
        title="Test Suites"
        Data={data}
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
            <h2 className="validation_points_header">
              Validation Points 
            </h2>
            <h2 className="validation_points_header">
            {data[selectedRow]["name"]}
            </h2>
          </div>
            // <h2 className="validation_points_header">Validation Points </h2>
            // <h2 className="validation_points_header">Validation Points of {data[selectedRow]["name"]}  </h2>
            // <h3 validation_points_header> {data[selectedRow]["name"]}</h3>
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
            data[selectedRow]["validation_points"].map((valid_point, idx) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                  
                  <Box className="validation_point scale-up-center">
                    {/* console.log({valid_point}) */}
                 
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
                      {console.log("saddassd", sad)}
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
