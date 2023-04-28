import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import data from "../../Data/log.json";
import { getColumnName } from "../../Utils/utilities";
import { Container } from "@mui/material";
import ExpandableRowTable from "../../Components/NewTable/NewTable";
import { Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export default function ValidationTag() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const testsuitId = searchParams.get("testsuitId");
  const testcaseId = searchParams.get("testcaseId");

  const [selectedRow, setSelectedRow] = useState(-1);

  let data_columns = [];
  data.forEach((row) => getColumnName(row, data_columns));

  const handleRowClick = (rowIdx) => {
    rowIdx === selectedRow ? setSelectedRow(-1) : setSelectedRow(rowIdx);
  };

  return (
    <Container maxWidth="xl">
      <ExpandableRowTable
        title="Test Suites"
        Data={data}
        regularColumns={data_columns}
        expandable={false}
        onRowClickEnabled={true}
        onRowClick={handleRowClick}
      />
      <section>
        <Box>
          <h2>Validation Points</h2>
        </Box>
        <Box className="validatio_points_container">
          {/* <TreeView
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
          >
            <TreeItem nodeId="1" label="Applications">
              <TreeItem nodeId="2" label="Calendar" />
            </TreeItem>
          </TreeView> */}
          {selectedRow !== -1 &&
            data[selectedRow]["validation_points"].map((valid_point) => {
              return (
                <Box>
                  <TreeView
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    sx={{
                      height: 240,
                      flexGrow: 1,
                      maxWidth: 400,
                      overflowY: "auto",
                    }}
                  >
                    {Object.keys(valid_point).map((valid_key) => {
                      return (
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
                      );
                    })}
                  </TreeView>
                </Box>
              );
            })}
        </Box>
      </section>
    </Container>
  );
}
