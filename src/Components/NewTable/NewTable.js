import React from "react";
import MUIDataTable from "mui-datatables";
import { getColumnName } from "../../Utils/utilities";
import "./NewTable.css";
import MetaDataCard from "../MetaDataCard/MetaDataCard";

  // const getColumnsName = (data, columnWidts = {}) => {
  //   return Object.keys(data)
  //     .map((field) => {
  //       if (typeof data[field] !== "object") {
  //         let columnWidth = columnWidts[field] || 120;
  //         return {
  //           field,
  //           headerName: field,
  //           headerClassName: "super-app-theme--header",
  //           renderCell: (params) => {
  //             if (params.value === true) {
  //               return (
  //                 <span className="success-class">
  //                   <CheckIcon />
  //                 </span>
  //               );
  //             } else if (params.value === false) {
  //               return (
  //                 <span className="failed-class">
  //                   <ClearIcon />
  //                 </span>
  //               );
  //             } else {
  //               return params.value;
  //             }
  //           },
  //           width: columnWidth,
  //           flex: 1,
  //         };
  
  
export const ExpandableRowTable = (props) => {
  const options = {
    filter: true,
    // toolbar: false,
    ViewColumns:"ID",
    selectableRows: "multiple",
    filterType: "multiselect",
    responsive: "scroll",
    rowsPerPage: 10,
    setRowProps: (row, rowIndex) => {
      return {
        className: rowIndex % 2 === 0 ? "even-row" : "odd-row",
      };
    },
    expandableRows: props.expandable,
    onRowClick: (rowData, rowMeta) => {
      if (props.onRowClickEnabled) {
        props.onRowClick(rowMeta.dataIndex);
      }
    },

    renderExpandableRow: (rowData, rowMeta) => {
      const dataIndex = rowMeta.dataIndex;
      const rowObject = props.Data[dataIndex];
      let keys = [];
      let values = [];
      if (rowObject["metaData"]) {
        Object.keys(rowObject["metaData"]).forEach((key) => {
          keys.push(key);
          values.push(rowObject["metaData"][key]);
        });
      }
      return (
        <React.Fragment>
          <tr>
            <td colSpan={3}>
              <MetaDataCard keys={keys} values={values} />
            </td>
          </tr>
        </React.Fragment>
      );
    },
    page: 1,
    // toolbar: false,
  };

  return (
    <div className="table-container">
      <MUIDataTable
        title={props.title}
        data={props.Data}
        columns={props.regularColumns}
        options={options}
      />
    </div>
  );
};

export default ExpandableRowTable;
