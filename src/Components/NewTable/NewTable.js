import React from "react";
import MUIDataTable from "mui-datatables";
import { getColumnName } from "../../Utils/utilities";

import "./newTable.css";
import MetaDataCard from "../MetaDataCard/MetaDataCard";

export const ExpandableRowTable = (props) => {
  const options = {
    filter: true,
    toolbar: false,
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
      if (rowObject["meta_data"]) {
        Object.keys(rowObject["meta_data"]).forEach((key) => {
          keys.push(key);
          values.push(rowObject["meta_data"][key]);
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
