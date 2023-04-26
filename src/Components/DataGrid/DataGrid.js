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
        getRowId={(row) => row.ID}
        getRowClassName={() => "row-border"}
        sx={{
          boxShadow: 2,
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "20px",
          borderColor: "primary.light",
          marginTop: "40px",
          fontWeight: "bold",
        }}
      />
    </div>
  );
}
