import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./NewTable.css";
import { useState } from "react";
import { useEffect } from "react";

export default function BasicExampleDataGrid(props) {

  const handleRowDoubleClick = (params) => {
    window.location.href = `/testcases?testsuitId=${params.id}`;
  };

  const CustomToolbar = () => {
    return (
      <GridToolbar>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "16px" }}>Custom Toolbar</div>
          <div style={{ backgroundColor: "#00a3e0", marginRight: "8px" }}>
            <GridToolbar.FilterButton />
          </div>
          <div style={{ backgroundColor: "#00a3e0" }}>
            <GridToolbar.ExportButton />
          </div>
        </div>
      </GridToolbar>
    );
  };

  const getColumnsName = (data, columnWidts = {}) => {
    return Object.keys(data)
      .map((field) => {
        if (typeof data[field] !== "object") {
          let columnWidth = columnWidts[field] || 120;
          return {
            field,
            headerName: field,
            headerClassName: "super-app-theme--header",
            renderCell: (params) => {
              if (params.value === true) {
                return (
                  <span className="success-class">
                    <CheckIcon />
                  </span>
                );
              } else if (params.value === false) {
                return (
                  <span className="failed-class">
                    <ClearIcon />
                  </span>
                );
              } else {
                return params.value;
              }
            },
            width: columnWidth,
            flex: 1,
          };
        }
        return null;
      })
      .filter((column) => column !== null);
  };

  let data_columns = getColumnsName(props.data[0], { dateCreated: 250 });
  // data_columns.push({
  //   field: "delete",
  //   headerName: "delete",
  //   width: 70,
  //   headerClassName: "super-app-theme--header",
  //   sortable: false,
  //   filterable: false,
  //   disableColumnMenu: true,
  //   renderCell: (params) => (
  //     <DeleteIcon
  //       color="primary"
  //       style={{ cursor: "pointer" }}
  //       onClick={() => console.log(`Deleting row ${params.id}`)}
  //     />
  //   ),
  // });
  // const getRowClassName = (params) => {
  //   return clsx("row-border", {
  //     "clickable-row": true, // add a class for clickable rows
  //   });
  // };

  return (
    <div style={{ height: 800, width: "100%" }} className="dataGridContainer">
      <DataGrid
        columns={data_columns}
        rows={props.data}
        slots={{ toolbar: GridToolbar }}
        getRowId={(row) => row.ID}
        getRowClassName={() => "row-border"}
        onRowDoubleClick={handleRowDoubleClick}
        components={{
          Toolbar: CustomToolbar, // use the custom toolbar component
        }}
        sx={{
          autoWidth: true,
          boxShadow: "1px 1px 5px 2px  #00a3e0",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "20px",
          // borderColor: "primary.light",
          marginTop: "40px",
          fontWeight: "bold",
          ":hover": { cursor: "pointer" },
        }}
        // autoHeight={true}
      />
    </div>
  );
}
