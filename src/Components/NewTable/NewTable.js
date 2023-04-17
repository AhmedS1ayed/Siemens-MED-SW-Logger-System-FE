import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import id from "../../Data/Mock_Data.json";

export default function BasicExampleDataGrid() {
  const handleRowDoubleClick = (params) => {
    window.location.href = `/testcases?testsuitId=${params.id}`;
  };

  const getColumnsName = (data) => {
    return Object.keys(data)
      .map((field) => {
        if (typeof data[field] !== "object") {
          return {
            field,
            headerName: field,
          };
        }
        return null;
      })
      .filter((column) => column !== null);
  };

  return (
    <div style={{ height: 800, width: "100%" }}>
      <DataGrid
        columns={getColumnsName(id[0])}
        rows={id}
        slots={{ toolbar: GridToolbar }}
        getRowId={(row) => row.ID}
        onRowDoubleClick={handleRowDoubleClick}
      />
    </div>
  );
}
