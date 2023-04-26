import React from "react";
import MUIDataTable from "mui-datatables";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Data from "../../Data/Mock_Data.json";

// const Card = () => (
//   <tr>
//     <td className="fullWidth">
//       <h1>
//         lorem ipsum dorel em quol acee, vion, bloolw, wafeo, feiwjfoiew,
//         foiwejifowefjweoi, fewjoewjfowei, fwefwefewfewfewf
//       </h1>
//     </td>
//   </tr>
// );

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
  const getColumnsName = (data) => {
    let columnsName = [];
    Object.keys(data).forEach((key) => {
      if (typeof data[key] !== "object") {
        let newColumn = {
          name: key,
          label: key,
        };
        if (
          !columnsName.find((column) => {
            return JSON.stringify(column) === JSON.stringify(newColumn);
          })
        ) {
          columnsName.push(newColumn);
        }
      }
    });
    return columnsName;
  };

  // let regularColumns = [];

  // Data.forEach((row) => {
  //   regularColumns = getColumnsName(row);
  // });

  const options = {
    filter: true,
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    selectableRows: "single",
    filterType: "dropdown",
    responsive: "scrollMaxHeight",
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      // Find the index of the current row in the data array
      const dataIndex = rowMeta.dataIndex;

      // Get the object from the data array corresponding to the current row
      const rowObject = props.Data[dataIndex];
      const expandableRows = [];
      console.log(rowObject);
      Object.keys(rowObject).map((key) => {
        if (typeof rowObject[key] === "object") {
          expandableRows.push(key);
        }
      });

      // Loop over the keys of the expandable rows array to create a table of key-value pairs for the object
      return (
        <React.Fragment>
          {expandableRows.map((key) => (
            <tr key={key}>
              <td colSpan={12}>
                <ExpandableRowTable
                  title={key}
                  Data={[rowObject[key]]}
                  regularColumns={getColumnsName(rowObject[key])}
                />
              </td>
            </tr>
          ))}
        </React.Fragment>
      );
    },
    page: 1,
  };

  return (
    <MUIDataTable
      title={props.title}
      data={props.Data}
      columns={props.regularColumns}
      options={options}
    />
  );
};

export default ExpandableRowTable;
