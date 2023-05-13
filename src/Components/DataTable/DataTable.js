import React from "react";
import MUIDataTable from "mui-datatables";
import { getColumnName } from "../../Utils/utilities";
import "./DataTable.css";

export const ExpandableRowTable = (props) => {
  const options = {
    filter: true,
    selectableRows: false,
    filterType: "multiselect",
    rowsPerPage: 10,
    draggableColumns: {
      enabled: true,
    },
    expandableRows: props.expandable,
    setCellProps: () => {
      return {
        className: "tableCell",
      };
    },
    setRowProps: (row, rowIndex) => {
      return {
        className: rowIndex % 2 === 0 ? "evenRow" : "oddRow",
        style: { cursor: "pointer" },
      };
    },
    onRowClick: (rowData, rowMeta) => {
      if (props.onRowClickEnabled) {
        props.onRowClick(rowMeta.dataIndex);
      }
    },
  };

  const columns =
    props.Data && getColumnName(props.Data[0], props.regularColumns);
  return (
    <div className="tableContainer">
      <MUIDataTable
        title={props.title}
        data={props.Data}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default ExpandableRowTable;
