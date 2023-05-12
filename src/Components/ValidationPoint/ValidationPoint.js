import React, { useEffect, useState } from "react";
import {
  CardContent,
  Dialog,
  Divider,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Card, CardHeader } from "@mui/material";
import { getColumnName } from "../../Utils/utilities";
import ExpandableRowTable from "../NewTable/NewTable";
import "./ValidationPoint.css";

export default function ValidaitonPoint({ data, selectedRow }) {
  // Lists to keep track of opened dialogs and fliped cards
  const [openDialogs, setOpenDialogs] = useState([]);
  const [flipedCards, setFlipedCards] = useState([]);
  // List contains name of keys that we want to expand by default inside tree
  const defaultExpanded = ["levels"];
  let columns = [];

  useEffect(() => {
    if (selectedRow !== -1) {
      setOpenDialogs(data[selectedRow]["validationPoints"].map(() => false));
    }
  }, [data, selectedRow]);

  useEffect(() => {
    if (selectedRow !== -1) {
      setFlipedCards(
        Array(data[selectedRow]["validationPoints"].length).fill(false)
      );
    }
  }, [data, selectedRow]);

  const toggleDialog = (index) => {
    const newOpenDialogs = [...openDialogs];
    newOpenDialogs[index] = !newOpenDialogs[index];
    setOpenDialogs(newOpenDialogs);
  };

  const renderTree = (data) => {
    return Object.keys(data).map((sub_data) => {
      console.log("sub: ", sub_data);
      if (
        sub_data !== "results" &&
        sub_data !== "isSuccessful" &&
        sub_data !== "parent" &&
        sub_data !== "id" &&
        sub_data !== "metaData"
      ) {
        if (typeof data[sub_data] === "object") {
          return (
            <>
              <TreeItem key={sub_data} nodeId={sub_data} label={sub_data}>
                {renderTree(data[sub_data])}
              </TreeItem>
              <Divider className="divider" />
            </>
          );
        } else {
          return (
            <TreeItem
              className="tree_item"
              key={sub_data}
              nodeId={sub_data}
              label={
                <div className="tree_item_content">
                  <div className="tree_item_key">{sub_data}</div>
                  <div className="tree_item_value">{data[sub_data]}</div>
                </div>
              }
            />
          );
        }
      }
    });
  };

  const flip = (idx) => {
    const newFlipedCards = [...flipedCards];
    newFlipedCards[idx] = !newFlipedCards[idx];
    setFlipedCards(newFlipedCards);
  };

  return (
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
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <div className={`card ${flipedCards[idx] ? "flip" : ""}`}>
                  <div className="face front">
                    <Card className="validation_point scale-up-center">
                      <CardHeader
                        className={`valid_point_header_${valid_point["isSuccessful"]}`}
                        title={
                          data[selectedRow]["metaData"]["name"] +
                          Object.keys(valid_point["levels"]).map(
                            (level_key) => {
                              return ` ${level_key} ${valid_point["levels"][level_key]} `;
                            }
                          )
                        }
                      />
                      <CardContent>
                        <TreeView
                          aria-label="file system navigator"
                          defaultCollapseIcon={<ExpandMoreIcon />}
                          defaultExpandIcon={<ChevronRightIcon />}
                          defaultExpanded={defaultExpanded}
                          sx={{
                            height: 380,
                            flexGrow: 1,
                            maxWidth: "95%",
                            overflowY: "auto",
                          }}
                        >
                          {renderTree(valid_point)}
                        </TreeView>
                        <div className="buttons">
                          <button
                            className="results_btn"
                            onClick={() => toggleDialog(idx)}
                          >
                            Results
                          </button>
                          <button
                            className="metaData_btn"
                            onClick={() => flip(idx)}
                          >
                            Meta Data
                          </button>
                        </div>

                        <Dialog
                          onClose={() => toggleDialog(idx)}
                          open={openDialogs[idx]}
                        >
                          {valid_point["results"].forEach((result) =>
                            getColumnName(result, columns)
                          )}
                          <ExpandableRowTable
                            Data={valid_point["results"]}
                            regularColumns={columns}
                            expandable={false}
                            onRowClickEnabled={false}
                          />
                        </Dialog>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="face back">
                    <div className="metaData">
                      <Card>
                        <CardHeader
                          className={`valid_point_header_${valid_point["isSuccessful"]}`}
                          title={
                            data[selectedRow]["metaData"]["name"] +
                            Object.keys(valid_point["levels"]).map(
                              (level_key) => {
                                return ` ${level_key} ${valid_point["levels"][level_key]} `;
                              }
                            )
                          }
                        />
                        <CardContent>
                          <Typography
                            variant="h5"
                            component="div"
                            className="metaData_header"
                          >
                            Meta Data
                          </Typography>
                          <div className="metaData_body">
                            {Object.keys(valid_point["metaData"]).map((key) => {
                              return (
                                <div className="metaData_content">
                                  <div className="metaData_key">{key}</div>
                                  <div className="metaData_value">
                                    {valid_point["metaData"][key]}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <button
                            className="metaData_btn"
                            onClick={() => flip(idx)}
                          >
                            Back
                          </button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </Grid>
            );
          })}
      </Grid>
    </section>
  );
}
