import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./DataGrid.css";
import { useState } from "react";

export default function BasicExampleDataGrid({ data, data_columns }) {
  return (
    <div style={{ height: 800, width: "100%" }} className="dataGridContainer">
      <DataGrid
        columns={data_columns}
        rows={data}
        slots={{ toolbar: GridToolbar }}
        getRowId={(row) => row._id}
        getRowClassName={() => "row-border"}
        sx={{
          flex: 1,
          boxShadow: "1px 1px 5px 2px #00a3e0",
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "20px",
          borderColor: "primary.light",
          marginTop: "40px",
          fontWeight: "bold",
        }}
        classes={{
          colCellWrapper: "col-cell-wrapper",
        }}
      />
    </div>
  );
}
