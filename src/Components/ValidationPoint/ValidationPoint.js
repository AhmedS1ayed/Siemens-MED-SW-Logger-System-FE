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
import { cleanData, getColumnName } from "../../Utils/utilities";
import ExpandableRowTable from "../DataTable/DataTable";
import "./ValidationPoint.css";

export default function ValidaitonPoint({ data, selected_row }) {
  // Lists to keep track of opened dialogs and fliped cards
  const [open_dialogs, set_open_dialogs] = useState([]);
  const [fliped_cards, set_fliped_cards] = useState([]);
  // List contains name of keys that we want to expand by default inside tree
  const defaultExpanded = ["levels"];
  let data_columns_names = [];

  // reset all dialogs to close
  useEffect(() => {
    if (selected_row !== -1) {
      set_open_dialogs(data[selected_row]["validationPoints"].map(() => false));
    }
  }, [data, selected_row]);

  const toggleDialog = (index) => {
    const new_open_dialogs = [...open_dialogs];
    new_open_dialogs[index] = !new_open_dialogs[index];
    set_open_dialogs(new_open_dialogs);
  };

  const flip = (idx) => {
    const new_fliped_cards = [...fliped_cards];
    new_fliped_cards[idx] = !new_fliped_cards[idx];
    set_fliped_cards(new_fliped_cards);
  };

  // search on data as we find objects create more levels of the treeItem else return one treeItem
  const renderTree = (data) => {
    return Object.keys(data).map((sub_data) => {
      if (
        // remove all these data from being rendered inside tree
        sub_data !== "results" &&
        sub_data !== "status" &&
        sub_data !== "parent" &&
        sub_data !== "id" &&
        sub_data !== "metaData"
      ) {
        if (typeof data[sub_data] === "object") {
          return (
            <>
              {/* go deep on each object untill they finish */}
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
                  <div className="tree_item_key">{cleanData(sub_data)}</div>
                  <div className="tree_item_value">{cleanData(data[sub_data])}</div>
                </div>
              }
            />
          );
        }
      }
      return <></>;
    });
  };

  return (
    <section
      className="validation_points_section"
      id="validation_points_section"
    >
      <Box>
        {selected_row === -1 ? (
          <h2 className="validation_points_header">
            Click on a row to show validation points
          </h2>
        ) : (
          <div>
            <h2 className="validation_points_header" > {cleanData(data[selected_row]['metaData']["name"])} Points</h2>
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
        {selected_row !== -1 &&
          data[selected_row]["validationPoints"].map((valid_point, idx) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                {/*if card is flipped give it flip class */}
                <div className={`card ${fliped_cards[idx] ? "flip" : ""}`} style={{border_raduis:"100px"}}>
                  <div className="face front">
                    <Card className="validation_point scale-up-center">
                      <CardHeader
                        //give validation_point specific class represents its state pass or fail
                        className={`valid_point_header_${valid_point["status"]}`}
                        // create validation point name by mergin validation tag name and validation point levels
                        title={
                          data[selected_row]["metaData"]["name"] +
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
                          open={open_dialogs[idx]}
                        >
                          {valid_point["results"].forEach((result) =>
                            getColumnName(result, data_columns_names)
                          )}
                          <ExpandableRowTable
                            Data={valid_point["results"]}
                            regularColumns={data_columns_names}
                            expandable={false}
                            onRowClickEnabled={false}
                          />
                        </Dialog>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="face back">
                    {/*put meta_data content on the back card */}
                    <div className="metaData">
                      <Card>
                        <CardHeader
                          className={`valid_point_header_${valid_point["status"]}`}
                          // create validation point name by mergin validation tag name and validation point levels
                          title={
                            cleanData(data[selected_row]["metaData"]["name"]) +
                            Object.keys(valid_point["levels"]).map(
                              (level_key) => {
                                return cleanData(` ${level_key} ${valid_point["levels"][level_key]} `);
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
                            {/*render meta_data content */}
                            {Object.keys(valid_point["metaData"]).map((key) => {
                              return (
                                <div className="metaData_content">
                                  <div className="metaData_key">{key}</div>
                                  <div className="metaData_value">
                                    {cleanData(valid_point["metaData"][key])}
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
