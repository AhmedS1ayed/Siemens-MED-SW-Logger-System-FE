import React from "react";
import MUIDataTable from "mui-datatables";
import { getColumnName } from "../../Utils/utilities";

import "./newTable.css";

export const ExpandableRowTable = (props) => {
  const options = {
    filter: true,
    selectableRows: "multiple",
    filterType: "multiselect",
    responsive: "scroll",
    rowsPerPage: 10,
    setRowProps: (row, rowIndex) => {
      return {
        className: rowIndex % 2 === 0 ? "even-row" : "odd-row",
      };
    },
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      const dataIndex = rowMeta.dataIndex;
      const rowObject = props.Data[dataIndex];
      const expandableRows = [];

      Object.keys(rowObject).map((key) => {
        if (typeof rowObject[key] === "object") {
          expandableRows.push(key);
        }
      });

      return (
        <React.Fragment>
          {expandableRows.map((key) => (
            <tr key={key}>
              <td colSpan={12}>
                <ExpandableRowTable
                  title={key}
                  Data={[rowObject[key]]}
                  regularColumns={getColumnName(rowObject[key])}
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
