import * as React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import id from "../../Data/Mock_Data.json";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./NewTable.css";

export default function BasicExampleDataGrid() {
  const handleRowDoubleClick = (params) => {
    window.location.href = `/testcases?testsuitId=${params.id}`;
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

  let data_columns = getColumnsName(id[0], { dateCreated: 250 });
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

  return (
    <div style={{ height: 800, width: "100%" }} className="dataGridContainer">
      <DataGrid   
        columns={data_columns}
        rows={id}
        slots={{ toolbar: GridToolbar }}
        getRowId={(row) => row.ID}
        getRowClassName={() => "row-border"}
        onRowDoubleClick={handleRowDoubleClick}
        sx={{ 
          autoWidth:true,
          boxShadow: 2,
          paddingLeft: "40px",
          paddingRight: "40px",
          paddingTop: "20px",
          borderColor: "primary.light",
          marginTop: "40px",
          fontWeight: "bold",
        }}
        // autoHeight={true}
      />

    </div>  
  );
}
